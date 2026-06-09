#!/run/current-system/sw/bin/bash env
###############################################################################
# deploy-remote.sh
# Runs ON the cPanel / CloudLinux server. Pulls the latest code for $BRANCH
# from GitHub, syncs it into the app root (preserving .env / uploads), then
# installs, generates the Prisma client, applies migrations, builds, and
# restarts Passenger — clearing the stray-process and 503 issues automatically.
#
# Usage:   ./deploy-remote.sh [branch]
# Example: ./deploy-remote.sh main
#
# Exit codes: 0 = deployed & healthy, non-zero = failed (nothing left half-up).
###############################################################################
set -Eeuo pipefail

# ----------------------------- CONFIG ---------------------------------------
APP_NAME="yetihomes_api"
NODE_VER="22"
BRANCH="${1:-main}"                 # branch to deploy; override as arg

HOME_DIR="/home2/yetihome"
APP_ROOT="${HOME_DIR}/${APP_NAME}"                       # where the app runs
VENV="${HOME_DIR}/nodevenv/${APP_NAME}/${NODE_VER}/bin/activate"

REPO_URL="git@github.com:SpitfireGG/yetihomes_backend.git"
REPO_DIR="${HOME_DIR}/.deploy_src/yetihomes_backend"     # persistent clean clone
REPO_SUBDIR="api"                   # subfolder in the repo that is the app ("" if root)

STARTUP="dist/src/main.js"          # Passenger startup file (relative to APP_ROOT)
HEALTHCHECK_URL="https://yetihomesestate.com.np/api"     # external health probe
NODE_MAX_OLD_SPACE="2048"           # MB cap for the build (LVE-friendly)
MIGRATE_TIMEOUT="120"               # seconds before we treat schema-engine as hung
HEALTH_RETRIES="20"                 # how many times to poll after restart
HEALTH_DELAY="3"                    # seconds between polls

# Files in APP_ROOT that must survive a sync (never overwritten/deleted):
PRESERVE=( ".env" "uploads" "public" "tmp" )

# Allow skipping migrations if the schema-engine is known-broken on this host:
#   SKIP_MIGRATIONS=1 ./deploy-remote.sh
SKIP_MIGRATIONS="${SKIP_MIGRATIONS:-0}"
# ----------------------------------------------------------------------------

log()  { printf '\n\033[1;36m[deploy %(%H:%M:%S)T]\033[0m %s\n' -1 "$*"; }
ok()   { printf '\033[1;32m  ✓ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m  ! %s\033[0m\n' "$*"; }
die()  { printf '\n\033[1;31m[deploy FAILED]\033[0m %s\n' "$*" >&2; exit 1; }
trap 'die "error on line $LINENO (command: $BASH_COMMAND)"' ERR

# Kill leftover Prisma engines that hold DB connections + LVE process slots.
# pkill returns 1 when nothing matched — that is fine, not an error.
kill_engines() {
  pkill -u "$USER" -f 'schema-engine|query-engine|prisma' 2>/dev/null || true
  sleep 1
}

# Force Passenger to drop the running app (so the next request respawns it).
kill_app() {
  pkill -u "$USER" -f 'lsnode' 2>/dev/null || true
  sleep 1
}

need() { command -v "$1" >/dev/null 2>&1 || die "required command not found: $1"; }

###############################################################################
log "Activating Node ${NODE_VER} virtualenv"
[ -f "$VENV" ] || die "venv not found: $VENV"
# shellcheck disable=SC1090
source "$VENV"
need node; need npm; need git; need rsync; need mysql
ok "node $(node --version)"

###############################################################################
log "Clearing any stray Prisma engines before we start"
kill_engines
ok "engines cleared"

###############################################################################
log "Fetching ${BRANCH} from GitHub into a clean checkout"
export TMPDIR="${HOME_DIR}/tmp"; mkdir -p "$TMPDIR"
if [ -d "${REPO_DIR}/.git" ]; then
  git -C "$REPO_DIR" fetch --depth 1 origin "$BRANCH"
  git -C "$REPO_DIR" reset --hard "origin/${BRANCH}"          # no merge conflicts, exact match
  git -C "$REPO_DIR" clean -fd
else
  mkdir -p "$(dirname "$REPO_DIR")"
  git clone --depth 1 --branch "$BRANCH" "$REPO_URL" "$REPO_DIR"
fi
COMMIT="$(git -C "$REPO_DIR" rev-parse --short HEAD)"
ok "checked out ${BRANCH} @ ${COMMIT}"

###############################################################################
log "Syncing code into ${APP_ROOT} (preserving .env / uploads / etc.)"
SRC="${REPO_DIR}"; [ -n "$REPO_SUBDIR" ] && SRC="${REPO_DIR}/${REPO_SUBDIR}"
[ -d "$SRC" ] || die "source path missing: $SRC"
mkdir -p "$APP_ROOT"

EXCL=( --exclude ".git" --exclude "node_modules" )
for p in "${PRESERVE[@]}"; do EXCL+=( --exclude "$p" ); done
# --delete keeps APP_ROOT identical to the repo (minus preserved paths),
# so stale compiled files from old deploys never linger.
rsync -a --delete "${EXCL[@]}" "${SRC}/" "${APP_ROOT}/"
ok "code synced"

cd "$APP_ROOT"
[ -f ".env" ] || die ".env is missing in ${APP_ROOT} — restore it before deploying"

###############################################################################
log "Normalising .env (the spaces-around-= engine-type bug bites Prisma)"
# Turn 'PRISMA_CLIENT_ENGINE_TYPE = library' into 'PRISMA_CLIENT_ENGINE_TYPE=library'
sed -i 's/^[[:space:]]*PRISMA_CLIENT_ENGINE_TYPE[[:space:]]*=[[:space:]]*/PRISMA_CLIENT_ENGINE_TYPE=/' .env
grep -q '^PRISMA_CLIENT_ENGINE_TYPE=library' .env \
  || echo 'PRISMA_CLIENT_ENGINE_TYPE=library' >> .env
ok "engine type pinned to library"

# prisma.config.ts suppresses .env auto-loading for the CLI, so export the URL
# explicitly for the prisma commands below. Read it straight from .env.
DATABASE_URL="$(grep -E '^DATABASE_URL=' .env | head -1 | cut -d= -f2- | sed 's/^"//; s/"$//')"
[ -n "$DATABASE_URL" ] || die "DATABASE_URL not found in .env"
export DATABASE_URL PRISMA_CLIENT_ENGINE_TYPE=library

###############################################################################
log "Sanity-checking the database is reachable (raw mysql, not Prisma)"
DB_USER="$(printf '%s' "$DATABASE_URL" | sed -E 's#mysql://([^:]+):.*#\1#')"
DB_PASS="$(printf '%s' "$DATABASE_URL" | sed -E 's#mysql://[^:]+:([^@]+)@.*#\1#')"
DB_HOST="$(printf '%s' "$DATABASE_URL" | sed -E 's#.*@([^:/]+).*#\1#')"
DB_PORT="$(printf '%s' "$DATABASE_URL" | sed -E 's#.*@[^:]+:([0-9]+)/.*#\1#')"
DB_NAME="$(printf '%s' "$DATABASE_URL" | sed -E 's#.*/([^?]+).*#\1#')"
mysql -u "$DB_USER" -p"$DB_PASS" -h "$DB_HOST" -P "${DB_PORT:-3306}" "$DB_NAME" \
      -e "SELECT 1;" >/dev/null \
  || die "cannot reach MySQL with the credentials in .env — fix DB before deploying"
ok "MySQL reachable at ${DB_HOST}:${DB_PORT:-3306}/${DB_NAME}"

###############################################################################
log "Installing dependencies (incl. dev — the build needs the Nest CLI)"
kill_engines
PRISMA_SKIP_POSTINSTALL_GENERATE=1 \
  npm install --include=dev --no-audit --no-fund
[ -x "node_modules/.bin/nest" ] || [ -f "node_modules/@nestjs/cli/bin/nest.js" ] \
  || die "Nest CLI missing after install"
ok "dependencies installed"

###############################################################################
log "Generating Prisma client"
kill_engines
node node_modules/prisma/build/index.js generate
ok "client generated"

###############################################################################
if [ "$SKIP_MIGRATIONS" = "1" ]; then
  warn "SKIP_MIGRATIONS=1 — not touching the database schema"
else
  log "Applying migrations (guarded — schema-engine is known to hang on this host)"
  kill_engines
  set +e
  timeout "${MIGRATE_TIMEOUT}s" \
    node node_modules/prisma/build/index.js migrate deploy
  RC=$?
  set -e
  kill_engines
  if [ "$RC" -eq 124 ]; then
    die "migrate deploy hung (>${MIGRATE_TIMEOUT}s). The schema-engine binary is \
stalling on this box. Apply the pending migration SQL manually via the mysql \
client, then re-run with SKIP_MIGRATIONS=1. (App runtime is unaffected — it \
uses the library engine, which works.)"
  elif [ "$RC" -ne 0 ]; then
    die "migrate deploy failed (exit $RC)"
  fi
  ok "migrations applied"
fi

###############################################################################
log "Building (memory-capped to stay under the LVE limit)"
kill_engines
NEST_BIN="node_modules/@nestjs/cli/bin/nest.js"
node --max-old-space-size="${NODE_MAX_OLD_SPACE}" "$NEST_BIN" build
[ -f "$STARTUP" ] || die "build did not produce ${STARTUP}"
ok "built -> ${STARTUP}"

###############################################################################
log "Restarting the app (clearing engines + Passenger, then touch restart)"
# Mark current end of log so we only read NEW lines when checking health.
mkdir -p tmp
: > /dev/null
LOG_MARK=0; [ -f stderr.log ] && LOG_MARK="$(wc -l < stderr.log)"
kill_engines
kill_app
touch tmp/restart.txt
ok "restart triggered"

###############################################################################
log "Health check (polling — this is the 503 guard)"
HEALTHY=0
for i in $(seq 1 "$HEALTH_RETRIES"); do
  sleep "$HEALTH_DELAY"
  CODE="$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$HEALTHCHECK_URL" || echo 000)"
  # Treat any non-5xx response as "app is up and serving" (404 on / is fine).
  if [ "$CODE" -ge 200 ] && [ "$CODE" -lt 500 ]; then
    HEALTHY=1; ok "HTTP ${CODE} from ${HEALTHCHECK_URL} (app is up)"; break
  fi
  warn "attempt ${i}/${HEALTH_RETRIES}: HTTP ${CODE} — waiting…"
done

# Surface any NEW boot errors regardless of the HTTP result.
if [ -f stderr.log ]; then
  NEWLOG="$(tail -n "+$((LOG_MARK + 1))" stderr.log | grep -E 'PANIC|Database connection failed|Cannot find module|Error:' | tail -n 10 || true)"
  if [ -n "$NEWLOG" ]; then
    warn "new errors in stderr.log since restart:"; printf '%s\n' "$NEWLOG"
  fi
fi

if [ "$HEALTHY" -ne 1 ]; then
  die "app did not become healthy (still 5xx after $((HEALTH_RETRIES * HEALTH_DELAY))s). \
Check stderr.log above. Commit ${COMMIT} is deployed but not serving."
fi

###############################################################################
log "Done — ${BRANCH} @ ${COMMIT} deployed and serving."

#!/run/current-system/sw/bin/bash
###############################################################################
# push-and-deploy.sh
# Runs on your LOCAL machine. Commits + pushes the current code to a branch on
# GitHub, then SSHes into the cPanel server and runs deploy-remote.sh there.
# One command, no manual steps on the server.
#
# Usage:   ./push-and-deploy.sh [branch] [commit message]
# Example: ./push-and-deploy.sh main "fix property filters"
###############################################################################
set -Eeuo pipefail

# ----------------------------- CONFIG ---------------------------------------
BRANCH="${1:-main}"
MSG="${2:-deploy: $(date '+%Y-%m-%d %H:%M:%S')}"

SSH_KEY="$HOME/.ssh/yetihomes_ssh"
SSH_HOST="yetihome@110.34.3.165"
REMOTE_SCRIPT="\$HOME/deploy-remote.sh"     # path to deploy-remote.sh ON the server
# ----------------------------------------------------------------------------

log()  { printf '\n\033[1;36m[push]\033[0m %s\n' "$*"; }
die()  { printf '\n\033[1;31m[push FAILED]\033[0m %s\n' "$*" >&2; exit 1; }
trap 'die "error on line $LINENO"' ERR

command -v git >/dev/null || die "git not found"
[ -f "$SSH_KEY" ] || die "ssh key not found: $SSH_KEY"

log "Staging and committing local changes"
git add -A
if git diff --cached --quiet; then
  log "No changes to commit — deploying current ${BRANCH} as-is"
else
  git commit -m "$MSG"
fi

log "Pushing to origin/${BRANCH}"
git push origin "HEAD:${BRANCH}"

log "Triggering remote deploy on ${SSH_HOST}"
# -t gives a TTY so you see the coloured deploy output live.
ssh -t -i "$SSH_KEY" "$SSH_HOST" "bash ${REMOTE_SCRIPT} ${BRANCH}"

log "Deploy finished for branch ${BRANCH}."

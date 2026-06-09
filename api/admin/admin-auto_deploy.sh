#!/run/current-system/sw/bin/bash
set -euo pipefail

# ── config ───────────────────────────────────────────────
SSH_KEY="$HOME/.ssh/yetihomes_ssh"
SSH_HOST="yetihome@110.34.3.165"
LOCAL_DIR="/home/archbishop/Dev/internWork/mono_repo_real_state/yetihomes_backend/api/admin"
REMOTE_DIR="/home2/yetihome/public_html/admin.yetihomesestate.com.np"
# ─────────────────────────────────────────────────────────

cd "$LOCAL_DIR"

echo "===> cleaning old build artifacts..."
rm -rf out admin-build.zip

echo "==> Building admin..."
npm run build

echo "==> Sanity-checking the build..."
[ -f out/index.html ] || { echo "FAIL: out/index.html missing — export did not run. Aborting."; exit 1; }
if grep -rqs "localhost:4000" out/; then
  echo "FAIL: out/ contains 'localhost:4000' — wrong NEXT_PUBLIC_API_URL baked in. Aborting."
  echo "      run: echo \$NEXT_PUBLIC_API_URL   (should be empty or the prod URL)"
  exit 1
fi
echo "    OK (index.html present, no localhost)"

echo "==> Creating admin-build.zip (excluding .htaccess)..."
( cd out && zip -qr ../admin-build.zip . -x ".htaccess" )

echo "==> Uploading zip to server..."
scp -i "$SSH_KEY" admin-build.zip "$SSH_HOST:/tmp/admin-build.zip"

echo "==> Replacing files on server (keeps .htaccess)..."
ssh -i "$SSH_KEY" "$SSH_HOST" "
  set -e
  cd '$REMOTE_DIR'
  find . -mindepth 1 -not -name '.htaccess' -delete
  unzip -oq /tmp/admin-build.zip -d .
  rm -f /tmp/admin-build.zip
"

echo "==> Purging LiteSpeed cache..."
ssh -i "$SSH_KEY" "$SSH_HOST" 'rm -rf ~/lscache/* 2>/dev/null || true'

echo "==> Done. Admin deployed."

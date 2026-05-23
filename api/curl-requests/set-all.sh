#!/run/current-system/sw/bin/bash

echo "=========================================="
echo "  Yeti Homes - Full Data Seeding Script"
echo "=========================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TOKEN_FILE="$SCRIPT_DIR/.auth_token"

if [ ! -f "$TOKEN_FILE" ]; then
  echo "ERROR: Auth token not found!"
  echo "Run auth setup first: bash $SCRIPT_DIR/auth-setup.sh"
  exit 1
fi

export AUTH_TOKEN=$(cat "$TOKEN_FILE")
TOTAL=0
SUCCESS=0
FAILED=0

run_script() {
  local script="$1"
  local label="$2"
  TOTAL=$((TOTAL + 1))
  echo "[$TOTAL] $label"
  if bash "$script" > /dev/null 2>&1; then
    echo "      OK"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "      FAILED"
    FAILED=$((FAILED + 1))
  fi
}

echo "--- Properties (35) ---"
for script in "$SCRIPT_DIR"/properties/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Teams (5) ---"
for script in "$SCRIPT_DIR"/teams/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Reviews (8) ---"
for script in "$SCRIPT_DIR"/reviews/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Blogs (6) ---"
for script in "$SCRIPT_DIR"/blogs/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- FAQs (8) ---"
for script in "$SCRIPT_DIR"/faqs/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Affiliations (5) ---"
for script in "$SCRIPT_DIR"/affiliations/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Company Info (1) ---"
for script in "$SCRIPT_DIR"/company-info/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Static Content (2) ---"
for script in "$SCRIPT_DIR"/content/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Legal Documents (3) ---"
for script in "$SCRIPT_DIR"/legal-docs/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Contact Tickets (1) ---"
for script in "$SCRIPT_DIR"/contact/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Inquiries (3) ---"
for script in "$SCRIPT_DIR"/inquiries/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "--- Newsletter (1) ---"
for script in "$SCRIPT_DIR"/newsletters/*.sh; do
  [ -f "$script" ] && run_script "$script" "  $(basename "$script")"
done

echo ""
echo "=========================================="
echo "  Results: $SUCCESS succeeded, $FAILED failed (out of $TOTAL)"
echo "=========================================="

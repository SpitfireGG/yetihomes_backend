#!/run/current-system/sw/bin/bash

API_URL="http://localhost:4000/api"
COOKIES_FILE="$(dirname "$0")/cookies.txt"

echo "=== Yeti Homes Auth Setup ==="
echo ""

# echo "[1/3] Registering admin account..."
# REGISTER_RESPONSE=$(curl -s -c "$COOKIES_FILE" -X POST "$API_URL/auth/register" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "email": "admin@yetihomes.com",
#     "password": "Admin@123456",
#     "fullName": "Yeti Admin"
#   }')
#
# REGISTER_STATUS=$(echo "$REGISTER_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('statusCode', ''))" 2>/dev/null)
#
# if [ "$REGISTER_STATUS" = "201" ] || [ "$REGISTER_STATUS" = "200" ]; then
#   echo "      Registration successful"
# elif echo "$REGISTER_RESPONSE" | grep -q "already exists"; then
#   echo "      Account already exists, skipping registration"
# else
#   echo "      Registration failed: $REGISTER_RESPONSE"
#   echo "      Attempting login anyway..."
# fi

echo ""
echo "[2/3] Logging in..."
LOGIN_RESPONSE=$(curl -s -c "$COOKIES_FILE" -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@yetihomes.com",
    "password": "smittens123!@#A"
  }')

ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | python3 -c "import sys,json; print(json.load(sys.stdin).get('data',{}).get('accessToken',''))" 2>/dev/null)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "      Login failed: $LOGIN_RESPONSE"
  echo ""
  echo "ERROR: Could not obtain auth token. Please check:"
  echo "  1. Backend is running on port 4000"
  echo "  2. Admin account exists with email: admin@yetihomes.com"
  echo "  3. Password is: Admin@123456"
  exit 1
fi

echo "      Login successful"

echo ""
echo "[3/3] Saving token..."
TOKEN_FILE="$(dirname "$0")/.auth_token"
echo "$ACCESS_TOKEN" > "$TOKEN_FILE"
echo "      Token saved to $TOKEN_FILE"

echo ""
echo "=== Auth setup complete ==="
echo "Token: ${ACCESS_TOKEN:0:20}..."
echo ""
echo "Run data seeding with: bash $(dirname "$0")/set-all.sh"

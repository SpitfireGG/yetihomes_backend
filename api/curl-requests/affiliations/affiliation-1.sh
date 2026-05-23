#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/affiliations \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nepal Real Estate Board",
    "logoUrl": "https://example.com/images/nreb-logo.png",
    "isActive": true,
    "displayOrder": 1
  }'
#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/affiliations \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Federation of Nepalese Chambers of Commerce",
    "logoUrl": "https://example.com/images/fncci-logo.png",
    "isActive": true,
    "displayOrder": 3
  }'

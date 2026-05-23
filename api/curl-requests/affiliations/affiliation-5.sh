#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/affiliations \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nepal Housing Development Association",
    "logoUrl": "https://example.com/images/nhda-logo.png",
    "isActive": true,
    "displayOrder": 5
  }'

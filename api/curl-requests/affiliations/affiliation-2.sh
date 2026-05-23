#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/affiliations \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Real Estate Association of Nepal",
    "logoUrl": "https://example.com/images/rean-logo.png",
    "isActive": true,
    "displayOrder": 2
  }'

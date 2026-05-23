#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/company/newsletters \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "name": "John Doe",
    "country": "Nepal",
    "source": "Website",
    "subscribed": true
  }'
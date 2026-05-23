#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/inquiries \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": "1ef9a181-457c-4153-8bb6-3e21c04a7bcc",
    "type": "GENERAL",
    "fullName": "Amit Banerjee",
    "email": "amit.banerjee@company.com",
    "phone": "+977-9851122334",
    "message": "I am a real estate investor looking for commercial properties in the Kathmandu area. Do you have any commercial land or buildings available for investment?"
  }'
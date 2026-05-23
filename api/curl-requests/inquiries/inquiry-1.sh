#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/inquiries \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "propertyId": "1ef9a181-457c-4153-8bb6-3e21c04a7bcc",
    "type": "PROPERTY",
    "fullName": "Rajesh Kumar Sharma",
    "email": "rajesh.sharma@email.com",
    "phone": "+977-9841234567",
    "message": "I am interested in this luxury villa in Lazimpat. Can I schedule a visit this weekend? I would like to bring my family to see the property."
  }'
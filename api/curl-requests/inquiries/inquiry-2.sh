#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/inquiries \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "SCHEDULE_VISIT",
    "fullName": "Priya Thapa",
    "email": "priya.thapa@gmail.com",
    "phone": "+977-9808765432",
    "message": "I would like to schedule a visit to see the penthouse in Thamel. I am available next Saturday morning. Please confirm the time."
  }'
#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/contact/ticket \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rahul Sharma",
    "email": "rahul.sharma@gmail.com",
    "subject": "Inquiry about commercial property investment",
    "message": "Hello, I am interested in investing in commercial properties in the Kathmandu area. I would like to know more about available commercial spaces, investment opportunities, and potential returns. Please contact me with more information. I am looking for properties in the range of 50-100 million NPR."
  }'

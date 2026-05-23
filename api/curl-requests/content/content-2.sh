#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/content \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "contact",
    "title": "Contact Us",
    "content": "Get in touch with us for all your real estate needs.\n\nAddress: Lazimpat, Kathmandu, Nepal\nPhone: +977-01-1234567\nEmail: info@yetihomes.com\n\nOur team is available Monday to Saturday, 9 AM to 6 PM.",
    "pageType": "CONTACT",
    "displayOrder": 2,
    "isActive": true
  }'
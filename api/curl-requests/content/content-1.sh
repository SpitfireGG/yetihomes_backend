#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/content \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "about",
    "title": "About Us",
    "content": "Yeti Homes is Nepals premier real estate company, dedicated to helping clients find their perfect property. With years of experience in the market, we specialize in residential, commercial, and land properties across Kathmandu Valley. Our team of experts provides personalized service, ensuring smooth transactions from search to settlement.",
    "pageType": "ABOUT",
    "displayOrder": 1,
    "isActive": true
  }'
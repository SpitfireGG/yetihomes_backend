#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/company/about-us \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Yeti Homes Pvt. Ltd.",
    "description": "Yeti Homes is Nepal's premier real estate company, dedicated to helping clients find their perfect property. With years of experience in the market, we specialize in residential, commercial, and land properties across Kathmandu Valley. Our team of experts provides personalized service, ensuring smooth transactions from search to settlement.",
    "mission": "To transform the property buying experience in Nepal by providing transparent, reliable, and professional real estate services that exceed client expectations.",
    "vision": "To become Nepal's most trusted real estate partner, known for integrity, innovation, and exceptional customer service.",
    "contactEmail": "info@yetihomes.com",
    "phone": "+977-01-1234567",
    "address": "Lazimpat, Kathmandu, Nepal"
  }'
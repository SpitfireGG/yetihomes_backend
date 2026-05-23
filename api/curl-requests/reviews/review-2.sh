#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Sita Devi Sharma\",\"role\":\"Property Investor\",\"text\":\"I have been working with Yeti Homes for my investment portfolio for over two years now. Their market insights are accurate and they always find properties with good appreciation potential. Professional service from start to finish.\",\"rating\":5,\"isFeatured\":true}"

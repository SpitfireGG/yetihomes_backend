#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Nisha Gurung\",\"role\":\"Growing Family\",\"text\":\"We needed a larger home for our growing family and Yeti Homes found us the perfect house in Budhanilkantha. The location is great with schools nearby and the house has everything we needed. The team was incredibly helpful throughout the entire process.\",\"rating\":5,\"isFeatured\":true}"

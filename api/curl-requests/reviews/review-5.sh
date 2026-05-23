#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Krishna Bahadur KC\",\"role\":\"Land Seller\",\"text\":\"I sold my ancestral land through Yeti Homes and the experience was great. They found a genuine buyer quickly, handled all the paperwork, and ensured a smooth transaction. The valuation was fair and transparent. Thank you Yeti Homes team!\",\"rating\":4,\"isFeatured\":false}"

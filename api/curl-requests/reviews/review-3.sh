#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Deepak Bhattarai\",\"role\":\"Commercial Tenant\",\"text\":\"Found the perfect office space through Yeti Homes. They understood our requirements perfectly - location, size, budget, and amenities. The negotiation process was handled professionally and we got a great deal. Will definitely use their services again.\",\"rating\":4,\"isFeatured\":false}"

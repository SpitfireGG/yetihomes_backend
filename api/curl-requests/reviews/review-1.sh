#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Anita Karki\",\"role\":\"Homeowner\",\"text\":\"We purchased our dream home through Yeti Homes and the experience was exceptional. The team was professional, knowledgeable, and patient throughout our entire journey. They helped us find the perfect property within our budget and handled all the paperwork efficiently. Highly recommended!\",\"rating\":5,\"isFeatured\":true}" \
  -F "images=@../uploads/properties/1778427003834-.jpg"
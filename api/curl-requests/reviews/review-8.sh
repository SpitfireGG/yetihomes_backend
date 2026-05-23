#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Prakash Shrestha\",\"role\":\"Retiree\",\"text\":\"After retiring, I wanted to move to a quieter area. Yeti Homes helped me find a beautiful plot in Nagarkot where I plan to build my retirement home. Their knowledge of different areas in Nepal is impressive. Very professional and caring team.\",\"rating\":4,\"isFeatured\":false}"

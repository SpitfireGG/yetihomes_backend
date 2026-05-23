#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Manisha Thapa\",\"role\":\"NRN Buyer\",\"text\":\"As an NRN buying property in Nepal, I had many concerns about the process. Yeti Homes handled everything remotely with complete transparency. They sent me detailed photos, videos, and even did virtual tours. The property was exactly as described. Excellent service!\",\"rating\":5,\"isFeatured\":true}"

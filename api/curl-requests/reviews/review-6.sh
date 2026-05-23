#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/reviews \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={\"name\":\"Saroj Adhikari\",\"role\":\"Rental Client\",\"text\":\"Yeti Homes helped me find a great rental apartment in Sanepa. They showed me multiple options within my budget and the whole process took less than a week. The landlord was also very cooperative. Very satisfied with the service!\",\"rating\":5,\"isFeatured\":false}"

#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/teams \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F 'data={"name":"Kiran Mahat","slug":"kiran-mahat","role":"Chief Executive Officer","location":"Kathmandu, Nepal","email":"kiran.mahat@yetihomes.com","bio":"Kiran Mahat is a visionary leader with over 20 years of experience in Nepals real estate industry. He founded Yeti Homes with a mission to transform the property buying experience in Nepal.","expertise":["Strategic Planning","Business Development","Market Analysis","Team Leadership"],"education":"MBA in Business Administration, Kathmandu University and BSc in Civil Engineering, Tribhuvan University"}' \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg"

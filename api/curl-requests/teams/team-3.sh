#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/teams \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F 'data={"name":"Rajendra Basnet","slug":"rajendra-basnet","role":"Head of Marketing and Digital Strategy","location":"Kathmandu, Nepal","email":"rajendra.basnet@yetihomes.com","bio":"Rajendra Basnet brings 15 years of digital marketing expertise to Yeti Homes. He leads the companys online presence and innovative marketing campaigns.","expertise":["Digital Marketing","SEO/SEM","Brand Strategy","Analytics"],"education":"Masters in Digital Marketing, Singapore Institute of Management and BSc in Computer Science, Tribhuvan University"}' \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003840-.jpg"
#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/teams \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F 'data={"name":"Bikash Rai","slug":"bikash-rai","role":"Marketing Director","location":"Kathmandu, Nepal","email":"bikash.rai@yetihomes.com","bio":"Bikash leads Yeti Homes marketing strategy with expertise in digital marketing, brand development, and customer acquisition. His innovative campaigns have significantly increased brand visibility and lead generation.","expertise":["Digital Marketing","Brand Strategy","Content Creation","Lead Generation"],"education":"MBA in Marketing, Quest International College"}'

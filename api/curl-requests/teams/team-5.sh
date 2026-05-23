#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/teams \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F 'data={"name":"Priya Maharjan","slug":"priya-maharjan","role":"Customer Relations Lead","location":"Lalitpur, Nepal","email":"priya.maharjan@yetihomes.com","bio":"Priya ensures every client receives exceptional service from initial inquiry to post-purchase support. Her dedication to customer satisfaction has earned Yeti Homes numerous positive reviews and referrals.","expertise":["Customer Service","Relationship Management","After-Sales Support","Feedback Analysis"],"education":"BBS in Management, Patan Multiple Campus"}'

#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/teams \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F 'data={"name":"Sarita Shrestha","slug":"sarita-shrestha","role":"Senior Property Consultant","location":"Lalitpur, Nepal","email":"sarita.shrestha@yetihomes.com","bio":"Sarita Shrestha is a seasoned real estate professional with 12 years of experience in residential and commercial property sales. She has helped over 500 families find their dream homes in the Kathmandu Valley.","expertise":["Residential Sales","Luxury Properties","Negotiation","Client Relations"],"education":"Bachelor in Business Management, Kathmandu College of Management and Certified Real Estate Agent, Nepal Real Estate Board"}' \
  -F "images=@../uploads/properties/1778427003836-.jpg" \
  -F "images=@../uploads/properties/1778427003840-.jpg"
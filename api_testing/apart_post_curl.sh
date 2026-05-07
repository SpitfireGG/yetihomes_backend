curl -X POST http://localhost:3000/api/apartments \
                         -F 'data={
                       "title": "Luxury Penthouse in Sanepa",
                       "slug": "luxury-penthouse-sanepa-01",
                       "summary": "Stunning 3-bedroom penthouse with panoramic city views.",
                       "description": "Experience premium living in this fully furnished penthouse. Features include a private terrace, modern kitchen, 24/7 security, an
d backup power. Located in the highly sought-after expat area of Sanepa.",
                       "propertyType": "APARTMENT",
                       "listingType": "RENT",
                       "priceAmount": 150000,
                       "currency": "NPR",
                       "pricePeriod": "MONTHLY",
                       "status": "PUBLISHED",
                       "locationText": "Sanepa, Lalitpur",
                       "city": "Lalitpur",
                       "district": "Lalitpur",
                       "areaValue": 2500,
                       "areaUnit": "SQ_FT",
                       "details": {
                         "subType": "PENTHOUSE",
                         "bedrooms": 3,
                         "bathrooms": 4,
                         "balconies": 2,
                         "floorNumber": 8,
                         "totalFloors": 8,
                         "hasLift": true,
                         "hasParking": true,
                         "furnishingStatus": "FULLY_FURNISHED"
                       }
                     }' \
                         -F "images=@1776627672753-.jpg" \
                         -F "images=@1776627672756-.jpg" \
                         -F "images=@1776628250728-.jpg" \
                         -F "images=@1776628250730-.jpg" \
                         -F "images=@best-house.jpg" \
                         -F "images=@cresthouse.jpg"


curl -X POST http://localhost:3000/api/lands \
                         -F 'data={
                       "title": "Prime Residential Plot in Baluwatar",
                       "slug": "prime-residential-plot-baluwatar-01",
                       "summary": "Excellent 8 Aana plot ready for construction.",
                       "description": "This premium 8 Aana rectangular plot is situated in a highly sought-after VIP residential area with a 20ft blacktopped road access
. Perfect for building a luxury bungalow.",
                       "propertyType": "LAND",
                       "listingType": "SALE",
                       "priceAmount": 85000000,
                       "currency": "NPR",
                       "pricePeriod": "TOTAL",
                       "status": "PUBLISHED",
                       "locationText": "Baluwatar, Kathmandu",
                       "city": "Kathmandu",
                       "district": "Kathmandu",
                       "areaValue": 8,
                       "areaUnit": "AANA",
                       "details": {
                         "subType": "RESIDENTIAL_PLOT",
                         "roadAccessFeet": 20,
                         "frontageFeet": 40,
                         "facingDirection": "SOUTH_EAST",
                         "isCornerPlot": true
                       }
                     }' \
                         -F "images=@1776627672753-.jpg" \
                         -F "images=@1776627672756-.jpg" \
                         -F "images=@1776628250728-.jpg" \
                         -F "images=@1776628250730-.jpg" \
                         -F "images=@best-house.jpg" \
                         -F "images=@cresthouse.jpg"


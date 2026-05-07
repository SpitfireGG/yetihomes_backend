#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Development-Ready Land in Chandragiri with City Views",
    "slug": "development-land-chandragiri-city-views-kathmandu-005",
    "summary": "Large 15 Aana plot in Chandragiri with panoramic city views, ideal for apartment complex, villa development, or land banking in the hillside area.",
    "description": "This substantial development-ready land in Chandragiri offers incredible potential for residential or mixed-use development with stunning panoramic views of the Kathmandu Valley.\n\nThe 15 Aana plot occupies an elevated position with unobstructed views of the city skyline and surrounding hills. The relatively flat terrain reduces development costs. The area is approved for residential construction with clear zoning.\n\nChandragiri is increasingly popular for those seeking cleaner air and mountain views while remaining connected to the city center. Several luxury residential projects are under construction in the vicinity.\n\nThe plot is suitable for a boutique apartment complex, multiple villa plots, or institutional use. Road access is 15 feet wide and paved. All utilities are available within reasonable distance.\n\nInvestment potential is strong given the limited supply of developable land with views in this price range.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 65000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Mountain View",
    "badgeTone": "COOL",
    "locationText": "Chandragiri, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7656,
    "longitude": 85.2845,
    "areaValue": 15,
    "areaUnit": "AANA",
    "titleStatus": "Ghar Jagga Purja",
    "waterAvailability": "Municipal Line Available",
    "electricity": "3-Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "RESIDENTIAL_PLOT",
      "roadAccessFeet": 15,
      "frontageFeet": 60,
      "facingDirection": "SOUTH_WEST",
      "isCornerPlot": false
    }
  }' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg'
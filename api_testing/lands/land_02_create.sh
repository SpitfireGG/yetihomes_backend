#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Commercial Plot on New Road with High Traffic Visibility",
    "slug": "commercial-plot-new-road-kathmandu-002",
    "summary": "Strategic commercial land parcel on New Road with excellent foot traffic and commercial development potential in the heart of the city.",
    "description": "This strategically located commercial plot on New Road offers an exceptional opportunity for retail, office, or mixed-use development in one of Kathmandu busiest commercial zones.\n\nThe 4 Aana plot occupies a prime position with high foot traffic and visibility. The property is ideal for ground-floor retail with upper-floor offices or hotel development. The location guarantees steady customer flow from local and visiting clientele.\n\nThe plot has 15 feet of frontage on the main road. Current structures can be renovated or removed for new construction. All commercial utilities are available including three-phase electricity and municipal water.\n\nNew Road is the primary commercial corridor connecting to major markets, banks, and government offices. The area hosts numerous retail shops, restaurants, and businesses. This is a proven commercial location with strong rental demand.\n\nPerfect for investors seeking income-producing property or businesses looking for premium retail locations.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 120000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Commercial",
    "badgeTone": "COOL",
    "locationText": "New Road, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7023,
    "longitude": 85.3056,
    "areaValue": 4,
    "areaUnit": "AANA",
    "titleStatus": "Commercial Purja",
    "waterAvailability": "Municipal Line",
    "electricity": "3-Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "COMMERCIAL_LAND",
      "roadAccessFeet": 15,
      "frontageFeet": 30,
      "facingDirection": "NORTH",
      "isCornerPlot": true
    }
  }' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg'
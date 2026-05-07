#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Premium Corner Plot in Lazimpat Near Diplomatic Missions",
    "slug": "premium-corner-plot-lazimpat-diplomatic-kathmandu-010",
    "summary": "Prime 5 Aana corner plot in prestigious Lazimpat near embassies, offering excellent location and investment potential in the diplomatic enclave.",
    "description": "This premium corner plot in Lazimpat represents a rare opportunity to own land in one of Kathmandu most prestigious neighborhoods adjacent to multiple diplomatic missions.\n\nThe 5 Aana corner plot offers excellent exposure with roads on two sides. The location directly across from the British Embassy makes this ideal for embassy staff, international organizations, or premium residential development.\n\nLazimpat is the quintessential diplomatic neighborhood with embassies, international organizations, and premium residences. The area offers unmatched security, infrastructure, and prestige.\n\nThe plot can accommodate a substantial residence or small apartment building. All utilities including three-phase electricity are available. Building permits are approved.\n\nThis is a legacy investment in a neighborhood where land rarely becomes available. The location ensures strong demand and lasting value.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 95000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Diplomatic Zone",
    "badgeTone": "WARM",
    "locationText": "Lazimpat, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7189,
    "longitude": 85.3078,
    "areaValue": 5,
    "areaUnit": "AANA",
    "titleStatus": "Ghar Jagga Purja",
    "waterAvailability": "Municipal Line Available",
    "electricity": "3-Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "RESIDENTIAL_PLOT",
      "roadAccessFeet": 18,
      "frontageFeet": 30,
      "facingDirection": "EAST",
      "isCornerPlot": true
    }
  }' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg'
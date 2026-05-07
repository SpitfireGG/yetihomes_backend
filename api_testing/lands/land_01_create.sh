#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Prime Residential Plot in Baluwatar Near Embassy Row",
    "slug": "prime-residential-plot-baluwatar-embassy-row-kathmandu-001",
    "summary": "Premium 8 Aana residential plot in the prestigious Baluwatar area, perfectly positioned near multiple embassies with 20ft blacktopped road access.",
    "description": "This exceptional residential plot in Baluwatar offers a rare opportunity to build your dream home in one of Kathmandu most coveted neighborhoods. The area is known for its tranquility, security, and proximity to diplomatic missions.\n\nThe plot measures 8 Aana (approximately 5,440 sq ft) with a rectangular shape ideal for custom home construction. The 20-foot wide blacktopped road provides easy access, and the plot faces east-southeast, ensuring abundant natural light throughout the day.\n\nThis corner plot offers excellent ventilation and privacy. The neighborhood is home to the British Embassy, Indian Embassy, and several other diplomatic missions, making it one of the safest and most desirable areas in Kathmandu.\n\nUtilities including water, electricity, and telecommunications are readily available. The plot is ready for immediate construction with all necessary municipal approvals in place.\n\nNearby amenities include the Baluwatar Club, Narayanhiti Gardens, and premium restaurants. Shopping centers and hospitals are within short driving distance.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 85000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Premium Location",
    "badgeTone": "WARM",
    "locationText": "Baluwatar, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7178,
    "longitude": 85.3089,
    "areaValue": 8,
    "areaUnit": "AANA",
    "titleStatus": "Ghar Jagga Purja",
    "waterAvailability": "Municipal Line Available",
    "electricity": "3-Phase NEA Available",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "RESIDENTIAL_PLOT",
      "roadAccessFeet": 20,
      "frontageFeet": 40,
      "facingDirection": "SOUTH_EAST",
      "isCornerPlot": true
    }
  }' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg'
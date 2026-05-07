#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Investment Plot in Balkumari Near New Shopping Complex",
    "slug": "investment-plot-balkumari-shopping-complex-kathmandu-009",
    "summary": "Growing area 4 Aana plot near new shopping complex with high appreciation potential in the rapidly developing Balkumari zone.",
    "description": "This investment plot in Balkumari offers strong appreciation potential in one of Kathmandu fastest-growing residential and commercial areas.\n\nThe 4 Aana plot is positioned near the newly opened shopping complex and residential towers. The area has seen transformative development with new roads, utilities, and commercial centers.\n\nBalkumari is becoming a hub for young families and professionals with its mix of affordable housing, shopping options, and connectivity. Several major developers have projects in the area.\n\nThe rectangular plot fronts a 15-foot paved road. Construction permits are straightforward to obtain. All utilities are available at the boundary.\n\nExcellent for investors seeking appreciation in a developing area or families seeking affordable modern housing with amenities.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 28000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Investment Opportunity",
    "badgeTone": "WARM",
    "locationText": "Balkumari, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.6712,
    "longitude": 85.3567,
    "areaValue": 4,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line",
    "electricity": "3-Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "RESIDENTIAL_PLOT",
      "roadAccessFeet": 15,
      "frontageFeet": 28,
      "facingDirection": "NORTH",
      "isCornerPlot": true
    }
  }' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg'
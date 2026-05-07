#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Affordable Residential Plot in Gausala Near Schools and Hospitals",
    "slug": "affordable-residential-plot-gausala-kathmandu-006",
    "summary": "Budget-friendly 3 Aana residential plot in Gausala, perfect for first-time buyers with proximity to major schools and teaching hospitals.",
    "description": "This affordable residential plot in Gausala represents an excellent entry point into real estate ownership in a well-established neighborhood with all essential amenities.\n\nThe 3 Aana plot is rectangular with 15 feet road access. The flat terrain is construction-ready with minimal site preparation required. All residential building approvals are in place.\n\nGausala is a vibrant residential neighborhood with excellent infrastructure. The area is known for its concentration of educational institutions including Trinity College, Avenues College, and several reputable schools. Teaching Hospital and Norvic Hospital are nearby.\n\nPublic transportation is readily available. Markets, restaurants, and daily necessities are within walking distance. The neighborhood is safe and family-friendly.\n\nPerfect for first-time home buyers or investors seeking an affordable property with strong rental demand from students and medical professionals.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 22000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Affordable",
    "badgeTone": "WARM",
    "locationText": "Gausala, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.6923,
    "longitude": 85.3423,
    "areaValue": 3,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line",
    "electricity": "Single Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "RESIDENTIAL_PLOT",
      "roadAccessFeet": 15,
      "frontageFeet": 22,
      "facingDirection": "EAST",
      "isCornerPlot": false
    }
  }' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg'
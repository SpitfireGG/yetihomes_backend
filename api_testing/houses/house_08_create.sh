#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Affordable 2-Bedroom House in Sankhamul for First-Time Buyers",
    "slug": "affordable-house-first-time-buyer-sankhamul-kathmandu-008",
    "summary": "Affordable entry-level home with 2 bedrooms, perfect for first-time buyers or investors looking for a solid rental property in Sankhamul.",
    "description": "This affordable 2-bedroom house in Sankhamul is perfect for first-time home buyers or investors seeking a reliable rental property. The property offers excellent value in a location with growing demand.\n\nThe compact but well-designed layout includes a living room, kitchen with dining area, two bedrooms, and a shared bathroom. A small courtyard provides outdoor space. TheProperty includes parking for one vehicle.\n\nLocated near the Ring Road, Sankhamul offers easy access to all parts of the city. Schools, markets, and public transportation are within walking distance. The area is developing rapidly with new residential projects.\n\nAn excellent opportunity for young couples starting their homeownership journey or investors looking to build their rental portfolio.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 18500000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Affordable",
    "badgeTone": "WARM",
    "locationText": "Sankhamul, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7012,
    "longitude": 85.3567,
    "areaValue": 1,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line",
    "electricity": "Single Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "BUNGALOW",
      "usageType": "RESIDENTIAL",
      "bedrooms": 2,
      "bathrooms": 1,
      "kitchens": 1,
      "floors": 2,
      "parkingSpaces": 1,
      "furnishingStatus": "SEMI_FURNISHED",
      "buildYear": 2012
    }
  }' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg'
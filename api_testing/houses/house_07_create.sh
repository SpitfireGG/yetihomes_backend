#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Spacious 5-Bedroom Family Home in Kality with Garden",
    "slug": "spacious-family-home-garden-kality-lalitpur-007",
    "summary": "Large family home featuring 5 bedrooms, spacious garden, home gym, and multiple living areas in the family-friendly Kality neighborhood.",
    "description": "This exceptionally spacious family home in Kality offers room to grow and thrive. Perfect for large families or those who love to entertain, this property has something for everyone.\n\nThe grand entrance leads to a large living room with bay windows, formal dining room, and a massive kitchen with breakfast area. A home office/library with built-in shelves provides the perfect work-from-home space. The ground floor also includes a guest bedroom with bathroom.\n\nThe upper level features five bedrooms, four bathrooms, and a family lounge. The master suite includes a sitting area, walk-in closet, and spa bathroom. Each bedroom has built-in wardrobes and study desks - ideal for children.\n\nThe property includes a large garden perfect for children to play, a dedicated home gym, storage rooms, and covered parking for three vehicles. 24/7 security and CCTV ensure peace of mind.",
    "propertyType": "HOUSE",
    "listingType": "RENT",
    "priceAmount": 120000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Family Large",
    "badgeTone": "WARM",
    "locationText": "Kality, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6589,
    "longitude": 85.3345,
    "areaValue": 5,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line & 8,000L Tank",
    "electricity": "3-Phase NEA with Generator",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "VILLA",
      "usageType": "RESIDENTIAL",
      "bedrooms": 5,
      "bathrooms": 5,
      "kitchens": 1,
      "floors": 2,
      "parkingSpaces": 3,
      "furnishingStatus": "FULLY_FURNISHED",
      "buildYear": 2021
    }
  }' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2195996.jpg'
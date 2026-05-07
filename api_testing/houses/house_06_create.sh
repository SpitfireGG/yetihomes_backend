#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Traditional Newari House in Patan with Courtyard",
    "slug": "traditional-newari-house-courtyard-patan-lalitpur-006",
    "summary": "Authentic Newari architecture featuring intricately carved woodwork, central courtyard, and rich cultural heritage in the heart of Patan.",
    "description": "This remarkable traditional Newari house represents centuries of architectural excellence and cultural significance. Located in the historic city of Patan, this home offers a unique opportunity to own a piece of Nepali heritage.\n\nThe property features authentic Newari architectural elements including intricately carved wooden windows (vyalu), traditional roof tiles, and a central courtyard (chowk) that brings in natural light and ventilation. The carved wooden pillars and beams showcase masterful craftsmanship.\n\nThe ground floor includes traditional reception rooms, a kitchen with traditional wood-fired stove area, and storage spaces. The upper floor contains bedrooms with the master bedroom opening to a beautiful wooden balcony overlooking the courtyard. Additional rooms can be used as puja room or home office.\n\nThe courtyard features a sacred peepal tree and traditional water fountain. Located in a heritage zone close to Patan Durbar Square, temples, and traditional markets.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 48000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Heritage",
    "badgeTone": "WARM",
    "locationText": "Patan, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6762,
    "longitude": 85.3241,
    "areaValue": 1.5,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja (Heritage)",
    "waterAvailability": "Municipal Line",
    "electricity": "Single Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "BUNGALOW",
      "usageType": "RESIDENTIAL",
      "bedrooms": 3,
      "bathrooms": 2,
      "kitchens": 1,
      "floors": 2,
      "parkingSpaces": 1,
      "furnishingStatus": "UNFURNISHED",
      "buildYear": 1950
    }
  }' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg'
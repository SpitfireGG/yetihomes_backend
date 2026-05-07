#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Cozy 3-Bedroom Townhouse in Tokha with Mountain Views",
    "slug": "cozy-townhouse-mountain-views-tokha-kathmandu-003",
    "summary": "Adorable townhouse with 3 bedrooms, rooftop terrace with stunning Himalayan views, and private garden in the serene Tokha area.",
    "description": "This cozy townhouse in the peaceful Tokha neighborhood offers breathtaking mountain views and a tranquil living environment. Perfect for families seeking a calm retreat from the city bustle while remaining conveniently connected.\n\nThe property spans three floors with thoughtful space planning. The ground floor includes a welcoming living room with fireplace, dining area, and compact but well-equipped kitchen. A private garden provides outdoor space for pets or gardening enthusiasts.\n\nThe first floor houses three bedrooms, each with access to balconies showcasing the magnificent Himalayan mountain range. The master bedroom features an ensuite bathroom. A shared family bathroom serves the other bedrooms.\n\nThe rooftop terrace is the highlight of this property - perfect for morning coffee or evening gatherings while enjoying the panoramic views of the snow-capped mountains. Additional features include a store room, parking for one vehicle, and municipal water connection.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 45000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Mountain View",
    "badgeTone": "COOL",
    "locationText": "Tokha, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7521,
    "longitude": 85.3234,
    "areaValue": 2,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line & 3,000L Tank",
    "electricity": "3-Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "TOWNHOUSE",
      "usageType": "RESIDENTIAL",
      "bedrooms": 3,
      "bathrooms": 2,
      "kitchens": 1,
      "floors": 3,
      "parkingSpaces": 1,
      "furnishingStatus": "SEMI_FURNISHED",
      "buildYear": 2018
    }
  }' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg'
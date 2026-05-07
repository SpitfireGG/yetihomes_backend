#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Executive 5-Bedroom Residence in Narayanhiti with Private Pool",
    "slug": "executive-residence-private-pool-narayanhiti-kathmandu-010",
    "summary": "Prestigious executive residence featuring 5 bedrooms, private swimming pool, home theater, and luxury finishes in the diplomatic enclave of Narayanhiti.",
    "description": "This executive residence in the prestigious Narayanhiti area represents the pinnacle of luxury living in Kathmandu. Perfect for executives, diplomats, or those who demand the very best.\n\nThe grand entrance foyer with double-height ceilings sets the tone for this magnificent property. The massive living room features floor-to-ceiling windows, designer furniture, and direct pool access. The formal dining room seats twelve guests comfortably. The gourmet kitchen includes dual islands, professional-grade appliances, and a secondary preparation kitchen.\n\nThe upper level contains five bedrooms, each with ensuite bathroom and walk-in closet. The master suite spans the entire front of the house with panoramic views, sitting room, dual closets, and a spa bathroom with jacuzzi and steam shower. The home theater seats eight in comfort.\n\nOutside, the private pool is surrounded by lounging areas and mature landscaping. Additional features include a wine cellar, home gym, staff quarters, triple garage, and state-of-the-art security system.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 185000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Luxury Executive",
    "badgeTone": "WARM",
    "locationText": "Narayanhiti, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7215,
    "longitude": 85.3012,
    "areaValue": 4,
    "areaUnit": "AANA",
    "titleStatus": "Ghar Jagga Purja",
    "waterAvailability": "Municipal Line & 15,000L Tank",
    "electricity": "3-Phase NEA with Generator & Solar",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "VILLA",
      "usageType": "RESIDENTIAL",
      "bedrooms": 5,
      "bathrooms": 6,
      "kitchens": 2,
      "floors": 3,
      "parkingSpaces": 3,
      "furnishingStatus": "FULLY_FURNISHED",
      "buildYear": 2023
    }
  }' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg'
#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Contemporary 4-Bedroom House in Jhamsikhel with Garage",
    "slug": "contemporary-house-garage-jhamsikhel-lalitpur-009",
    "summary": "Modern family home with 4 bedrooms, attached garage, rooftop garden, and premium finishes in the popular Jhamsikhel area.",
    "description": "This contemporary house in Jhamsikhel offers the perfect combination of modern design and practical family living. The property is close to restaurants, cafes, and the Jhamsikhel golf course.\n\nThe ground floor features an open-plan living and dining area with high ceilings and designer lighting. The modern kitchen includes a center island, quartz counters, and premium appliances. A bedroom with bathroom completes this level.\n\nThe upper floor hosts four bedrooms including the master with ensuite and balcony. A family lounge provides additional living space. The rooftop garden offers city views and outdoor dining potential.\n\nAdditional features include an attached two-car garage, home automation readiness, solar panel preparation, and water tank. Located in a quiet residential street with easy access to Jawalakhel and Ring Road.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 72000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Modern",
    "badgeTone": "COOL",
    "locationText": "Jhamsikhel, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6723,
    "longitude": 85.3123,
    "areaValue": 2.5,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line & 5,000L Tank",
    "electricity": "3-Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "VILLA",
      "usageType": "RESIDENTIAL",
      "bedrooms": 4,
      "bathrooms": 4,
      "kitchens": 1,
      "floors": 3,
      "parkingSpaces": 2,
      "furnishingStatus": "FULLY_FURNISHED",
      "buildYear": 2024
    }
  }' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg'
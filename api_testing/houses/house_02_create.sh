#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Elegant 4-Bedroom Bungalow in Sanepa with Home Office",
    "slug": "elegant-bungalow-home-office-sanepa-lalitpur-002",
    "summary": "Beautiful single-story bungalow featuring 4 bedrooms, dedicated home office, sunny courtyard, and modern finishes in the peaceful Sanepa neighborhood.",
    "description": "This elegant single-story bungalow offers the perfect blend of modern design and functional living in the coveted Sanepa area of Lalitpur. Ideal for professionals and families who value space, privacy, and convenience.\n\nThe thoughtfully designed layout maximizes natural light and ventilation throughout. The spacious living room features high ceilings, hardwood floors, and sliding doors that open to a private courtyard garden. The dedicated home office with soundproofing and high-speed internet is perfect for remote work. The modern kitchen includes a breakfast bar, quartz countertops, and premium built-in appliances.\n\nFour generously sized bedrooms include the master suite with walk-in closet and ensuite bathroom. Additional bedrooms share two full bathrooms. A separate servant quarter with bathroom adds versatility.\n\nThe property includes a two-car covered parking, rooftop terrace with city views, rain water harvesting system, and 24-hour security. Located walking distance to UN Park, embassies, and international schools.",
    "propertyType": "HOUSE",
    "listingType": "RENT",
    "priceAmount": 95000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Home Office",
    "badgeTone": "COOL",
    "locationText": "Sanepa, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6834,
    "longitude": 85.3123,
    "areaValue": 2.5,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line & 5,000L Overhead Tank",
    "electricity": "3-Phase NEA with Inverter",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "BUNGALOW",
      "usageType": "RESIDENTIAL",
      "bedrooms": 4,
      "bathrooms": 4,
      "kitchens": 1,
      "floors": 1,
      "parkingSpaces": 2,
      "furnishingStatus": "SEMI_FURNISHED",
      "buildYear": 2020
    }
  }' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2195996.jpg'
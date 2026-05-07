#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Classic 4-Bedroom Duplex in Baneshwor Near City Center",
    "slug": "classic-duplex-baneshwor-kathmandu-005",
    "summary": "Well-maintained duplex house with 4 bedrooms, rooftop terrace, and excellent rental potential in the heart of Baneshwor.",
    "description": "This classic duplex in Baneshwor offers an excellent investment opportunity or perfect family home in a central location. The property is walking distance to major shopping centers, restaurants, and public transportation.\n\nThe lower unit comprises a living room, kitchen, two bedrooms, and a bathroom. Ideal for rental income or extended family accommodation. The upper unit features a larger living space, formal dining, three bedrooms including a master with balcony, and two bathrooms.\n\nBoth units have separate entrance and meters. The property includes a rooftop terrace with city views, parking for two vehicles, and municipal utilities. Currently generating rental income of NPR 45,000 monthly from the lower unit.\n\nPerfect for investors seeking immediate returns or larger families needing separate living spaces.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 55000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Investment Ready",
    "badgeTone": "WARM",
    "locationText": "Baneshwor, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.6925,
    "longitude": 85.3431,
    "areaValue": 1.5,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line",
    "electricity": "Separate Meters",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "DUPLEX",
      "usageType": "SEMI_COMMERCIAL",
      "bedrooms": 4,
      "bathrooms": 3,
      "kitchens": 2,
      "floors": 2,
      "parkingSpaces": 2,
      "furnishingStatus": "SEMI_FURNISHED",
      "buildYear": 2015
    }
  }' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg'
#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Affordable 1-Bedroom Apartment in Koteshwor Near Airport",
    "slug": "affordable-1bedroom-apartment-koteshwor-airport-kathmandu-006",
    "summary": "Budget-friendly 1-bedroom apartment in Koteshwor with convenient airport access, ideal for frequent travelers or airport workers.",
    "description": "This affordable 1-bedroom apartment in Koteshwor offers practical living with easy access to the international airport and main transportation routes.\n\nThe functional layout includes a living area, compact kitchen, bedroom with storage, and bathroom. The building offers basic amenities including security and municipal utilities.\n\nKoteshwor is a strategic location near the airport, ring road, and bus park. The neighborhood has markets, restaurants, and daily necessities. Public transportation is readily available.\n\nPerfect for young professionals, airport workers, or those seeking affordability and connectivity. The rent includes maintenance and building security.\n\nMinutes from TIA airport, bus park, and major transportation hub.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 20000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Airport Area",
    "badgeTone": "COOL",
    "locationText": "Koteshwor, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.6789,
    "longitude": 85.3567,
    "areaValue": 650,
    "areaUnit": "SQ_FT",
    "titleStatus": "Clear Title",
    "waterAvailability": "Municipal",
    "electricity": "Single Phase",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "APARTMENT",
      "bedrooms": 1,
      "bathrooms": 1,
      "balconies": 0,
      "floorNumber": 2,
      "totalFloors": 5,
      "hasLift": false,
      "hasParking": false,
      "furnishingStatus": "SEMI_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/a-tall-multi-storey-glass-building-in-a-white-and-brown-city-the-house-has-balconies-stylish-decoration-ergonomic-arrangement-against-the-backdrop-of-a-sunny-blue-sunny-sky-photo.jpg' \
  -F 'images=@uploads/properties/apartments/new-multy-storey-residential-building-on-the-city-street-photo.jpg' \
  -F 'images=@uploads/properties/apartments/modern-urban-highrise-building-architecture-featuring-a-sleek-aesthetic-design-alongside-expansive-large-windows-that-allow-abundant-natural-light-inside-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/modern-apartment-complex-exterior-facade-of-modern-multi-storey-building-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/cityscape-with-views-of-buildings-and-architecture-sochi-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/glass-building-with-balcony-with-blue-sky-background-abstract-part-of-modern-architecture-glass-and-concrete-walls-photo.jpg'
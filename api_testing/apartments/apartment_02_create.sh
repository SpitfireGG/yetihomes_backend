#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Modern 2-Bedroom Apartment in Thamel Near Tourist Area",
    "slug": "modern-2bedroom-apartment-thamel-tourist-kathmandu-002",
    "summary": "Contemporary 2-bedroom apartment in the heart of Thamel with modern amenities, perfect for young professionals or tourists seeking central location.",
    "description": "This modern 2-bedroom apartment in Thamel offers the perfect blend of contemporary living and prime location in Kathmandu tourism hub.\n\nThe open-plan living area is bright and functional with modern furniture. The kitchen includes essential appliances and compact storage. Two bedrooms with built-in wardrobes provide comfortable sleeping arrangements. The bathroom features modern fixtures.\n\nThamel is the tourist and entertainment center of Kathmandu with restaurants, shops, and nightlife at your doorstep. Public transportation is readily available. The apartment is ideal for short-term rentals or long-term residence.\n\nBuilding amenities include security, rooftop access, and basic maintenance. A great opportunity for investors seeking rental income from tourists or professionals seeking central living.\n\nWalking distance to major attractions including Durbar Square, Garden of Dreams, and numerous restaurants and cafes.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 45000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Central Location",
    "badgeTone": "COOL",
    "locationText": "Thamel, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7145,
    "longitude": 85.3067,
    "areaValue": 950,
    "areaUnit": "SQ_FT",
    "titleStatus": "Clear Title",
    "waterAvailability": "Municipal & Tank",
    "electricity": "Single Phase with Backup",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "APARTMENT",
      "bedrooms": 2,
      "bathrooms": 1,
      "balconies": 1,
      "floorNumber": 3,
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
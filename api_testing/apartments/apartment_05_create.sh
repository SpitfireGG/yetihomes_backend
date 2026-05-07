#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Premium 4-Bedroom Apartment in Lazimpat with Concierge",
    "slug": "premium-4bedroom-apartment-lazimpat-concierge-kathmandu-005",
    "summary": "Luxury 4-bedroom residence in prestigious Lazimpat with concierge service, parking, and premium building amenities.",
    "description": "This premium 4-bedroom apartment in Lazimpat offers sophisticated living in Kathmandu most exclusive diplomatic neighborhood with full concierge service.\n\nThe grand living room features high ceilings and premium finishes. The formal dining room seats eight comfortably. The gourmet kitchen includes dual ovens, large refrigerator, and premium appliances. Four bedrooms include the master with walk-in closet and spa bathroom.\n\nBuilding amenities include concierge service, 24/7 security, backup power, heated parking, and maintenance staff. The location directly opposite the British Embassy makes this ideal for embassy personnel.\n\nNearby attractions include Narayanhiti Palace Museum, gardens, and premium restaurants. Easy access to all parts of the city via the Ring Road.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 180000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Diplomatic Living",
    "badgeTone": "WARM",
    "locationText": "Lazimpat, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7178,
    "longitude": 85.3089,
    "areaValue": 3200,
    "areaUnit": "SQ_FT",
    "titleStatus": "Clear Title",
    "waterAvailability": "Municipal & Tank",
    "electricity": "3-Phase with Generator",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "APARTMENT",
      "bedrooms": 4,
      "bathrooms": 4,
      "balconies": 2,
      "floorNumber": 5,
      "totalFloors": 7,
      "hasLift": true,
      "hasParking": true,
      "furnishingStatus": "FULLY_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/a-large-building-with-a-clock-on-top-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/buildings-in-the-city-photo.jpg' \
  -F 'images=@uploads/properties/apartments/multistorey-building-with-new-modern-apartments-photo.jpg' \
  -F 'images=@uploads/properties/apartments/new-modern-tall-blue-glass-multi-storey-comfortable-urban-monolithic-frame-houses-buildings-skyscrapers-new-buildings-in-the-big-city-of-the-megalopolis-photo.jpg' \
  -F 'images=@uploads/properties/apartments/new-high-rise-apartament-building-with-multiple-balcony-and-windows-on-blue-sky-with-white-clouds-background-photo.jpg' \
  -F 'images=@uploads/properties/apartments/a-tall-multi-storey-glass-building-in-a-white-and-brown-city-the-house-has-balconies-stylish-decoration-ergonomic-arrangement-against-the-backdrop-of-a-sunny-blue-sunny-sky-photo.jpg'
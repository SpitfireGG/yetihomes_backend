#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Duplex Apartment in Tokha with Mountain Views and Rooftop Access",
    "slug": "duplex-apartment-mountain-views-rooftop-tokha-kathmandu-009",
    "summary": "Unique duplex apartment in Tokha with stunning Himalayan views, private rooftop terrace, and spacious interior in a breezy elevated location.",
    "description": "This distinctive duplex apartment in Tokha offers the rare combination of mountain views, private outdoor space, and elevated living with fresh mountain air.\n\nThe ground floor features a spacious living room with large windows, dining area, kitchen, and bathroom. An internal staircase leads to the upper level with two bedrooms and bathroom. The private rooftop terrace is the highlight - perfect for morning yoga or evening gatherings with panoramic mountain views.\n\nTokha is known for its cooler climate, mountain views, and peaceful atmosphere. The neighborhood is popular with those seeking respite from the city heat. Easy access via the Tokha road.\n\nBuilding includes parking, security, and municipal utilities. An excellent choice for mountain lovers seeking unique character in their home.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 40000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Mountain View",
    "badgeTone": "COOL",
    "locationText": "Tokha, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7521,
    "longitude": 85.3234,
    "areaValue": 1400,
    "areaUnit": "SQ_FT",
    "titleStatus": "Clear Title",
    "waterAvailability": "Municipal & Tank",
    "electricity": "3-Phase with Backup",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "APARTMENT",
      "bedrooms": 2,
      "bathrooms": 2,
      "balconies": 1,
      "floorNumber": 4,
      "totalFloors": 4,
      "hasLift": false,
      "hasParking": true,
      "furnishingStatus": "SEMI_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/a-large-building-with-a-clock-on-top-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/buildings-in-the-city-photo.jpg' \
  -F 'images=@uploads/properties/apartments/multistorey-building-with-new-modern-apartments-photo.jpg' \
  -F 'images=@uploads/properties/apartments/new-modern-tall-blue-glass-multi-storey-comfortable-urban-monolithic-frame-houses-buildings-skyscrapers-new-buildings-in-the-big-city-of-the-megalopolis-photo.jpg' \
  -F 'images=@uploads/properties/apartments/new-high-rise-apartament-building-with-multiple-balcony-and-windows-on-blue-sky-with-white-clouds-background-photo.jpg' \
  -F 'images=@uploads/properties/apartments/a-tall-multi-storey-glass-building-in-a-white-and-brown-city-the-house-has-balconies-stylish-decoration-ergonomic-arrangement-against-the-backdrop-of-a-sunny-blue-sunny-sky-photo.jpg'
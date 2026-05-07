#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Executive 3-Bedroom Apartment in Narayanhiti Near Ministries",
    "slug": "executive-3bedroom-apartment-narayanhiti-ministries-kathmandu-007",
    "summary": "Professional 3-bedroom apartment in government corridor with easy access to ministries, perfect for government officials and executives.",
    "description": "This executive 3-bedroom apartment in Narayanhiti is perfectly positioned for professionals working in government or diplomatic sectors.\n\nThe spacious living room is ideal for meetings and entertaining. The dining area seats six. The kitchen includes quality appliances and storage. Three bedrooms include the master with ensuite. Additional features include a work-from-home corner and storage.\n\nNarayanhiti is the government corridor with direct access to ministries, parliament, and diplomatic missions. The neighborhood is secure and well-maintained. Easy access to the city center and main roads.\n\nBuilding amenities include security, parking, backup power, and maintenance. Walking distance to Singha Durbar, ministries, and government offices.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 85000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Government Area",
    "badgeTone": "COOL",
    "locationText": "Narayanhiti, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7215,
    "longitude": 85.3012,
    "areaValue": 2100,
    "areaUnit": "SQ_FT",
    "titleStatus": "Clear Title",
    "waterAvailability": "Municipal & Tank",
    "electricity": "3-Phase with Backup",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "APARTMENT",
      "bedrooms": 3,
      "bathrooms": 3,
      "balconies": 1,
      "floorNumber": 3,
      "totalFloors": 6,
      "hasLift": true,
      "hasParking": true,
      "furnishingStatus": "FULLY_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/downtown-apartments-view-photo.jpg' \
  -F 'images=@uploads/properties/apartments/facade-of-a-modern-multi-storey-residential-complex-urban-architecture-photo.jpg' \
  -F 'images=@uploads/properties/apartments/close-up-of-blue-modern-building-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/old-historical-buildings-in-the-city-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/a-modern-city-skyline-features-impressive-towers-and-picturesque-coastal-views-that-attract-many-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/unique-architectural-design-showcases-a-striking-modern-building-against-a-moody-sky-in-an-urban-landscape-during-twilight-hours-photo.jpg'
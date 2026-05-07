#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Spacious 3-Bedroom Family Apartment in Baneshwor with Lift",
    "slug": "spacious-3bedroom-family-apartment-baneshwor-kathmandu-003",
    "summary": "Large family-friendly 3-bedroom apartment with lift access, parking, and amenities in the central Baneshwor neighborhood.",
    "description": "This spacious 3-bedroom apartment in Baneshwor is perfect for families seeking comfort and convenience in a central location with all essential amenities.\n\nThe apartment features a large living room, formal dining area, and well-appointed kitchen. Three bedrooms include the master with ensuite and balcony. A family bathroom serves the other bedrooms. Storage spaces are thoughtfully integrated.\n\nBuilding amenities include 24/7 security, lift access, covered parking, and backup water. The apartment receives excellent natural light throughout the day.\n\nBaneshwor is a established residential and commercial hub with easy access to markets, schools, and public transportation. Ring Road and airport are easily accessible.\n\nConveniently located near schools, hospitals, shopping centers, and restaurants. An excellent value for families seeking space in a prime location.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 65000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Family Friendly",
    "badgeTone": "WARM",
    "locationText": "Baneshwor, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.6925,
    "longitude": 85.3431,
    "areaValue": 1800,
    "areaUnit": "SQ_FT",
    "titleStatus": "Clear Title",
    "waterAvailability": "Municipal & Tank",
    "electricity": "3-Phase with Backup",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "APARTMENT",
      "bedrooms": 3,
      "bathrooms": 2,
      "balconies": 1,
      "floorNumber": 4,
      "totalFloors": 6,
      "hasLift": true,
      "hasParking": true,
      "furnishingStatus": "SEMI_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/downtown-apartments-view-photo.jpg' \
  -F 'images=@uploads/properties/apartments/facade-of-a-modern-multi-storey-residential-complex-urban-architecture-photo.jpg' \
  -F 'images=@uploads/properties/apartments/close-up-of-blue-modern-building-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/old-historical-buildings-in-the-city-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/a-modern-city-skyline-features-impressive-towers-and-picturesque-coastal-views-that-attract-many-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/unique-architectural-design-showcases-a-striking-modern-building-against-a-moody-sky-in-an-urban-landscape-during-twilight-hours-photo.jpg'
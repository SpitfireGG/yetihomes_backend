#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Garden View 2-Bedroom Apartment in Jhamsikhel Near Golf Course",
    "slug": "garden-view-2bedroom-apartment-jhamsikhel-golf-lalitpur-008",
    "summary": "Peaceful 2-bedroom apartment with garden views in Jhamsikhel, walking distance to the golf course and popular social hotspots.",
    "description": "This garden-view 2-bedroom apartment in Jhamsikhel offers a tranquil living environment in one of Lalitpur most desirable neighborhoods.\n\nThe living room opens to a balcony overlooking the garden. The kitchen is well-equipped with modern appliances. Two bedrooms provide comfortable sleeping arrangements. The bathroom features modern fixtures.\n\nJhamsikhel is Known for the golf course, restaurants, cafes, and vibrant nightlife. The neighborhood is popular with expats and young professionals. Excellent walking options and connectivity.\n\nBuilding amenities include garden access, parking, security, and backup water. Minutes from the golf course, Jhamsikhel restaurants, and Jawalakhel.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 55000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Garden View",
    "badgeTone": "COOL",
    "locationText": "Jhamsikhel, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6723,
    "longitude": 85.3123,
    "areaValue": 1100,
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
      "floorNumber": 2,
      "totalFloors": 5,
      "hasLift": true,
      "hasParking": true,
      "furnishingStatus": "SEMI_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/cityscape-wuxi_1127-3968.jpg' \
  -F 'images=@uploads/properties/apartments/chinese-city_1127-4129.jpg' \
  -F 'images=@uploads/properties/apartments/city-sunset_1127-4143.jpg' \
  -F 'images=@uploads/properties/apartments/modern-country-houses-construction_1385-14.jpg' \
  -F 'images=@uploads/properties/apartments/modern-country-houses-construction_1385-16.jpg' \
  -F 'images=@uploads/properties/apartments/a-large-building-with-a-clock-on-top-free-photo.jpg'
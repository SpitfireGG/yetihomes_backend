#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Studio Apartment in Patan for Students and Young Professionals",
    "slug": "studio-apartment-patan-students-young-professionals-lalitpur-004",
    "summary": "Compact and efficient studio apartment in historic Patan, ideal for students at Patan Academy or young professionals starting their careers.",
    "description": "This well-designed studio apartment in Patan offers efficient living space perfect for individuals or couples in one of Lalitpur most culturally rich neighborhoods.\n\nThe open layout combines sleeping, living, and dining areas in a functional space. A separate kitchenette includes basic appliances and storage. The bathroom is modern with quality fixtures. Built-in storage maximizes space efficiency.\n\nPatan is a center of art, culture, and education with Patan Academy, Patan Hospital, and numerous temples and markets. The neighborhood offers easy access to public transportation and is popular with students and creative professionals.\n\nThe building is quiet with other young professionals and students. Amenities include municipal water, electricity, and basic security. Walking distance to Patan Dhoka, Golden Gate, and local restaurants.\n\nAn affordable entry point into independent living in one of the most desirable neighborhoods in the Valley.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 25000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Student Friendly",
    "badgeTone": "WARM",
    "locationText": "Patan, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6762,
    "longitude": 85.3241,
    "areaValue": 450,
    "areaUnit": "SQ_FT",
    "titleStatus": "Clear Title",
    "waterAvailability": "Municipal",
    "electricity": "Single Phase",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "STUDIO",
      "bedrooms": 1,
      "bathrooms": 1,
      "balconies": 0,
      "floorNumber": 2,
      "totalFloors": 4,
      "hasLift": false,
      "hasParking": false,
      "furnishingStatus": "SEMI_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/cityscape-wuxi_1127-3968.jpg' \
  -F 'images=@uploads/properties/apartments/chinese-city_1127-4129.jpg' \
  -F 'images=@uploads/properties/apartments/city-sunset_1127-4143.jpg' \
  -F 'images=@uploads/properties/apartments/modern-country-houses-construction_1385-14.jpg' \
  -F 'images=@uploads/properties/apartments/modern-country-houses-construction_1385-16.jpg' \
  -F 'images=@uploads/properties/apartments/a-large-building-with-a-clock-on-top-free-photo.jpg'
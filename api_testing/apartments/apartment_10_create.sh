#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/apartments \
  -F 'data={
    "title": "Fully Furnished 3-Bedroom in Kupondole Near Hospitals and Schools",
    "slug": "furnished-3bedroom-kupondole-hospitals-schools-lalitpur-010",
    "summary": "Move-in ready 3-bedroom apartment in Kupondole fully furnished with appliances, walking distance to Teaching Hospital and top schools.",
    "description": "This fully furnished 3-bedroom apartment in Kupondole offers turnkey living in a medically significant neighborhood near major hospitals and educational institutions.\n\nThe open living and dining area is tastefully furnished with modern furniture. The kitchen includes refrigerator, washing machine, microwave, and all essential cookware. Three bedrooms feature quality bedding and storage. Two bathrooms are modern with quality fixtures.\n\nKupondole is strategically located near Patan Teaching Hospital, Nobel Medical College, and several renowned schools including Little Angels College. The neighborhood has markets, pharmacies, and daily necessities.\n\nBuilding amenities include security, parking, backup water and power. Walking distance to hospitals, schools, and Patan. Easy access to Ring Road.\n\nAn ideal choice for medical professionals, academics, or families seeking convenience and fully equipped living.",
    "propertyType": "APARTMENT",
    "listingType": "RENT",
    "priceAmount": 55000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Fully Furnished",
    "badgeTone": "WARM",
    "locationText": "Kupondole, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6789,
    "longitude": 85.3234,
    "areaValue": 1500,
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
      "floorNumber": 3,
      "totalFloors": 6,
      "hasLift": true,
      "hasParking": true,
      "furnishingStatus": "FULLY_FURNISHED"
    }
  }' \
  -F 'images=@uploads/properties/apartments/a-tall-multi-storey-glass-building-in-a-white-and-brown-city-the-house-has-balconies-stylish-decoration-ergonomic-arrangement-against-the-backdrop-of-a-sunny-blue-sunny-sky-photo.jpg' \
  -F 'images=@uploads/properties/apartments/new-multy-storey-residential-building-on-the-city-street-photo.jpg' \
  -F 'images=@uploads/properties/apartments/modern-urban-highrise-building-architecture-featuring-a-sleek-aesthetic-design-alongside-expansive-large-windows-that-allow-abundant-natural-light-inside-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/modern-apartment-complex-exterior-facade-of-modern-multi-storey-building-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/cityscape-with-views-of-buildings-and-architecture-sochi-free-photo.jpg' \
  -F 'images=@uploads/properties/apartments/glass-building-with-balcony-with-blue-sky-background-abstract-part-of-modern-architecture-glass-and-concrete-walls-photo.jpg'
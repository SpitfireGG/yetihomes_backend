#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Luxury 5-Bedroom Villa with Swimming Pool in Lazimpat",
    "slug": "luxury-villa-swimming-pool-lazimpat-kathmandu-001",
    "summary": "Stunning modern villa featuring 5 spacious bedrooms,Private swimming pool, landscaped garden, home automation system, and 24/7 security in one of Kathmandu most premium residential areas.",
    "description": "This exquisite luxury villa offers an unparalleled living experience in the heart of Lazimpat, one of Kathmandu most prestigious neighborhoods. Perfect for large families or those seeking the ultimate in urban luxury.\n\nThe property spans across 4 floors of meticulously designed living space. The ground floor features a grand foyer with double-height ceilings, a massive living room with floor-to-ceiling windows overlooking the pool, formal dining area, a state-of-the-art gourmet kitchen with imported Italian cabinetry and premium appliances, and a guest bedroom with ensuite.\n\nFirst floor hosts the master suite with his-and-her walk-in closets, private balcony, and spa-like bathroom with jacuzzi. Four additional bedrooms, each with ensuite bathrooms and built-in wardrobes, complete this level. The second floor features a family lounge, home theater room, and access to the rooftop terrace with panoramic city and mountain views.\n\nAdditional amenities include a temperature-controlled swimming pool, landscaped zen garden, fully automated smart home system (lighting, climate, security), solar panels, 3-phase electricity with generator backup, underground water tank (10,000 liters), and private elevator.\n\nLocated just minutes from the British Embassy, Norwegian Embassy, and top international schools including Lincoln School and Ullens School.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 125000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Premium",
    "badgeTone": "WARM",
    "locationText": "Lazimpat, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7178,
    "longitude": 85.3089,
    "areaValue": 3.5,
    "areaUnit": "AANA",
    "titleStatus": "Ghar Jagga Purja",
    "waterAvailability": "Municipal Line & 10,000L Underground Tank",
    "electricity": "3-Phase NEA with Generator & Solar",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "VILLA",
      "usageType": "RESIDENTIAL",
      "bedrooms": 5,
      "bathrooms": 6,
      "kitchens": 2,
      "floors": 4,
      "parkingSpaces": 3,
      "furnishingStatus": "FULLY_FURNISHED",
      "buildYear": 2022
    }
  }' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg'

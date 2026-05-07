curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Spacious 3-Bedroom Townhouse in Gated Community, Sanepa",
    "slug": "townhouse-gated-community-sanepa-lalitpur",
    "summary": "Family-friendly townhouse featuring 3 bedrooms, community garden, kids play area, and 24/7 security in a peaceful gated community in Sanepa, close to international schools and embassies.",
    "description": "Perfect for families seeking security and community living, this 3-bedroom townhouse is located in a well-maintained gated community in Sanepa, Lalitpur. The property features a modern design with efficient space utilization and high-quality finishes.\n\nGround floor includes a spacious living room opening to a private courtyard, dining area, kitchen with modular cabinets, and a guest bathroom. First floor hosts three bedrooms, including a master bedroom with ensuite bathroom and balcony. Second floor offers a family room that can be converted to a fourth bedroom, plus a rooftop terrace with mountain views.\n\nCommunity amenities include landscaped gardens, children'\''s playground, community hall, and 24/7 security with CCTV surveillance. Each unit has dedicated parking for 2 vehicles.\n\nLocation benefits include walking distance to UN Park, embassies (US, UK, India), international schools (Lincoln School, Ullens School), and hospitals (Patan Hospital, Norvic).",
    "propertyType": "HOUSE",
    "listingType": "RENT",
    "priceAmount": 85000,
    "currency": "NPR",
    "pricePeriod": "MONTHLY",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Family Friendly",
    "badgeTone": "WARM",
    "locationText": "Sanepa, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6834,
    "longitude": 85.3123,
    "areaValue": 4.5,
    "areaUnit": "AANA",
    "titleStatus": "Clear Lal Purja",
    "waterAvailability": "Municipal Line & 3,000L Overhead Tank",
    "electricity": "3-Phase NEA with 5kVA Inverter",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "TOWNHOUSE",
      "usageType": "RESIDENTIAL",
      "bedrooms": 3,
      "bathrooms": 3,
      "kitchens": 1,
      "floors": 3,
      "parkingSpaces": 2,
      "furnishingStatus": "SEMI_FURNISHED",
      "buildYear": 2019
    }
  }' \
  -F 'images=@uploads/properties/houses/2195996.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg'

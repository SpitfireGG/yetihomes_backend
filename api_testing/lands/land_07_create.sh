#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Commercial Land in Teku Near Industrial Area",
    "slug": "commercial-land-teku-industrial-area-kathmandu-007",
    "summary": "Strategic 5 Aana commercial plot in Teku with warehouse and industrial access, ideal for logistics, storage, or manufacturing operations.",
    "description": "This commercial land parcel in Teku is perfectly positioned for warehouse, logistics, or light industrial operations. The location provides excellent access to major transportation routes.\n\nThe 5 Aana plot has direct access to the main road connecting to the Ring Road and highway. The area is established as an industrial and warehouse zone with heavy vehicle access.\n\nCurrent infrastructure includes three-phase electricity, municipal water, and paved road access. The property is suitable for warehouse construction, distribution center, or light manufacturing facility.\n\nTeku hosts numerous businesses including printing presses, manufacturing, and logistics companies. The area offers competitive rental rates and established utility connections.\n\nExcellent opportunity for businesses seeking to establish operations or investors interested in warehouse rental income.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 48000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Industrial",
    "badgeTone": "COOL",
    "locationText": "Teku, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.6856,
    "longitude": 85.3678,
    "areaValue": 5,
    "areaUnit": "AANA",
    "titleStatus": "Commercial Purja",
    "waterAvailability": "Municipal Line",
    "electricity": "3-Phase Industrial",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "COMMERCIAL_LAND",
      "roadAccessFeet": 20,
      "frontageFeet": 35,
      "facingDirection": "NORTH",
      "isCornerPlot": true
    }
  }' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg'
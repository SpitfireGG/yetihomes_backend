#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Residential Plot in Khumaltari with Lake View and Development Potential",
    "slug": "residential-plot-khumaltari-lake-view-lalitpur-004",
    "summary": "Prime 6 Aana residential plot in Khumaltari with beautiful lake views and approved building permits in a rapidly developing area.",
    "description": "This attractive residential plot in Khumaltari offers an excellent opportunity for custom home construction in an area with significant development momentum and natural beauty.\n\nThe 6 Aana rectangular plot features gentle slope with excellent views of the nearby lake and surrounding hills. The south-facing orientation maximizes natural light. Building permits are approved and ready for construction to begin immediately.\n\nKhumaltari is emerging as a preferred residential location due to its proximity to schools, temples, and recreational areas. The neighborhood has seen substantial infrastructure improvements including paved roads and reliable utilities.\n\nThe plot is ideal for a custom family home with basement parking, rooftop terrace, and garden. All municipal connections are at the property boundary. The quiet neighborhood is perfect for families.\n\nNearby attractions include the Khumaltari Lake, religious temples, and several renowned schools including the KUSOE campus.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 42000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Lake View",
    "badgeTone": "COOL",
    "locationText": "Khumaltari, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6545,
    "longitude": 85.3234,
    "areaValue": 6,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Municipal Line",
    "electricity": "3-Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "RESIDENTIAL_PLOT",
      "roadAccessFeet": 18,
      "frontageFeet": 35,
      "facingDirection": "SOUTH",
      "isCornerPlot": false
    }
  }' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg'
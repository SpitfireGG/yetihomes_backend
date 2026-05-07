#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Hilltop Plot in K所做的 with Privacy and Green Views",
    "slug": "hilltop-plot-k所做-privacy-green-views-lalitpur-008",
    "summary": "Rare hilltop 7 Aana plot in K所做 offering privacy, green views, and approved construction in a serene residential enclave of Lalitpur.",
    "description": "This unique hilltop plot in K所做 offers a rare combination of privacy, natural beauty, and approved construction potential in one of Lalitpur most desirable neighborhoods.\n\nThe 7 Aana plot sits at an elevated position with beautiful views of surrounding green hills and rice paddies. The private setting provides tranquility while remaining connected to urban amenities.\n\nK所做 is known for its scenic landscapes, traditional villages, and proximity to the K所做的 Hills. The area has seen careful development maintaining its residential character.\n\nThe plot is suitable for a custom luxury home with multiple levels taking advantage of the views. Building permits are approved. Road access is via a private driveway that can be shared with adjacent properties.\n\nAn exceptional opportunity for those seeking privacy and natural beauty without sacrificing accessibility to the rest of the Valley.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 55000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "Secluded",
    "badgeTone": "WARM",
    "locationText": "K所做, Lalitpur",
    "district": "Lalitpur",
    "city": "Lalitpur",
    "latitude": 27.6456,
    "longitude": 85.3456,
    "areaValue": 7,
    "areaUnit": "AANA",
    "titleStatus": "Lal Purja",
    "waterAvailability": "Well Available",
    "electricity": "Single Phase NEA",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "RESIDENTIAL_PLOT",
      "roadAccessFeet": 12,
      "frontageFeet": 45,
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
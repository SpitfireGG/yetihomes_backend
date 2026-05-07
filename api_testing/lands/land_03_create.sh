#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/lands \
  -F 'data={
    "title": "Agricultural Land in Champapuri with River Frontage",
    "slug": "agricultural-land-champapuri-river-frontage-003",
    "summary": "Spacious 20 Aana agricultural plot with river frontage, ideal for organic farming, agro-tourism, or residential development in the scenic Champapuri area.",
    "description": "This substantial agricultural land parcel in Champapuri offers diverse opportunities for farming, eco-tourism, or residential development. The property features river frontage providing reliable water supply and beautiful views.\n\nThe 20 Aana (approximately 13,600 sq ft) plot is primarily flat agricultural land with established trees and river access. The location away from city congestion provides an ideal environment for organic farming or sustainable living.\n\nThe Bagmati River flows along one boundary, providing year-round water for irrigation. The soil quality is excellent for vegetable cultivation, fruit trees, or nursery operations. The property already has basic infrastructure including a small storage structure and well.\n\nThe area is developing rapidly with new residential projects while maintaining its agricultural character. The property offers both privacy and community - a rare combination in the Kathmandu Valley.\n\nPerfect for those seeking a sustainable lifestyle, investment in agricultural land, or development of an eco-friendly residential project.",
    "propertyType": "LAND",
    "listingType": "SALE",
    "priceAmount": 35000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": false,
    "badgeLabel": "River Front",
    "badgeTone": "WARM",
    "locationText": "Champapuri, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.7456,
    "longitude": 85.3789,
    "areaValue": 20,
    "areaUnit": "AANA",
    "titleStatus": "Land Purja (Agricultural)",
    "waterAvailability": "River & Well",
    "electricity": "Single Phase Available",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "AGRICULTURAL_LAND",
      "isCornerPlot": false
    }
  }' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg' \
  -F 'images=@uploads/properties/best-house.jpg' \
  -F 'images=@uploads/properties/cresthouse.jpg'
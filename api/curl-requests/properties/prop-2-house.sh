#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Affordable Family Home in Tokha\",
    \"slug\": \"affordable-family-home-tokha\",
    \"summary\": \"Budget-friendly family home with easy access to main road\",
    \"description\": \"A well-designed affordable home in the growing Tokha area. Perfect for first-time buyers, this property features three bedrooms, two bathrooms, a modern kitchen, and a small garden. Located just 5 minutes from the main road with good public transport connections. The neighborhood is developing rapidly with new schools and shops opening nearby.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 12000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Value Pick\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Tokha, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7612,
    \"longitude\": 85.3098,
    \"areaValue\": 1800,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Municipal Supply\",
    \"electricity\": \"Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"BUNGALOW\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 3,
      \"bathrooms\": 2,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"UNFURNISHED\",
      \"buildYear\": 2022
    },
    \"amenityIds\": []
  }"

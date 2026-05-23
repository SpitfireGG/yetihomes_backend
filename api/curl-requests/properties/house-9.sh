#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Mountain View Chalet in Nagarkot\",
    \"slug\": \"mountain-view-chalet-nagarkot\",
    \"summary\": \"A cozy mountain chalet with stunning Himalayan views in Nagarkot\",
    \"description\": \"This beautiful mountain chalet in Nagarkot offers the perfect weekend getaway or vacation home. Wake up to spectacular sunrise views over the Himalayas, enjoy the cool mountain air, and relax in this cozy retreat. Features include two bedrooms, fireplace, large balcony, and surrounding pine forest. Perfect for nature lovers and adventure seekers.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 15000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Vacation\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Nagarkot, Kavrepalanchok\",
    \"district\": \"Kavrepalanchok\",
    \"city\": \"Kavrepalanchok\",
    \"latitude\": 27.7156,
    \"longitude\": 85.5245,
    \"areaValue\": 1500,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Rainwater Harvesting\",
    \"electricity\": \"Solar Power Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"CHALET\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 2,
      \"bathrooms\": 2,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"FULLY_FURNISHED\",
      \"buildYear\": 2020
    },
    \"amenityIds\": []
  }"
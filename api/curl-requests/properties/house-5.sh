#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Hilltop Villa in Pharping\",
    \"slug\": \"hilltop-villa-pharping\",
    \"summary\": \"A stunning hilltop villa with panoramic mountain views\",
    \"description\": \"This extraordinary hilltop villa in Pharping offers breathtaking 360-degree views of the Himalayas and surrounding valleys. The property features a large terrace, five bedrooms with en-suite bathrooms, gourmet kitchen, swimming pool, and expansive gardens. Perfect for those seeking a luxury retreat with unparalleled natural beauty.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 65000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Luxury\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Pharping, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.4567,
    \"longitude\": 85.2890,
    \"areaValue\": 5000,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable 3-Phase Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"VILLA\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 5,
      \"bathrooms\": 5,
      \"kitchens\": 2,
      \"floors\": 3,
      \"parkingSpaces\": 3,
      \"furnishingStatus\": \"FULLY_FURNISHED\",
      \"buildYear\": 2021
    },
    \"amenityIds\": []
  }"
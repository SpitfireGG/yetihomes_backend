#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Riverside Bungalow in Tokha\",
    \"slug\": \"riverside-bungalow-tokha\",
    \"summary\": \"A peaceful riverside bungalow with scenic views in Tokha\",
    \"description\": \"Escape the city chaos with this beautiful riverside bungalow in Tokha. This property offers a serene lifestyle with stunning views of the river and surrounding hills. Features include four bedrooms, three bathrooms, large garden, parking for two vehicles, and access to the riverbank. Perfect for nature lovers and those seeking tranquility.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 28000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Tokha, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7456,
    \"longitude\": 85.3567,
    \"areaValue\": 3200,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Own Water Source\",
    \"electricity\": \"Stable Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"BUNGALOW\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 4,
      \"bathrooms\": 3,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 2,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2019
    },
    \"amenityIds\": []
  }"
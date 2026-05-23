#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Cozy Studio in Jhamsikhel\",
    \"slug\": \"cozy-studio-jhamsikhel\",
    \"summary\": \"Modern studio apartment perfect for young professionals\",
    \"description\": \"A beautifully designed studio apartment in the vibrant Jhamsikhel area. Ideal for singles or couples, this unit features an open-plan living space with modern kitchenette, a separate bathroom with rain shower, and a balcony overlooking the street. Walking distance to cafes, restaurants, and the international school corridor.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"RENT\",
    \"priceAmount\": 35000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"MONTHLY\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"New\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Jhamsikhel, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6721,
    \"longitude\": 85.3178,
    \"areaValue\": 550,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"STUDIO\",
      \"bedrooms\": 1,
      \"bathrooms\": 1,
      \"balconies\": 1,
      \"floorNumber\": 4,
      \"totalFloors\": 7,
      \"hasLift\": true,
      \"hasParking\": false,
      \"furnishingStatus\": \"FULLY_FURNISHED\"
    },
    \"amenityIds\": []
  }"

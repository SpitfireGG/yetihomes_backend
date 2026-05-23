#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Executive Townhouse in Gyaneshwor\",
    \"slug\": \"executive-townhouse-gyaneshwor\",
    \"summary\": \"A premium townhouse in the diplomatic enclave of Gyaneshwor\",
    \"description\": \"This executive townhouse in Gyaneshwor offers a perfect blend of luxury and convenience. Located near embassies and diplomatic missions, this property features four floors of living space, home office, rooftop garden, modern kitchen, and premium finishes throughout. Ideal for executives and diplomats seeking premium accommodation.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 42000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Premium\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Gyaneshwor, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7234,
    \"longitude\": 85.3421,
    \"areaValue\": 2800,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable 3-Phase Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"TOWNHOUSE\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 4,
      \"bathrooms\": 4,
      \"kitchens\": 1,
      \"floors\": 4,
      \"parkingSpaces\": 2,
      \"furnishingStatus\": \"FULLY_FURNISHED\",
      \"buildYear\": 2023
    },
    \"amenityIds\": []
  }"
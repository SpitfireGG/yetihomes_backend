#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Rental Investment Property in Balaju\",
    \"slug\": \"rental-investment-property-balaju\",
    \"summary\": \"A high-return rental property with multiple units in Balaju\",
    \"description\": \"This excellent investment opportunity in Balaju offers great rental income potential. The property consists of two separate units - a main house with three bedrooms and a studio apartment. Both units are currently rented, providing immediate income. Located near Balaju Industrial Area and major bus routes, demand for rental is consistently high.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 25000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Investment\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Balaju, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7456,
    \"longitude\": 85.3890,
    \"areaValue\": 2000,
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
      \"usageType\": \"COMMERCIAL\",
      \"bedrooms\": 4,
      \"bathrooms\": 3,
      \"kitchens\": 2,
      \"floors\": 3,
      \"parkingSpaces\": 2,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2018
    },
    \"amenityIds\": []
  }"
#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Luxury Duplex in Thamel\",
    \"slug\": \"luxury-duplex-thamel\",
    \"summary\": \"An elegant duplex house in the tourist hub of Thamel\",
    \"description\": \"This luxurious duplex house is perfect for those who want to live in the heart of Kathmandu's most vibrant area. The property features a rooftop terrace with mountain views, modern interiors, four bedrooms, spacious living area, and a fully equipped kitchen. Great potential for commercial use or as a premium residence.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 35000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Premium\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Thamel, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7148,
    \"longitude\": 85.3076,
    \"areaValue\": 2500,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable 3-Phase Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"DUPLEX\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 4,
      \"bathrooms\": 3,
      \"kitchens\": 1,
      \"floors\": 3,
      \"parkingSpaces\": 2,
      \"furnishingStatus\": \"FULLY_FURNISHED\",
      \"buildYear\": 2022
    },
    \"amenityIds\": []
  }"
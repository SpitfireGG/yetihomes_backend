#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Cozy Cottage in Patan\",
    \"slug\": \"cozy-cottage-patan\",
    \"summary\": \"A charming traditional cottage with modern interiors in Patan\",
    \"description\": \"This beautiful cozy cottage combines traditional Newari architecture with modern interior design. Located in the historic city of Patan, this property features a spacious courtyard, well-maintained garden, three bedrooms, modern kitchen, and authentic wooden details. Ideal for those who appreciate cultural heritage while enjoying modern comfort.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 22000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Featured\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Patan, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6765,
    \"longitude\": 85.3089,
    \"areaValue\": 1800,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"COTTAGE\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 3,
      \"bathrooms\": 2,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"FULLY_FURNISHED\",
      \"buildYear\": 2018
    },
    \"amenityIds\": []
  }"
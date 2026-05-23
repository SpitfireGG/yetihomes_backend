#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Garden Home in Bhaktapur\",
    \"slug\": \"garden-home-bhaktapur\",
    \"summary\": \"A beautiful home with large garden in the ancient city of Bhaktapur\",
    \"description\": \"This charming garden home in Bhaktapur offers a unique blend of traditional Newari architecture and modern living. The property features a spacious courtyard, mature garden trees, four bedrooms, traditional kitchen with wood-fired stove option, and authentic architectural details. Perfect for those who appreciate heritage and nature.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 19500000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Bhaktapur, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.6720,
    \"longitude\": 85.4290,
    \"areaValue\": 2400,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Public Water\",
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
      \"kitchens\": 2,
      \"floors\": 2,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2017
    },
    \"amenityIds\": []
  }"
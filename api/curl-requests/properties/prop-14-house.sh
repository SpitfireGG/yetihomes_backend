#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Duplex Home in Bhaktapur\",
    \"slug\": \"duplex-home-bhaktapur\",
    \"summary\": \"Spacious duplex home with traditional and modern design\",
    \"description\": \"A spacious duplex home in Bhaktapur that blends traditional Newari design with modern amenities. Features include four bedrooms, three bathrooms, a large living room, modern kitchen, and a courtyard. The property is located in a quiet neighborhood with easy access to the main highway.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 28000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Family Home\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Bhaktapur\",
    \"district\": \"Bhaktapur\",
    \"city\": \"Bhaktapur\",
    \"latitude\": 27.6712,
    \"longitude\": 85.4234,
    \"areaValue\": 3200,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"DUPLEX\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 4,
      \"bathrooms\": 3,
      \"kitchens\": 2,
      \"floors\": 2,
      \"parkingSpaces\": 2,
      \"furnishingStatus\": \"UNFURNISHED\",
      \"buildYear\": 2023
    },
    \"amenityIds\": []
  }"

#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Traditional Newari Home in Patan\",
    \"slug\": \"traditional-newari-home-patan\",
    \"summary\": \"Beautifully restored Newari heritage home with modern amenities\",
    \"description\": \"A rare opportunity to own a beautifully restored Newari heritage home in the heart of Patan. This property combines traditional Newari architecture with modern comforts. Features include carved wooden windows, brick courtyard, modern kitchen, three bedrooms, and a rooftop with temple views. Located within walking distance of Patan Durbar Square.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 35000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Heritage\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Patan, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6712,
    \"longitude\": 85.3234,
    \"areaValue\": 2800,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"Municipal Supply\",
    \"electricity\": \"Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"TRADITIONAL\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 3,
      \"bathrooms\": 2,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 1950
    },
    \"amenityIds\": []
  }"

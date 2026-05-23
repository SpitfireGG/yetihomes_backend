#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Budget-Friendly Home in Kirtipur\",
    \"slug\": \"budget-friendly-home-kirtipur\",
    \"summary\": \"An affordable yet comfortable home in the historic city of Kirtipur\",
    \"description\": \"This budget-friendly home in Kirtipur offers great value for money without compromising on comfort. The property includes three bedrooms, two bathrooms, living room, kitchen, and a small courtyard. Located in a safe neighborhood close to TU University, this is ideal for families and students alike.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 8500000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Affordable\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Kirtipur, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.6789,
    \"longitude\": 85.2789,
    \"areaValue\": 1200,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Limited Water Supply\",
    \"electricity\": \"Regular Electricity\",
    \"isVerified\": false,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"HOUSE\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 3,
      \"bathrooms\": 2,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 0,
      \"furnishingStatus\": \"UNFURNISHED\",
      \"buildYear\": 2015
    },
    \"amenityIds\": []
  }"
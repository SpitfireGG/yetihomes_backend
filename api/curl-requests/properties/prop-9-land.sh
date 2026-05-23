#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Farmhouse Land in Godawari\",
    \"slug\": \"farmhouse-land-godawari\",
    \"summary\": \"Large agricultural land perfect for farmhouse development\",
    \"description\": \"A beautiful piece of agricultural land in the serene Godawari area. Surrounded by green hills and fresh air, this land is perfect for building a farmhouse, weekend retreat, or organic farm. The land has gentle slopes with excellent drainage and a natural spring nearby. Located just 30 minutes from the city center.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 25000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Farmhouse\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Godawari, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6234,
    \"longitude\": 85.3567,
    \"areaValue\": 2,
    \"areaUnit\": \"ROOPANI\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Natural Spring\",
    \"electricity\": \"Available Nearby\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"AGRICULTURAL\",
      \"roadAccessFeet\": 15,
      \"frontageFeet\": 80,
      \"facingDirection\": \"SOUTH\",
      \"plotShape\": \"Irregular\",
      \"zoningType\": \"Agricultural\",
      \"isCornerPlot\": false
    },
    \"amenityIds\": []
  }"

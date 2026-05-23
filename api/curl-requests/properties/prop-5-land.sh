#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Prime Commercial Land in Chabahil\",
    \"slug\": \"prime-commercial-land-chabahil\",
    \"summary\": \"High-visibility commercial plot on main road\",
    \"description\": \"A rare opportunity to acquire a prime commercial plot on the busy Chabahil main road. With 40 feet of road frontage and excellent visibility, this land is ideal for commercial complex, showroom, or mixed-use development. All utilities are available at the boundary. The area has seen significant commercial growth in recent years.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 45000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Commercial\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Chabahil, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7234,
    \"longitude\": 85.3456,
    \"areaValue\": 8,
    \"areaUnit\": \"AANA\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Available at Boundary\",
    \"electricity\": \"3-Phase Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"COMMERCIAL_PLOT\",
      \"roadAccessFeet\": 40,
      \"frontageFeet\": 55,
      \"facingDirection\": \"SOUTH\",
      \"plotShape\": \"Rectangular\",
      \"zoningType\": \"Commercial\",
      \"isCornerPlot\": true
    },
    \"amenityIds\": []
  }"

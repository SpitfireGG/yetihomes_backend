#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Corner Plot in Satdobato\",
    \"slug\": \"corner-plot-satdobato\",
    \"summary\": \"Premium corner plot with dual road access\",
    \"description\": \"A premium corner plot in the rapidly developing Satdobato area with dual road access. The plot is flat and ready for construction with clear boundary walls. Excellent location for residential or commercial development. Close to the Ring Road and all major amenities.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 18000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Corner Plot\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Satdobato, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6567,
    \"longitude\": 85.3123,
    \"areaValue\": 6,
    \"areaUnit\": \"AANA\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Municipal Supply\",
    \"electricity\": \"Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"RESIDENTIAL_PLOT\",
      \"roadAccessFeet\": 25,
      \"frontageFeet\": 40,
      \"facingDirection\": \"SOUTH_WEST\",
      \"plotShape\": \"Rectangular\",
      \"zoningType\": \"Mixed Use\",
      \"isCornerPlot\": true
    },
    \"amenityIds\": []
  }"

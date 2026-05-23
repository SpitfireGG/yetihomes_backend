#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Residential Plot in Imadol\",
    \"slug\": \"residential-plot-imadol\",
    \"summary\": \"Affordable residential plot in fast-growing Imadol area\",
    \"description\": \"A well-located residential plot in the rapidly developing Imadol area. The plot is flat and ready for construction with clear boundary walls. Good road access and all utilities available nearby. Imadol is becoming a popular residential area due to its proximity to Ring Road and affordable land prices.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 8500000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Affordable\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Imadol, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6512,
    \"longitude\": 85.3234,
    \"areaValue\": 4,
    \"areaUnit\": \"AANA\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Municipal Line Nearby\",
    \"electricity\": \"Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"RESIDENTIAL_PLOT\",
      \"roadAccessFeet\": 20,
      \"frontageFeet\": 35,
      \"facingDirection\": \"EAST\",
      \"plotShape\": \"Rectangular\",
      \"zoningType\": \"Residential\",
      \"isCornerPlot\": false
    },
    \"amenityIds\": []
  }"

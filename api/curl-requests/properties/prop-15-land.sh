#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Hillside Plot in Nagarkot\",
    \"slug\": \"hillside-plot-nagarkot\",
    \"summary\": \"Scenic hillside plot with Himalayan mountain views\",
    \"description\": \"A stunning hillside plot in Nagarkot with breathtaking Himalayan mountain views. Perfect for building a resort, guesthouse, or private retreat. The land offers panoramic views of the Himalayan range including Everest on clear days. Located in a peaceful area with good road access.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 12000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Mountain View\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Nagarkot, Bhaktapur\",
    \"district\": \"Bhaktapur\",
    \"city\": \"Bhaktapur\",
    \"latitude\": 27.7123,
    \"longitude\": 85.5123,
    \"areaValue\": 10,
    \"areaUnit\": \"AANA\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Natural Spring\",
    \"electricity\": \"Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"RESIDENTIAL_PLOT\",
      \"roadAccessFeet\": 18,
      \"frontageFeet\": 60,
      \"facingDirection\": \"NORTH\",
      \"plotShape\": \"Irregular\",
      \"zoningType\": \"Tourism\",
      \"isCornerPlot\": false
    },
    \"amenityIds\": []
  }"

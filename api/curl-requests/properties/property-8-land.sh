#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Commercial Land in Kupondole\",
    \"slug\": \"commercial-land-kupondole\",
    \"summary\": \"Prime commercial plot near City Center\",
    \"description\": \"This excellent commercial land in Kupondole offers a fantastic investment opportunity. Located just minutes from the City Center Mall and main road, this plot is ideal for commercial development - hotel, office building, or retail complex. The land has clear title, road access from two sides, and all municipal services available. Perfect for investors or businesses looking to establish a presence in this rapidly developing area.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 85000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Investment Opportunity\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Kupondole, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6892,
    \"longitude\": 85.3245,
    \"areaValue\": 8,
    \"areaUnit\": \"ROPANI\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Municipal Connection Available\",
    \"electricity\": \"3-Phase Power Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-07T15:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=commercial-land\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2!2d85.3245!3d27.6892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzE0LjAiTiA4NcKyMzIuNDUiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"COMMERCIAL_LAND\",
      \"roadAccessFeet\": 40,
      \"frontageFeet\": 50,
      \"facingDirection\": \"SOUTH_WEST\",
      \"plotShape\": \"Rectangular\",
      \"zoningType\": \"Commercial\",
      \"isCornerPlot\": true
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg" \
  -F "images=@../uploads/properties/1778427003836-.jpg"
#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Agricultural Land in Godavari\",
    \"slug\": \"agricultural-land-godavari\",
    \"summary\": \"Fertile agricultural land with river access\",
    \"description\": \"This fertile agricultural land in Godavari is perfect for farming or as an investment. The land has reliable water source from a nearby river, fertile soil suitable for vegetables and fruits, and gentle slope ideal for irrigation. Currently used for seasonal crops, this property offers great potential for organic farming or horticultural development. The area has good road access and is near botanical garden and educational institutions.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 12000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Farm Land\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Godavari, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6502,
    \"longitude\": 85.3892,
    \"areaValue\": 20,
    \"areaUnit\": \"ROPANI\",
    \"titleStatus\": \"Land Ownership Certificate\",
    \"waterAvailability\": \"River Water Available\",
    \"electricity\": \"Power Connection Available\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-09T09:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=agricultural-land\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3529.8!2d85.3892!3d27.6502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzEwLjAiTiA4NcKyMzguOTIiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"AGRICULTURAL_LAND\",
      \"roadAccessFeet\": 25,
      \"frontageFeet\": 100,
      \"facingDirection\": \"EAST\",
      \"plotShape\": \"Irregular\",
      \"zoningType\": \"Agricultural\",
      \"isCornerPlot\": false
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg" \
  -F "images=@../uploads/properties/1778427003836-.jpg" \
  -F "images=@../uploads/properties/1778427003840-.jpg"
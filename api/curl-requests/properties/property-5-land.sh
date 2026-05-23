#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Prime Residential Plot in Budhanilkantha\",
    \"slug\": \"prime-residential-plot-budhanilkantha\",
    \"summary\": \"Ready to build plot with mountain views\",
    \"description\": \"This prime residential plot in the prestigious Budhanilkantha area offers an exceptional opportunity to build your dream home. The plot features a gentle slope with beautiful Himalayan views, clear boundary walls, and all utilities available at the boundary. The area is known for its peaceful environment, excellent security, and proximity to international schools and healthcare facilities. Perfect for constructing a luxury residence or investment property.\",
    \"propertyType\": \"LAND\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 15000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Investment\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Budhanilkantha, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7891,
    \"longitude\": 85.3712,
    \"areaValue\": 5,
    \"areaUnit\": \"AANA\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"Available at Boundary\",
    \"electricity\": \"Available at Boundary\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-04T11:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=land-tour\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.5!2d85.3712!3d27.7891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzQ1LjAiTiA4NcKyMzcuMTIiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"RESIDENTIAL_PLOT\",
      \"roadAccessFeet\": 30,
      \"frontageFeet\": 45,
      \"facingDirection\": \"NORTH_EAST\",
      \"plotShape\": \"Rectangular\",
      \"zoningType\": \"Residential\",
      \"isCornerPlot\": false
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg" \
  -F "images=@../uploads/properties/1778427003836-.jpg"
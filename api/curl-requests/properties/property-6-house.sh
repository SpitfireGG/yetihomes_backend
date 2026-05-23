#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Modern Townhouse in Jawalakhel\",
    \"slug\": \"modern-townhouse-jawalakhel\",
    \"summary\": \"Contemporary townhouse near Zoo and Gairigaon\",
    \"description\": \"This modern townhouse offers the perfect combination of style and practicality. Located in the popular Jawalakhel area, this property features a sleek modern design with three floors of living space. The ground floor includes a living room, kitchen, and parking. The first floor has two bedrooms with attached bathrooms, while the top floor offers a master suite with private terrace. Perfect for small families looking for a contemporary home in a great location.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 28000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"New\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Jawalakhel, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6698,
    \"longitude\": 85.3172,
    \"areaValue\": 1800,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable 3-Phase Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-05T08:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=townhouse-tour\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3530.8!2d85.3172!3d27.6698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzEwLjAiTiA4NcKyMzEuNzIiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"TOWNHOUSE\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 3,
      \"bathrooms\": 2,
      \"kitchens\": 1,
      \"floors\": 3,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2022
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg"
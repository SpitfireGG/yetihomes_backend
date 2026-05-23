#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Luxury Condo in Sanepa with City Views\",
    \"slug\": \"luxury-condo-sanepa-city-views\",
    \"summary\": \"Premium condo with modern amenities in prime location\",
    \"description\": \"This luxurious condo in Sanepa offers an exceptional living experience with stunning city views from every room. The apartment features an open-plan design with high-end finishes, imported kitchen appliances, three bedrooms including a master suite, two modern bathrooms, and a spacious balcony. Building amenities include 24/7 security, rooftop garden, gym, and covered parking. Close to hospitals, schools, and shopping centers.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 38000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Premium\",
    \"badgeTone\": \"COOL\",
    \"locationText\": \"Sanepa, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6798,
    \"longitude\": 85.3098,
    \"areaValue\": 1850,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable Electricity with Generator Backup\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-06T12:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=condo-tour\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.5!2d85.3098!3d27.6798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzE1LjAiTiA4NcKyMzAuOTgiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"CONDO\",
      \"bedrooms\": 3,
      \"bathrooms\": 2,
      \"balconies\": 1,
      \"floorNumber\": 8,
      \"totalFloors\": 12,
      \"hasLift\": true,
      \"hasParking\": true,
      \"furnishingStatus\": \"FULLY_FURNISHED\"
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg" \
  -F "images=@../uploads/properties/1778427003836-.jpg" \
  -F "images=@../uploads/properties/1778427003840-.jpg"
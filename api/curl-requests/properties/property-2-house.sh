#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Spacious Family Bungalow in Koteshwor\",
    \"slug\": \"spacious-family-bungalow-koteshwor\",
    \"summary\": \"A beautiful family bungalow with large garden and modern amenities\",
    \"description\": \"This stunning bungalow in Koteshwor offers the perfect blend of comfort and elegance. Featuring a spacious living room with high ceilings, a modern kitchen with premium appliances, four bedrooms including a master suite with attached bathroom, and a beautiful landscaped garden perfect for family gatherings. The property includes a covered parking area, servant quarters, and is located in a peaceful neighborhood with easy access to schools, hospitals, and shopping centers.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 32000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Hot Deal\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Koteshwor, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7185,
    \"longitude\": 85.3421,
    \"areaValue\": 2800,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable 3-Phase Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-01T10:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=property-tour-2\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8!2d85.3421!3d27.7185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzE1LjAiTiA4NcKyMjAuMzEiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"BUNGALOW\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 4,
      \"bathrooms\": 3,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2019
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg" \
  -F "images=@../uploads/properties/1778427003836-.jpg"
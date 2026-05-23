#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Modern Luxury Penthouse in Thamel\",
    \"slug\": \"modern-luxury-penthouse-thamel\",
    \"summary\": \"Stunning penthouse with rooftop terrace and panoramic city views\",
    \"description\": \"Experience urban luxury at its finest in this stunning penthouse apartment in the heart of Thamel. This exquisite residence features an open-plan living and dining area with floor-to-ceiling windows offering breathtaking city views, a gourmet kitchen with imported appliances, three spacious bedrooms including a master suite with walk-in closet, and a private rooftop terrace perfect for entertaining. The building offers 24/7 security, elevator access, and underground parking.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 55000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Exclusive\",
    \"badgeTone\": \"COOL\",
    \"locationText\": \"Thamel, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7148,
    \"longitude\": 85.3069,
    \"areaValue\": 2200,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable Electricity with Backup\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-02T14:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=penthouse-tour\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2!2d85.3069!3d27.7148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzE0LjAiTiA4NcKyMTkuMzkiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"PENTHOUSE\",
      \"bedrooms\": 3,
      \"bathrooms\": 3,
      \"balconies\": 2,
      \"floorNumber\": 12,
      \"totalFloors\": 15,
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
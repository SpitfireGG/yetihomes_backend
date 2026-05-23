#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Luxury Modern Villa in Lazimpat\",
    \"slug\": \"luxury-modern-villa-lazimpat\",
    \"summary\": \"A stunning modern villa with panoramic city views\",
    \"description\": \"This exquisite luxury villa offers an unparalleled living experience in the heart of Lazimpat. Featuring contemporary architecture with high-end finishes throughout, this property boasts spacious living areas, a gourmet kitchen, and floor-to-ceiling windows that flood the space with natural light. The master suite includes a private balcony with breathtaking city views, while the landscaped garden provides a serene retreat from urban life. Perfect for families seeking comfort and sophistication in a prime location.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 45000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Premium\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Lazimpat, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7312,
    \"longitude\": 85.3265,
    \"areaValue\": 3500,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"https://youtube.com/watch?v=example\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.5!2d85.3265!3d27.7312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzcyLjAiTiA4NsKyMTkzLjAiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"VILLA\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 5,
      \"bathrooms\": 4,
      \"kitchens\": 2,
      \"floors\": 3,
      \"parkingSpaces\": 2,
      \"furnishingStatus\": \"FULLY_FURNISHED\",
      \"buildYear\": 2023
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg" \
  -F "images=@../uploads/properties/1778427003836-.jpg" \
  -F "images=@../uploads/properties/1778427003840-.jpg"

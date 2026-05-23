#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Furnished 2BR Apartment in Patan\",
    \"slug\": \"furnished-2br-apartment-patan\",
    \"summary\": \"Move-in ready apartment in historic Patan\",
    \"description\": \"This beautiful furnished apartment in the heart of Patan is perfect for families or professionals. The unit features a spacious living room, two comfortable bedrooms, a modern kitchen with dining area, and a clean bathroom. The apartment comes fully furnished with quality furniture and appliances. Building features include secure entry, parking, and a small courtyard. Walking distance to Patan Durbar Square, restaurants, and cafes.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"RENT\",
    \"priceAmount\": 45000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"MONTHLY\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"For Rent\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Patan, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6758,
    \"longitude\": 85.2965,
    \"areaValue\": 900,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-08T10:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=apartment-rent\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3530.5!2d85.2965!3d27.6758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzE1LjAiTiA4NcKyMjkuNjUiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"APARTMENT\",
      \"bedrooms\": 2,
      \"bathrooms\": 1,
      \"balconies\": 1,
      \"floorNumber\": 2,
      \"totalFloors\": 4,
      \"hasLift\": false,
      \"hasParking\": true,
      \"furnishingStatus\": \"FULLY_FURNISHED\"
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg"
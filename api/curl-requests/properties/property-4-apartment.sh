#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Cozy Studio Apartment in Baneshwor\",
    \"slug\": \"cozy-studio-apartment-baneshwor\",
    \"summary\": \"Perfect starter home near TU University\",
    \"description\": \"This charming studio apartment is ideal for students or young professionals. Located just minutes from Tribhuvan University, this compact yet comfortable unit features an open living and sleeping area, a small kitchenette, a modern bathroom, and large windows that fill the space with natural light. The building has security, parking space, and is walking distance to restaurants, cafes, and public transportation.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"RENT\",
    \"priceAmount\": 25000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"MONTHLY\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"For Rent\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Baneshwor, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.6942,
    \"longitude\": 85.3341,
    \"areaValue\": 450,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"publishedAt\": \"2026-05-03T09:00:00Z\",
    \"videoUrl\": \"https://youtube.com/watch?v=studio-tour\",
    \"mapIframe\": \"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.5!2d85.3341!3d27.6942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzEwLjAiTiA4NcKyMzUuMzEiRQ!5e0!3m2!1sen!2snp!4v1234567890\",
    \"details\": {
      \"subType\": \"STUDIO\",
      \"bedrooms\": 1,
      \"bathrooms\": 1,
      \"balconies\": 1,
      \"floorNumber\": 3,
      \"totalFloors\": 5,
      \"hasLift\": false,
      \"hasParking\": true,
      \"furnishingStatus\": \"SEMI_FURNISHED\"
    },
    \"amenityIds\": []
  }" \
  -F "images=@../uploads/properties/1778427003834-.jpg" \
  -F "images=@../uploads/properties/1778427003835-.jpg"
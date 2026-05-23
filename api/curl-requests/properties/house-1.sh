#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Modern Family Home in Baneshwor\",
    \"slug\": \"modern-family-home-baneshwor\",
    \"summary\": \"A beautiful modern family home in the heart of Baneshwor\",
    \"description\": \"This stunning modern family home offers comfortable living with all essential amenities. Located in a peaceful neighborhood, this property features a spacious living room, well-designed kitchen, three bedrooms with attached bathrooms, and a beautiful garden. Perfect for families looking for a cozy home in a prime location with easy access to schools, hospitals, and shopping centers.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 18500000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"New\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Baneshwor, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.6789,
    \"longitude\": 85.3654,
    \"areaValue\": 2200,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable 3-Phase Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"videoUrl\": \"\",
    \"mapIframe\": \"\",
    \"details\": {
      \"subType\": \"BUNGALOW\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 3,
      \"bathrooms\": 3,
      \"kitchens\": 1,
      \"floors\": 2,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2020
    },
    \"amenityIds\": []
  }"
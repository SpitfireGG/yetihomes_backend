#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Contemporary Villa in Budhanilkantha\",
    \"slug\": \"contemporary-villa-budhanilkantha\",
    \"summary\": \"A spacious contemporary villa with Himalayan views and modern amenities\",
    \"description\": \"This contemporary villa in Budhanilkantha offers a perfect blend of modern architecture and natural beauty. Featuring a double-height living room, floor-to-ceiling windows, gourmet kitchen with imported appliances, four en-suite bedrooms, and a landscaped garden with mountain views. The property includes a two-car garage, staff quarters, and a rooftop terrace perfect for entertaining.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 65000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Featured\",
    \"badgeTone\": \"WARM\",
    \"locationText\": \"Budhanilkantha, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7791,
    \"longitude\": 85.3512,
    \"areaValue\": 4800,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable 3-Phase Electricity\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"VILLA\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 4,
      \"bathrooms\": 4,
      \"kitchens\": 2,
      \"floors\": 3,
      \"parkingSpaces\": 2,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2024
    },
    \"amenityIds\": []
  }"

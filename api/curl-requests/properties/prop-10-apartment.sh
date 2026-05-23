#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"2 BHK Rental Apartment in Kupondole\",
    \"slug\": \"2bhk-rental-apartment-kupondole\",
    \"summary\": \"Well-furnished 2 BHK apartment available for rent\",
    \"description\": \"A well-furnished 2 BHK apartment in the popular Kupondole area. Perfect for expats or professionals, this apartment features a modern kitchen, spacious living room, two bedrooms with attached bathrooms, and a balcony with city views. The building has 24/7 security, lift, and parking. Walking distance to restaurants, cafes, and shops.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"RENT\",
    \"priceAmount\": 55000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"MONTHLY\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"For Rent\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Kupondole, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6889,
    \"longitude\": 85.3089,
    \"areaValue\": 1200,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"FLAT\",
      \"bedrooms\": 2,
      \"bathrooms\": 2,
      \"balconies\": 1,
      \"floorNumber\": 5,
      \"totalFloors\": 8,
      \"hasLift\": true,
      \"hasParking\": true,
      \"furnishingStatus\": \"FULLY_FURNISHED\"
    },
    \"amenityIds\": []
  }"

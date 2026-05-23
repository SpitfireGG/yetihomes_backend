#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"3 BHK Apartment in Sanepa\",
    \"slug\": \"3bhk-apartment-sanepa\",
    \"summary\": \"Spacious 3 BHK apartment in prime Sanepa location\",
    \"description\": \"A well-maintained 3 BHK apartment in the sought-after Sanepa area. Features include a spacious living room, modern kitchen with granite countertops, three bedrooms with attached bathrooms, and a covered balcony. The building has 24/7 security, lift access, and underground parking. Close to international schools, hospitals, and the Ring Road.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 28000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Family Home\",
    \"badgeTone\": \"NEUTRAL\",
    \"locationText\": \"Sanepa, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6834,
    \"longitude\": 85.3012,
    \"areaValue\": 1650,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"FLAT\",
      \"bedrooms\": 3,
      \"bathrooms\": 3,
      \"balconies\": 2,
      \"floorNumber\": 6,
      \"totalFloors\": 10,
      \"hasLift\": true,
      \"hasParking\": true,
      \"furnishingStatus\": \"SEMI_FURNISHED\"
    },
    \"amenityIds\": []
  }"

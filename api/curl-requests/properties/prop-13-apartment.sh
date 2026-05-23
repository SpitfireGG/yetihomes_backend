#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Office Space in Naxal\",
    \"slug\": \"office-space-naxal\",
    \"summary\": \"Modern office space in prime business district\",
    \"description\": \"A modern office space in the Naxal business district. Features include open-plan layout, conference room, reception area, pantry, and two washrooms. The building has 24/7 security, lift access, generator backup, and ample parking. Ideal for IT companies, NGOs, or corporate offices.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"RENT\",
    \"priceAmount\": 120000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"MONTHLY\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Commercial\",
    \"badgeTone\": \"COOL\",
    \"locationText\": \"Naxal, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7234,
    \"longitude\": 85.3289,
    \"areaValue\": 2500,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable with Generator Backup\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"OFFICE\",
      \"bedrooms\": 0,
      \"bathrooms\": 2,
      \"balconies\": 0,
      \"floorNumber\": 3,
      \"totalFloors\": 6,
      \"hasLift\": true,
      \"hasParking\": true,
      \"furnishingStatus\": \"UNFURNISHED\"
    },
    \"amenityIds\": []
  }"

#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Modern Townhouse in Gwarko\",
    \"slug\": \"modern-townhouse-gwarko\",
    \"summary\": \"Contemporary townhouse with rooftop garden and smart home features\",
    \"description\": \"A modern townhouse in the developing Gwarko area featuring smart home technology, solar water heating, and a rooftop garden. The property includes three bedrooms, three bathrooms, an open-plan kitchen, and a private garage. Energy-efficient design with rainwater harvesting and LED lighting throughout.\",
    \"propertyType\": \"HOUSE\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 22000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": false,
    \"badgeLabel\": \"Smart Home\",
    \"badgeTone\": \"COOL\",
    \"locationText\": \"Gwarko, Lalitpur\",
    \"district\": \"Lalitpur\",
    \"city\": \"Lalitpur\",
    \"latitude\": 27.6678,
    \"longitude\": 85.3345,
    \"areaValue\": 2400,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Clear Lal Purja\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable with Solar Backup\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"TOWNHOUSE\",
      \"usageType\": \"RESIDENTIAL\",
      \"bedrooms\": 3,
      \"bathrooms\": 3,
      \"kitchens\": 1,
      \"floors\": 3,
      \"parkingSpaces\": 1,
      \"furnishingStatus\": \"SEMI_FURNISHED\",
      \"buildYear\": 2025
    },
    \"amenityIds\": []
  }"

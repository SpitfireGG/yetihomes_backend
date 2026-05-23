#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/properties \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "data={
    \"title\": \"Luxury Penthouse in Durbarmarg\",
    \"slug\": \"luxury-penthouse-durbarmarg\",
    \"summary\": \"Ultra-luxury penthouse in the heart of Kathmandu with panoramic views\",
    \"description\": \"Experience the pinnacle of luxury living in this stunning penthouse in Durbarmarg. Featuring an open-plan living area with imported marble flooring, a chef's kitchen with Miele appliances, three en-suite bedrooms with walk-in closets, and a wraparound terrace with 360-degree views of the valley. The building offers concierge service, gym, and rooftop pool.\",
    \"propertyType\": \"APARTMENT\",
    \"listingType\": \"SALE\",
    \"priceAmount\": 85000000,
    \"currency\": \"NPR\",
    \"pricePeriod\": \"TOTAL\",
    \"status\": \"PUBLISHED\",
    \"isFeatured\": true,
    \"badgeLabel\": \"Premium\",
    \"badgeTone\": \"COOL\",
    \"locationText\": \"Durbarmarg, Kathmandu\",
    \"district\": \"Kathmandu\",
    \"city\": \"Kathmandu\",
    \"latitude\": 27.7125,
    \"longitude\": 85.3189,
    \"areaValue\": 3200,
    \"areaUnit\": \"SQ_FT\",
    \"titleStatus\": \"Ghar Jagga\",
    \"waterAvailability\": \"24/7 Water Supply\",
    \"electricity\": \"Stable with Backup Generator\",
    \"isVerified\": true,
    \"isOwnerApproved\": true,
    \"details\": {
      \"subType\": \"PENTHOUSE\",
      \"bedrooms\": 3,
      \"bathrooms\": 3,
      \"balconies\": 3,
      \"floorNumber\": 15,
      \"totalFloors\": 15,
      \"hasLift\": true,
      \"hasParking\": true,
      \"furnishingStatus\": \"FULLY_FURNISHED\"
    },
    \"amenityIds\": []
  }"

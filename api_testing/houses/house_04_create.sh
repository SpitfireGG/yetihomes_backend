#!/run/current-system/sw/bin/bash

curl -X POST http://localhost:4000/api/houses \
  -F 'data={
    "title": "Modern Minimalist House in Kharibot with Smart Features",
    "slug": "modern-minimalist-smart-home-kharibot-kathmandu-004",
    "summary": "Contemporary single-family home featuring smart home automation, energy-efficient design, and sleek minimalist aesthetics in Kharibot.",
    "description": "This striking modern minimalist house represents the future of urban living in Kathmandu. Designed by a renowned architect, every detail has been carefully considered to create a harmonious living environment that is both beautiful and functional.\n\nThe open-concept ground floor features living and dining areas that flow seamlessly, with floor-to-ceiling windows providing abundant natural light. The minimalist kitchen showcases handleless cabinets, quartz countertops, and integrated appliances. A guest bedroom and bathroom complete the ground floor.\n\nThe upper floor contains three bedrooms, including a master suite with private balcony. The bathrooms feature glass walls and premium fixtures. A rooftop garden provides outdoor living space.\n\nSmart home features include automated lighting, climate control, security system, and motorized blinds. Solar panels and rainwater harvesting make this an eco-friendly choice.",
    "propertyType": "HOUSE",
    "listingType": "SALE",
    "priceAmount": 62000000,
    "currency": "NPR",
    "pricePeriod": "TOTAL",
    "status": "PUBLISHED",
    "isFeatured": true,
    "badgeLabel": "Smart Home",
    "badgeTone": "COOL",
    "locationText": "Kharibot, Kathmandu",
    "district": "Kathmandu",
    "city": "Kathmandu",
    "latitude": 27.6956,
    "longitude": 85.2845,
    "areaValue": 2.5,
    "areaUnit": "AANA",
    "titleStatus": "Ghar Jagga Purja",
    "waterAvailability": "Municipal Line & 5,000L Tank",
    "electricity": "3-Phase NEA with Solar",
    "isVerified": true,
    "isOwnerApproved": true,
    "details": {
      "subType": "VILLA",
      "usageType": "RESIDENTIAL",
      "bedrooms": 4,
      "bathrooms": 3,
      "kitchens": 1,
      "floors": 2,
      "parkingSpaces": 2,
      "furnishingStatus": "FULLY_FURNISHED",
      "buildYear": 2023
    }
  }' \
  -F 'images=@uploads/properties/houses/2569038.jpg' \
  -F 'images=@uploads/properties/houses/259711.jpg' \
  -F 'images=@uploads/properties/houses/260998.jpg' \
  -F 'images=@uploads/properties/houses/259758.jpg' \
  -F 'images=@uploads/properties/houses/2444722.jpg' \
  -F 'images=@uploads/properties/houses/2195996.jpg'
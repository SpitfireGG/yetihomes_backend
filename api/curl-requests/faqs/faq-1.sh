#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What documents do I need to buy property in Nepal?",
    "answer": "To purchase property in Nepal, you typically need: 1) Valid citizenship certificate or passport, 2) Ownership certificate (Lal Purja) from the previous owner, 3) Tax clearance certificate, 4) Encumbrance certificate (showing no legal disputes), 5) Building permit and completion certificate (for built properties), and 6) Identity verification documents. We recommend consulting with a legal advisor to ensure all documentation is in order.",
    "category": "GENERAL",
    "sortOrder": 1,
    "isPublished": true
  }'
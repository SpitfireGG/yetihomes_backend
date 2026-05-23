#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is Baina (token money) and how does it work?",
    "answer": "Baina, or token money, is an advance payment made to the seller to secure the property while the registration process is completed. It is typically 5-10% of the agreed property price. Baina is paid after both parties agree on the price and terms. A written agreement should be signed specifying the amount, payment date, and conditions for refund if the deal falls through. Yeti Homes facilitates this process with proper documentation to protect both buyer and seller.",
    "category": "FINANCIAL",
    "sortOrder": 5,
    "isPublished": true
  }'

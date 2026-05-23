#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Does Yeti Homes charge any commission or service fees?",
    "answer": "Yeti Homes operates on a transparent fee structure. For buyers, our consultation and property viewing services are completely free. We earn our commission from the seller side, typically 2-3% of the final sale price. There are no hidden charges for property verification, documentation assistance, or post-purchase support. All fees are clearly communicated before any transaction begins.",
    "category": "FINANCIAL",
    "sortOrder": 8,
    "isPublished": true
  }'

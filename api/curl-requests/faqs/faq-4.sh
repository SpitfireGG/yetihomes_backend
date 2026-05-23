#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How long does the property registration process take?",
    "answer": "The property registration process typically takes 2-4 weeks from start to finish. This includes: document verification (3-5 days), property valuation (2-3 days), tax clearance (3-5 days), and final registration at the Land Revenue Office (1-2 days). Delays can occur if there are issues with documentation, boundary disputes, or pending legal matters. Yeti Homes helps streamline this process by preparing all documents in advance.",
    "category": "PROCESS",
    "sortOrder": 4,
    "isPublished": true
  }'

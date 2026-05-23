#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How do I verify if a property has any legal disputes?",
    "answer": "To verify a property has no legal disputes: 1) Check the Lal Purja at the Land Revenue Office for any liens or mortgages. 2) Obtain an encumbrance certificate showing no pending court cases. 3) Verify boundary markers match the official survey. 4) Check with the local ward office for any complaints. 5) Hire a legal advisor to conduct thorough due diligence. Yeti Homes provides comprehensive property verification services including all these checks before listing any property.",
    "category": "LEGAL",
    "sortOrder": 6,
    "isPublished": true
  }'

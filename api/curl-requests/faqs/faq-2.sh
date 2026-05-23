#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How do I verify the authenticity of a property in Nepal?",
    "answer": "To verify property authenticity: 1) Check the ownership certificate (Lal Purja) at the Land Revenue Office, 2) Obtain an encumbrance certificate to ensure no legal disputes, 3) Verify tax payment status, 4) Confirm building permit and occupancy certificate, 5) Visit the property physically to verify boundaries and condition. Yeti Homes provides complete property verification services to ensure your investment is secure.",
    "category": "LEGAL_AND_MALPOT",
    "sortOrder": 2,
    "isPublished": true
  }'
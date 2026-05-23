#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Can NRNs (Non-Resident Nepalis) buy property in Nepal?",
    "answer": "Yes, NRNs can buy property in Nepal with certain conditions. You need a valid Non-Resident Nepali card issued by the NRNA. NRNs can purchase residential and commercial properties but cannot buy agricultural land without special permission. The purchase process is similar to residents, but you may need to appoint a local representative for documentation. Banks also offer home loans to NRNs with competitive rates.",
    "category": "GENERAL",
    "sortOrder": 3,
    "isPublished": true
  }'

#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/faqs \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What are the common land measurement units in Nepal?",
    "answer": "Nepal uses several traditional land measurement units: Ropani (1 Ropani = 16 Aana = 5476 sq ft), Aana (1 Aana = 4 Paisa = 342.25 sq ft), Paisa (1 Paisa = 4 Dam = 85.56 sq ft), Dam (85.56 sq ft). In the Terai region: Bigha (1 Bigha = 20 Katha = 144000 sq ft), Katha (1 Katha = 20 Dhur = 7200 sq ft), Dhur (360 sq ft). The metric system (sq meters, hectares) is also used officially. Yeti Homes provides a land unit converter tool to help you understand measurements across different systems.",
    "category": "GENERAL",
    "sortOrder": 7,
    "isPublished": true
  }'

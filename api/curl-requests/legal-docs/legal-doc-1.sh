#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/company/legal-documents \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "PRIVACY_POLICY",
    "title": "Privacy Policy",
    "content": "This Privacy Policy describes how Yeti Homes collects, uses, and discloses your personal information when you use our website and services. We are committed to protecting your privacy and ensuring the security of your personal data.\n\nInformation We Collect:\n- Personal information such as name, email, phone number when you contact us\n- Property search preferences and browsing history\n- Information you provide when scheduling property visits\n- Communication history with our team\n\nHow We Use Your Information:\n- To provide you with property listings and related services\n- To communicate with you about properties that match your preferences\n- To improve our website and services\n- To respond to your inquiries and requests\n\nData Protection:\nWe implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.\n\nContact Us:\nIf you have any questions about this Privacy Policy, please contact us at info@yetihomes.com",
    "version": "1.0",
    "effectiveDate": "2026-01-01T00:00:00.000Z",
    "isActive": true
  }'
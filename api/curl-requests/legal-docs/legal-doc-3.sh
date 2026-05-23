#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/company/legal-documents \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "TERMS_AND_CONDITIONS",
    "title": "Terms and Conditions",
    "content": "Welcome to Yeti Homes. By accessing and using our website and services, you agree to be bound by these Terms and Conditions.\n\nUse of Services:\nYou agree to use our services only for lawful purposes. You may not copy, distribute, or modify any content without our written permission.\n\nProperty Listings:\nAll property listings on our website are provided by third parties. While we strive for accuracy, we do not guarantee the completeness or reliability of property information.\n\nUser Accounts:\nYou are responsible for maintaining the confidentiality of your account information and for all activities under your account.\n\nLimitation of Liability:\nYeti Homes shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.\n\nTermination:\nWe reserve the right to terminate your access to our services at any time without notice.\n\nGoverning Law:\nThese terms are governed by the laws of Nepal.",
    "version": "1.0",
    "effectiveDate": "2026-01-01T00:00:00.000Z",
    "isActive": true
  }'
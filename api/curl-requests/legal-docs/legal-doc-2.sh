#!/run/current-system/sw/bin/bash

curl -s -X POST http://localhost:4000/api/company/legal-documents \
  -H "Authorization: Bearer $AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "COOKIE_POLICY",
    "title": "Cookie Policy",
    "content": "This Cookie Policy explains what Cookies are and how Yeti Homes uses them. By using our website, you agree to the use of cookies as described in this policy.\n\nWhat are cookies?\nCookies are small text files stored on your device when you visit websites. They help the site function properly and provide analytics to site owners.\n\nHow we use cookies:\n- Essential cookies: Required for website functionality\n- Analytics cookies: Help us understand how visitors use our site\n- Marketing cookies: Used to deliver relevant advertisements\n\nManaging cookies:\nYou can control or delete cookies through your browser settings. Please note that disabling essential cookies may affect website functionality.",
    "version": "1.0",
    "effectiveDate": "2026-01-01T00:00:00.000Z",
    "isActive": true
  }'
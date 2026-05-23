# Deploy to Render (Free Tier)

This deploys the API, Admin Panel, and PostgreSQL database on Render's free tier.

## One-Click Setup (using render.yaml)

1. Push this repo to GitHub

2. Go to https://dashboard.render.com/blueprints

3. Connect your GitHub repo — Render will auto-detect `render.yaml`

4. Fill in the prompted secrets:
   - `SMTP_USER` — your Gmail address (or leave blank)
   - `SMTP_PASS` — your Gmail app password (or leave blank)

5. Click **Apply** — Render creates all 3 resources:
   - PostgreSQL database (`yetihomes-db`)
   - API web service (`yetihomes-api`)
   - Admin web service (`yetihomes-admin`)

> First deploy takes 3-5 minutes (build + migrate + start)

## Manual Setup (if Blueprint doesn't work)

### 1. Create PostgreSQL Database
- New → PostgreSQL → Free plan
- Note the **Internal Connection String**

### 2. Deploy the API
- New → Web Service → Connect your repo
- **Root Directory:** `api`
- **Runtime:** Node
- **Build Command:**
  ```
  npm install && npx prisma generate && npx prisma migrate deploy && npm run build
  ```
- **Start Command:**
  ```
  npm run start:prod
  ```
- **Plan:** Free
- **Add Environment Variables:**
  | Key | Value |
  |-----|-------|
  | `NODE_VERSION` | `22` |
  | `DATABASE_URL` | *(paste from step 1)* |
  | `JWT_ACCESS_SECRET` | *(generate: `openssl rand -base64 32`)* |
  | `JWT_REFRESH_SECRET` | *(generate a different one)* |
  | `CORS_ORIGINS` | `https://yetihomes-admin.onrender.com` |
  | `ADMIN_EMAIL` | `info@yetihomes.com` |

### 3. Deploy the Admin Panel
- New → Web Service → Connect your repo
- **Root Directory:** `api/admin`
- **Runtime:** Node
- **Build Command:**
  ```
  npm install && npm run build
  ```
- **Start Command:**
  ```
  node .next/standalone/server.js
  ```
- **Plan:** Free
- **Add Environment Variables:**
  | Key | Value |
  |-----|-------|
  | `NODE_VERSION` | `22` |
  | `HOSTNAME` | `0.0.0.0` |
  | `NEXT_PUBLIC_API_URL` | `https://your-api-name.onrender.com` |

## After Deploy

1. **Create an admin account** — hit the API:
   ```bash
   curl -X POST https://your-api.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"your-password","fullName":"Admin"}'
   ```

2. **Visit the admin panel** — `https://your-admin.onrender.com`

3. **Update CORS** in the API env vars if your admin URL changes

## Important Free Tier Notes

- **Services sleep after 15 minutes** of inactivity — first request after idle takes ~30s to wake up
- **PostgreSQL free tier auto-deletes after 90 days** — set a calendar reminder to migrate
- **No custom domain on free plan** — use the `*.onrender.com` URLs
- **Builds are limited** — 500 build hours/month on free

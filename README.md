# Yeti Homes Backend

Monorepo containing the NestJS API and Next.js Admin Panel for Yeti Homes real estate platform.

## Structure

```
.
├── api/                  # NestJS REST API (port 4000)
│   ├── src/              # Application source
│   ├── prisma/           # Database schema & migrations
│   ├── admin/            # Next.js Admin Panel (port 3000)
│   └── uploads/          # Uploaded media files
├── docker-compose.yml    # Local development
├── docker-compose.deploy.yml  # Production
└── .env.example          # Environment template
```

## Quick Start

```bash
# Local development (Docker)
docker compose up --build -d

# Or without Docker
cd api && npm install && npx prisma generate && npx prisma migrate deploy && npm run start:dev
cd api/admin && npm install && npm run dev
```

## API

- NestJS v11 with Express
- PostgreSQL via Prisma ORM
- JWT authentication (access + refresh tokens)
- Rate limiting, Helmet security headers, CORS

## Admin Panel

- Next.js 16 (standalone output)
- shadcn/ui + Tailwind CSS v4
- TanStack React Query + Redux Toolkit
- TinyMCE rich text editor

## Deployment

See `docker-compose.deploy.yml` for production configuration.
Set required environment variables from `.env.example`.

## Environment Variables

Required variables are documented in `.env.example`.
Generate JWT secrets with: `openssl rand -base64 32`

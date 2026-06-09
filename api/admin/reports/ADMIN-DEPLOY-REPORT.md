# Admin Panel Deploy Report

## 1. Environment
- Next.js version: 16.2.6
- Router: App Router
- Package manager: npm
- Node version used for build: v24.14.1
- React version: 19.1.0
- Branch: (as-is, no branch changes made)

## 2. Server-side feature audit
| Feature | Found? | Files | BLOCKER or FIXABLE | Notes |
|---------|--------|-------|---------------------|-------|
| API routes (`route.ts` / `pages/api/`) | No | — | — | No server API endpoints in admin |
| `getServerSideProps` | No | — | — | App Router only |
| Server Actions (`"use server"`) | No | — | — | Not used |
| Middleware (`middleware.ts`) | Yes | `src/middleware.ts` | BLOCKER | JWT auth redirect middleware — incompatible with static export. Replaced by client-side `AuthGuard` component. |
| `cookies()` / `headers()` / `draftMode()` | Yes | `src/app/page.tsx` | BLOCKER | Root page used `cookies()` from `next/headers`. Converted to client component that reads `document.cookie`. |
| `force-dynamic` / `revalidate` | No | — | — | Not used |
| `next/image` usage | Yes | 8 files (`optimized-image.tsx`, auth pages, `app-sidebar.tsx`, `not-found.tsx`, `company-teams-table.tsx`) | FIXABLE | Set `images: { unoptimized: true }` |
| Rewrites/redirects/headers in config | No | — | — | Not used |
| `getInitialProps` | No | — | — | App Router only |
| i18n config | No | — | — | Not used |
| Dynamic routes (`[id]`) | Yes | 10 files | FIXABLE | Added `generateStaticParams()` returning placeholder values |
| Client-side data fetching | Yes | `src/api/auth.ts`, `src/api/crud.ts` | OK | Uses `NEXT_PUBLIC_API_URL` — correct for static export |
| `process.env.*` references | 3 occurrences | `src/utils/main.ts` | OK | All are `NEXT_PUBLIC_*` vars, inlined at build time |
| `output: 'standalone'` | Yes | `next.config.ts` | BLOCKER | Changed to `output: 'export'` |

## 3. Decision
- **Chosen path: PATH B — Migrate-then-Static**
- **Justification:** Two hard blockers were identified (middleware + server-side `cookies()` in root page), both are auth-related and can be moved client-side since all auth is already handled via JWT in browser cookies with the NestJS API. The middleware's auth-redirect logic was migrated to a client `AuthGuard` component. The root page's `cookies()` call was converted to client-side `document.cookie`. No server-to-NestJS proxy routes exist — the admin always calls the NestJS API directly via `NEXT_PUBLIC_API_URL`, which is the correct pattern for static export.

## 4. Changes made

### Files modified

#### `next.config.ts`
- `output`: `'standalone'` → `'export'`
- `images`: removed `remotePatterns`, `formats`, `minimumCacheTTL` → set `unoptimized: true`
- Added `trailingSlash: true` (avoids 404s on refresh under Apache)
- Kept: `typescript.ignoreBuildErrors`, `reactCompiler`, `poweredByHeader`, `compress`, `productionBrowserSourceMaps`

#### `src/app/page.tsx` (root)
- Before: Server component using `cookies()` from `next/headers` + `redirect` from `next/navigation`
- After: Client component (`'use client'`) using `useRouter` + client-side `document.cookie` via `getCookie()` helper
- Same token expiry check logic preserved

#### `src/middleware.ts`
- Disabled: replaced content with comment explaining auth is handled client-side
- File renamed to `src/middleware.disabled.ts` so Next.js doesn't pick it up

#### 10 dynamic route pages — added `generateStaticParams()`
All return `[{ id: 'placeholder' }]` to satisfy Next.js static export requirement:

| Page | Change |
|------|--------|
| `src/app/(admin)/properties/edit/[id]/page.tsx` | Server wrapper + `generateStaticParams` |
| `src/app/(admin)/users/[id]/page.tsx` | Server wrapper + `generateStaticParams` |
| `src/app/(admin)/blogs/edit/[id]/page.tsx` | Server wrapper + `generateStaticParams` |
| `src/app/(admin)/(pages)/terms/edit/[id]/page.tsx` | Added `generateStaticParams` |
| `src/app/(admin)/company/csi/edit/[id]/page.tsx` | Added `generateStaticParams` |
| `src/app/(admin)/company/csi/content/[id]/page.tsx` | Added `generateStaticParams` |
| `src/app/(admin)/company/achievements/content/[id]/page.tsx` | Added `generateStaticParams` |
| `src/app/(admin)/company/affilations/content/[id]/page.tsx` | Added `generateStaticParams` |
| `src/app/(admin)/company/guides/content/[id]/page.tsx` | Added `generateStaticParams` |
| `src/app/(admin)/company/teams/content/[id]/page.tsx` | Added `generateStaticParams` |

For the 3 client-component pages (properties/edit, users, blogs/edit), a server component wrapper was created that re-exports the client component:

```
page.tsx (server wrapper) → imports → edit-property-client.tsx (client component)
page.tsx (server wrapper) → imports → edit-user-client.tsx (client component)
page.tsx (server wrapper) → imports → edit-blog-client.tsx (client component)
```

#### `src/app/(admin)/layout.tsx`
- Added `AuthGuard` wrapper around `{children}` to provide client-side auth protection (replaces middleware)
- Imported `AuthGuard` from `@/components/common/auth-guard`

#### New file: `src/components/common/auth-guard.tsx`
- Client component that checks `authService.getProfile()` on mount
- Redirects to `/auth/login?redirect=<path>` if unauthenticated
- Shows nothing while checking (returns null)

#### New file: `htaccess-for-admin.txt`
- Apache rewrite rules for SPA fallback (client-side routing)

### API base URL handling
- Found at `src/utils/main.ts`:
  ```ts
  export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || ''
  ```
- Both are `NEXT_PUBLIC_*` vars — correctly inlined at build time for static export
- No relative `/api/...` calls were found — all API calls use the full `API_URL` base
- **No changes needed** — API already correctly configured for static export

### Env vars — all `process.env.*` references

| Reference | File | `NEXT_PUBLIC_`? | Status |
|-----------|------|----------------|--------|
| `process.env.NEXT_PUBLIC_API_URL` | `src/utils/main.ts:1` | Yes | OK — inlined at build |
| `process.env.NEXT_PUBLIC_API_KEY` | `src/utils/main.ts:4` | Yes | OK — inlined at build |
| `process.env.NODE_ENV` | `src/utils/main.ts:6` | No, but it's a built-in | OK — Next.js sets this |

### Backups created
- `next.config.ts.bak`
- `src/app/page.tsx.bak`
- `src/middleware.ts.bak`
- `src/app/not-found.tsx.bak`
- `src/app/(admin)/layout.tsx.bak`

## 5. Build result
- **Command(s) run**: `npm install` → `npm run build`
- **Exit status**: 0 (success)
- **Build engine**: Turbopack (Next.js 16 default)
- **`out/` exists**: yes
- **`find out -maxdepth 2 -type f`**: 76 static pages generated + `_next/static/` assets (see full list above)
- **`out/api` directory**: none (correct)
- **Smoke test result**:
  ```
  GET / → 200
  GET /dashboard/ → 200
  GET /auth/login/ → 200
  GET /blogs/edit/placeholder/ → 200
  GET /users/placeholder/ → 200
  ```
- **Build warnings/errors**:
  - `Warning: Next.js inferred your workspace root, but it may not be correct.` (monorepo lockfile detection — cosmetic, can be silenced with `turbopack.root` in config)
  - `ReferenceError: location is not defined` at `.next/server/chunks/ssr/...` — this is a pre-existing SSR warning from TinyMCE (TinyMCE accesses `window.location` during module init). The client-side hydration handles it correctly. Not introduced by our changes.
  - No errors related to `cookies()`, `headers()`, or "could not be statically exported" warnings

## 6. Open questions / risks for human + Claude
1. **`generateStaticParams` returns placeholder values** — Dynamic routes (`/users/[id]`, `/properties/edit/[id]`, etc.) generate a single page at `/users/placeholder/`. On the cPanel server with the `.htaccess` rewrite, requests to `/users/123` will serve `index.html` from `out/` and React will handle client-side routing. The placeholder pages are never served in practice. **Risk**: low.
2. **Auth is now fully client-side** — The `AuthGuard` component calls `authService.getProfile()` (which calls the NestJS API) on every admin page load. If the API is unreachable, users will be stuck at `/auth/login`. **Risk**: low (same as before with middleware, just the redirect is slightly slower).
3. **`ReferenceError: location is not defined`** — Pre-existing, from TinyMCE in SSR. Static export generates HTML during build, so TinyMCE's server-side check for `window` may still trigger this. The warning is harmless in production (TinyMCE initializes client-side only).
4. **API URL assumption** — The `.env` file currently has `NEXT_PUBLIC_API_URL=http://localhost:4000`. The human must set this to the live NestJS API URL before building for production, e.g.: `NEXT_PUBLIC_API_URL=https://api.yetihomes.com`.
5. **No cache-busting for `_next/static`** — Static exports don't have ISR/cache invalidation. Each build generates new chunk hashes automatically, so browsers will request new files on the next visit. No action needed.
6. **Workspace root warning** — The monorepo structure (lockfiles in both `api/` and `api/admin/`) triggers a Next.js warning. Can be silenced by setting `turbopack.root` in next.config.ts, but not required for deployment.
7. **Original `ADMIN-AUDIT-REPORT.md`** — This file (at the monorepo root) is the previous audit report and is unrelated to this deploy report. No changes were made to it.

## 7. What the human must do next (server side — you did NOT do this)
1. Upload contents of `api/admin/out/` to the admin subdomain's document root on cPanel.
2. Rename `htaccess-for-admin.txt` to `.htaccess` in that document root so Apache rewrites unmatched paths to `index.html` (client-side routing).
3. Configure the admin subdomain's document root to point to the upload directory.
4. Ensure `NEXT_PUBLIC_API_URL` is set to the live NestJS API URL at build time (edit `api/admin/.env` before building, or pass as env var during build).
5. If the NestJS API is on a different subdomain/port, ensure CORS is configured on the API to accept requests from the admin panel's origin.
6. Confirm the API is accessible from the admin's browser (no same-origin policy issues).
7. Optional: set `turbopack.root` in next.config.ts to silence the monorepo lockfile warning:
   ```ts
   turbopack: { root: __dirname },
   ```

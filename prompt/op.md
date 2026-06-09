# Task Brief: Prepare the Next.js Admin Panel for cPanel Deployment (LOCAL ONLY)

You are **opencode**,  working **entirely on the local machine** inside the admin
panel repository. You have **no server access and need none** — your job is to
analyze the code, decide the correct deployment mode, make the necessary changes,
build locally, and produce a deployable artifact plus a structured report.
You can find the api  & the admin application in the current working dir.

The server is a **cPanel / CloudLinux shared host** whose provider does **not
support running a Next.js SSR/Node server**. The admin panel talks to an existing
**NestJS REST API** (separate app, JWT auth). So the strongly-preferred outcome is
a **fully static export** that ships as plain files — no Node process on the host.

Do **not** run any `ssh`, `scp`, `rsync`, or deployment commands. Stop at "built
artifact + report."

---

## 0. Setup

- The admin panel path will be provided to you. `cd` into it.
- Detect the package manager from the lockfile: `package-lock.json` → npm,
  `yarn.lock` → yarn, `pnpm-lock.yaml` → pnpm. Use that consistently.
- Detect the Next.js version (`cat package.json | grep next`, and
  `npx next --version`). Note App Router (`app/`) vs Pages Router (`pages/`) vs
  both. Record everything in the report.

---

## 1. Investigation — does it use server-side features?

This is the decision that determines everything. Search the codebase thoroughly
and record **every match with file path and a one-line explanation**. A static
export is only valid if **none** of these are present (or all can be removed/
migrated). Check for:

**Hard blockers (require a running Node server — incompatible with static export):**

- API routes: any files under `app/**/route.{ts,js}` or `pages/api/**`.
- `getServerSideProps` (Pages Router).
- Server Actions: `"use server"` directives, or `action={...}` server functions.
- `middleware.{ts,js}` at project root or in `src/`.
- Runtime request access in Server Components: `cookies()`, `headers()`,
  `draftMode()` from `next/headers`.
- `export const dynamic = 'force-dynamic'`, `export const revalidate = <n>` with
  on-demand/ISR intent, or `fetch(..., { next: { revalidate } })` patterns.
- `next/image` with the default loader (the optimizer needs a server).
- Rewrites/redirects/headers defined in `next.config.*` (these need a server).
- `getInitialProps` with server-side `req`/`res` usage.
- Internationalized routing via `i18n` config in `next.config.*` (not supported
  in static export).

**Soft / fixable (compatible with static export after a tweak):**

- `next/image` → set `images: { unoptimized: true }`.
- Client-side data fetching (`useEffect` + `fetch`, SWR, React Query, axios) →
  fully fine for static; this is the expected pattern for an API-backed admin.
- `getStaticProps` / `getStaticPaths` → fine (that's what export uses), but any
  `getStaticPaths` must return `fallback: false`.
- Environment variables: only `NEXT_PUBLIC_*` vars are available in a static
  build (they're inlined at build time). Any server-only secret usage is a
  blocker; list each `process.env.*` reference and whether it's `NEXT_PUBLIC_`.

For each finding, classify as **BLOCKER** or **FIXABLE** and explain.

---

## 2. Decide the path

Based on Section 1, choose **exactly one** and state it explicitly in the report
with justification:

- **PATH A — Static Export** (preferred): zero blockers, or all blockers are
  trivially removable for an admin panel that should call the NestJS API from the
  client. Proceed to Section 3A.
- **PATH B — Migrate-then-Static**: a small number of blockers exist but the
  server logic belongs in the NestJS API anyway (e.g. an `app/api/login` route
  that just proxies the API). Propose the migration, and **only implement it if
  it's low-risk and you can keep auth working via the existing API + JWT**.
  Otherwise stop and report it for human decision. Then Section 3A.
- **PATH C — Cannot be static**: genuine, non-trivial SSR coupling that can't be
  safely moved. **Do not hack around it.** Stop, and in the report explain
  exactly what requires a server and what the options are (standalone build on
  Passenger, or hosting the admin elsewhere). Do not produce a broken artifact.

---

## 3A. Make it a static export

Only if PATH A or B. Make these changes (back up originals; show diffs in report):

1. **`next.config.{js,mjs,ts}`** — ensure:

   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: { unoptimized: true },
     trailingSlash: true, // avoids 404s on refresh under Apache
   };
   module.exports = nextConfig; // (or `export default` for .mjs/.ts)
   ```

   - Merge into existing config; don't clobber other settings. If `i18n`,
     `rewrites`, `redirects`, or `headers` exist, that's a BLOCKER — surface it.

2. **API base URL** — the admin must call the NestJS API by absolute URL at
   runtime, since there's no Next server to proxy. Find how the API base is set.
   It must come from a `NEXT_PUBLIC_*` var (e.g. `NEXT_PUBLIC_API_URL`). If any
   API call uses a relative path like `/api/...` expecting a Next API route,
   that's a BLOCKER unless repointed to the NestJS API. List every fetch base.

3. **`next/image`** — confirm `unoptimized: true` is set; note any `<Image>`
   usage that relied on optimization (still works, just unoptimized).

4. **`getStaticPaths`** — ensure every one returns `fallback: false`.

5. **`package.json`** — confirm the build script is plain `next build`
   (modern Next emits the static `out/` automatically with `output: 'export'`;
   do **not** add the deprecated `next export` command on Next 14+). If an old
   Next version (<13.3) is detected, use `next build && next export` instead and
   note the version in the report.

6. **`.htaccess` for the SPA** — create a file named `htaccess-for-admin.txt` in
   the repo root (NOT `.htaccess`, to avoid affecting the local repo) containing:
   ```apache
   RewriteEngine On
   RewriteBase /
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^ index.html [L]
   ```
   Note in the report that this must be placed in the admin docroot on the server
   (renamed to `.htaccess`) so client-side routes survive a hard refresh.

---

## 4. Build locally and verify

Run the local build and capture the full output:

```bash
<pkg-manager> install
<pkg-manager> run build      # e.g. npm run build
```

Then verify the artifact:

- Confirm the `out/` directory exists and contains `index.html` plus per-route
  HTML/`_next/` assets. Run `find out -maxdepth 2 -type f | head -50` and include it.
- Confirm there is **no** `out/api` directory expecting a server.
- Optionally smoke-test: `npx serve out` (or `python3 -m http.server -d out 8080`)
  and curl `http://localhost:8080/` for a 200. Note whether the app loads.
- Record the build's reported output: any warnings about dynamic routes,
  `headers()`/`cookies()`, or "could not be statically exported" are BLOCKERS that
  invalidate PATH A — escalate to the report, do not ignore.

Do **not** zip or upload. Leave `out/` in place; the human handles transfer.

---

## 5. Return this report (structured, paste-ready)

Produce a single markdown report named `ADMIN-DEPLOY-REPORT.md` in the repo root
with these exact sections:

```
# Admin Panel Deploy Report

## 1. Environment
- Next.js version:
- Router: (App / Pages / both)
- Package manager:
- Node version used for build:

## 2. Server-side feature audit
| Feature | Found? | Files | BLOCKER or FIXABLE | Notes |
(one row per category from Section 1)

## 3. Decision
- Chosen path: (A / B / C)
- Justification:

## 4. Changes made
(For each file changed: path + unified diff. For each file created: path + contents.)
- next.config: <diff>
- API base URL handling: <what you found + any change>
- Env vars: list of every process.env.* reference, which are NEXT_PUBLIC_, any blockers
- htaccess-for-admin.txt: <contents>
- Other:

## 5. Build result
- Command(s) run:
- Exit status:
- `out/` exists: yes/no
- `find out -maxdepth 2 -type f` output: <paste>
- Smoke test result (if run): <paste>
- Build warnings/errors verbatim: <paste>

## 6. Open questions / risks for human + Claude
- Anything ambiguous, any BLOCKER you couldn't resolve, any assumption you made
  (e.g. the API base URL value), and what still needs a human decision.

## 7. What the human must do next (server side — you did NOT do this)
- Upload contents of `out/` to the admin docroot.
- Rename htaccess-for-admin.txt to .htaccess in that docroot.
- Set the admin subdomain docroot to that folder.
- Confirm NEXT_PUBLIC_API_URL pointed at the live NestJS API at build time.
```

---

## Rules

- **Local only.** No SSH, no uploads, no server commands.
- **Don't fake a static build.** If the build emits SSR/dynamic warnings or fails,
  report it honestly as PATH C rather than producing a broken `out/`.
- **Don't invent the API URL** — find it; if you must assume, flag the assumption.
- **Preserve unrelated config and code.** Minimal, reviewable diffs.
- **Back up** any file you edit (e.g. `next.config.js.bak`) and show diffs.
- If the project won't install/build locally for unrelated reasons, report the
  exact error rather than guessing.

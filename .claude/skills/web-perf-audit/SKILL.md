---
name: web-perf-audit
description: Use before shipping a web site, when pages feel slow, or when asked for a speed / Lighthouse / Core Web Vitals pass. Measures a production build with Lighthouse (mobile, median of 3), fans out 4 read-only audit subagents (assets, frontend code, database/APIs, hosting/network), fixes every finding in one pass, then re-measures and reports before/after numbers.
---

# Web performance audit

Measure → audit (read-only, parallel) → fix in one pass → measure again.
Never remove a feature to gain speed.

**Ask the user first before:** removing a dependency, changing hosting / deploy
region, or changing the database (new migration, index, RLS policy edit).
Write those as proposals in the report instead of doing them.

## 0. Detect the stack

Read `package.json` and the build configs, then note which rules apply:

| Signal | Build + serve for measuring | Notes |
|---|---|---|
| `next` | `next build && next start` | next/image, next/font, RSC/ISR rules apply |
| `@react-router/dev` + `prerender` | `npm run build` then a static server on the output dir | prerendered HTML; no server functions |
| plain `vite` | `vite build && vite preview` | SPA; server-side data fetch → prerender instead |
| `@supabase/supabase-js` / `supabase/` | — | database group runs at **high** effort |

This repo (antalyaviplimousine): React Router v8 framework mode, `ssr: false`,
1000+ prerendered pages, output copied to `dist/` by `scripts/build-all.mjs`,
deployed to **GitHub Pages** (no server functions, no custom cache headers —
skip region/ISR/edge-cache items, report them as N/A). Build needs
`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`; placeholders are fine for a
measurement build. Serve with `npx --yes serve@14 dist -l 4173`.
`build/public-react/` and `public/sitemap.xml` are tracked and get rewritten
by every local build (with the placeholder Supabase URL) — `git checkout --
build public/sitemap.xml && git clean -fd build` before committing; CI
rebuilds them on deploy.

## 1. Baseline (before touching anything)

1. Production build, served locally (table above) or a preview link.
2. Pick the homepage + the 2–3 heaviest pages (largest HTML / most JS /
   most images — check the build output, don't guess).
3. Run:
   ```bash
   node .claude/skills/web-perf-audit/lighthouse-median.mjs --runs 3 \
     --out <scratchpad>/lh-before.json http://localhost:4173/ http://localhost:4173/<page>/
   ```
   Mobile mode, simulated slow 4G + 4× CPU (Lighthouse default). Records the
   median of performance score, LCP, FCP, TBT, CLS, SI and total bytes.

## 2. Audit — 4 subagents in parallel, read-only

Send all four in one message. Each one: **no edits**, returns a list of
`{issue, file:line, affected pages, proposed fix, needs-user-approval?}`.
Effort: default for all except **database → high**.

**A. Images & fonts**
- Every image WebP/AVIF, sized to its rendered size (`srcset`/`sizes`).
  Find originals that are shipped unconverted (`du`, the build's asset list).
- Below-the-fold images/videos `loading="lazy"`; LCP image eager +
  `fetchpriority="high"` + preloaded; explicit `width`/`height` (CLS).
- Fonts: framework loader or self-hosted woff2, `font-display: swap`,
  preload only the above-the-fold weight, max 1–2 families.
- Third-party scripts: remove unused; analytics/chat/video embeds load after
  `load` / on interaction / after consent.

**B. Frontend code**
- Bundle analysis: `npx --yes vite-bundle-visualizer` or read the build's
  chunk list; find the biggest packages and whole-library imports.
- Heavy components the first screen doesn't need (maps, players, editors,
  carousels, forms below the fold) → `React.lazy` / dynamic `import()`.
- Initial data in the HTML (prerender / server fetch), not a client fetch
  waterfall after hydration.
- Skeletons while loading; AI answers streamed.
- Code shipped to public pages that only admin uses.

**C. Database & APIs (high effort)**
- Read every query (`supabase/migrations`, `.from(`, `.rpc(`, edge functions).
- Indexes on filtered/sorted/joined columns, including columns used in RLS
  policies (`user_id`, `created_by`, …).
- RLS: `auth.uid()` → `(select auth.uid())`, same for `auth.jwt()` and
  helper functions, so it runs once per query.
- N+1 (query in a loop / per row) → one query or RPC.
- Unbounded lists → pagination / `range()`.
- Public, user-independent responses cacheable; never cache per-user data.
- Slow work (email, image processing, reports) → background job / queue.
- Output proposals as SQL; **do not apply** — database changes need approval.

**D. Hosting & network**
- Functions in the same region as the database (Vercel default is US East).
- Rarely-changing pages static / prerendered / ISR.
- Sequential independent API calls → `Promise.all` or one endpoint.
- Cache headers, compression, HTTP/2, preconnect to critical origins.
- Click through the main flows in Chrome emulating a low-end Android on slow
  4G (Playwright: `/opt/pw-browsers/chromium` if present, CPU throttle 4×) —
  note janky interactions and long tasks.

## 3. Fix everything in one pass

- Merge the four lists, dedupe, sort by expected impact on LCP/TBT.
- Apply everything that doesn't need approval. Keep each change minimal and
  behavior-preserving; follow the repo's existing patterns (e.g. this repo has
  `npm run optimize:images` — use it, don't add a new image pipeline).
- Run the repo's checks: typecheck, tests, build (here `npm run build` runs
  prebuild = price check + generators + typecheck + vitest).

## 4. Re-measure the same way and report

Same build mode, same pages, same runs →
`lh-after.json`. Report:

- Before/after table per page: score, LCP, FCP, TBT, CLS, SI, bytes (medians).
- What was fixed (file → change).
- Proposals waiting for approval (deps to remove, DB SQL, region/hosting).
- Items checked and N/A for this stack.

Local numbers are for before/after comparison only; real-world field data
(CrUX / Search Console) will differ.

# Public Site React Migration

The public-site migration is complete. The public React application and the admin React application remain separate entry points and are combined into one static deploy artifact.

## Step 1: Baseline (complete)

The current public surface is now covered by `scripts/public-site-contracts.test.js`.

The baseline protects:

- 68 sitemap URLs: 4 homepages, 56 localized route pages, and 8 legal pages.
- English, German, Turkish, Russian, and `x-default` canonical/hreflang relationships.
- Title, description, Open Graph, Twitter Card, and JSON-LD metadata.
- The 14 public transfer route slugs and their Vito/Sprinter prices.
- The current reservation entry point on every commercial page.
- All form controls that feed the existing `create-booking` request.

Run the focused contract suite with:

```bash
npm run test:public
```

## Completed architecture

- Public routes use React Router framework mode with static prerendering and no production SSR server.
- All 68 sitemap URLs ship complete HTML, localized metadata and canonical/hreflang links before JavaScript runs.
- `src/routes.js` is the single source for public/admin destination names, prices, approximate distances and durations.
- React Hook Form and Zod own the reservation UI and validation; the existing Supabase `create-booking` Edge Function contract is preserved.
- i18next/react-i18next provide the 12-language runtime selector. English, German, Turkish and Russian retain indexable localized URLs.
- The existing consent rule is preserved: Google Analytics and Ads load only after explicit acceptance.
- `npm run build` produces the public React pages, the React admin, sitemap, service worker and static assets together in `dist/`.

## Application boundary

- Public site: React Router framework routes with build-time prerendering and no runtime SSR requirement.
- Admin: existing React/Vite entry under `/admin/`.
- Forms: React Hook Form with Zod schemas and a tested payload builder.
- Localization: i18next/react-i18next with generated translation resources.
- Tests: Vitest/Testing Library, a 68-page deploy verifier and a CDP browser smoke test.

## Non-negotiable compatibility contracts

- Existing public paths must not become client-only fallback pages.
- Each indexable route must ship usable HTML metadata before JavaScript runs.
- Existing Google Analytics/Ads consent behavior must remain opt-in.
- `create-booking` field names, value normalization, and payment callback handling must remain compatible.
- Public prices must continue to come from one source and structured data must match visible prices.
- The existing CSS is preserved during component migration; visual redesign is a separate change.

## Verification

Run the complete production gate with:

```bash
npm run build
```

This checks route prices/distances against the database seed and migrations, regenerates derived copy and sitemap data, runs TypeScript and all unit/contract tests, prerenders the public pages, builds admin, then verifies the final `dist/` artifact.

For a manual browser smoke run, start `npm run preview`, launch Chrome with remote debugging on port `9225`, then run `node scripts/browser-smoke.mjs`.

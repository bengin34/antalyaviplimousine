# Public Site React Migration

This document records the contracts that must remain stable while the public site is moved to React. The admin React application stays separate during this migration.

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

## Migration sequence

1. Move route identity, public pricing, approximate distance, duration, and localized route names into one canonical module. Do not change customer-visible values until the conflicting distance records have been reviewed.
2. Introduce the public React/prerender application alongside the existing static output. Keep the current URL paths unchanged.
3. Port the shared shell, language handling, and SEO metadata.
4. Port the homepage section by section while retaining the existing CSS and asset paths.
5. Port the reservation flow behind pure validation and payload-building functions, then connect it to the existing Supabase Edge Function.
6. Port route and legal pages, prerender every sitemap URL, and remove the legacy generators only after equivalence checks pass.

## Planned application boundary

- Public site: React Router framework routes with build-time prerendering and no runtime SSR requirement.
- Admin: existing React/Vite entry under `/admin/`.
- Forms: React Hook Form with Zod schemas after the current payload contract is isolated.
- Localization: i18next/react-i18next after translations are extracted from `src/main.js`.
- Tests: Vitest and Testing Library for components; Playwright is added when the first React public route is available.

## Non-negotiable compatibility contracts

- Existing public paths must not become client-only fallback pages.
- Each indexable route must ship usable HTML metadata before JavaScript runs.
- Existing Google Analytics/Ads consent behavior must remain opt-in.
- `create-booking` field names, value normalization, and payment callback handling must remain compatible.
- Public prices must continue to come from one source and structured data must match visible prices.
- The existing CSS is preserved during component migration; visual redesign is a separate change.

## Known data issue to resolve in Step 2

Distances are duplicated between the localized page generator, database seed/migrations, and admin profit/loss calculations. Some values disagree. Step 2 will create the shared schema and an explicit audit list before any distance is changed.

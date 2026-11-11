# Marketing TODO — antalyaviplimousine

> Project: Transfer bookings. Source: https://github.com/coreyhaines31/marketingskills
> Start: 2026-10-26. All tasks are manual agent-assisted reviews; this PR does **not** schedule automatic jobs or publish changes.

## Setup (once, before first audit)
- [x] Review upstream skills and license; install relevant skills. Ten of the fifty-two are vendored into `.claude/skills/`, MIT, provenance and reasoning in `.claude/skills/MARKETING_SKILLS_UPSTREAM.md`: seo-audit, programmatic-seo, site-architecture, schema, ai-seo, cro, copywriting, analytics, ads, pricing.
- [x] Verify the agent detects the installed SKILL.md files.
- [ ] Establish 28-day baseline: organic clicks, qualified booking leads, booking conversion. Record sources, dates and measurement definitions; never invent figures.
- [ ] Confirm analytics access, consent/privacy requirements and current business claims.

## Cadence and prompts
- [x] **2026-10-25 (initial):** Ran SEO and conversion audit → `MARKETING_AUDIT_2026-10-25.md`. Original prompt: Prompt: "Read .agents/skills/marketing-workflow/SKILL.md and this file. Inspect this repo, identify verified issues and opportunities for Transfer bookings, cite exact paths and metrics, rank by impact/confidence/effort; propose changes only."
- [ ] **Every Monday (weekly):** Compare last 7 days vs prior 7 days for organic clicks, qualified booking leads, booking conversion. Prompt: "Run a weekly growth review; separate observed data from hypotheses; propose up to three measurable experiments."
- [ ] **First business day of each month:** Keyword/competitor and content opportunity review. Prompt: "Research search intent, competitor positioning and content gaps for route and language landing pages; flight/airport FAQs; booking funnel; output a prioritized backlog with evidence and no invented search volumes."
- [ ] **Before each release or landing-page launch:** Copy, store listing/metadata, onboarding, paywall or CTA QA as applicable. Prompt: "Audit the proposed release funnel and claims; identify accessibility, localization, privacy and conversion risks; propose A/B test variants."
- [ ] **Every 4 weeks:** Experiment retrospective: capture hypothesis, control/variant, start/end dates, sample size, guardrails, outcome and decision (ship/retest/stop).

## Project-specific first experiments
- [ ] Review route and language landing pages; flight/airport FAQs; booking funnel.
- [ ] Pick ONE high-intent search/store-listing opportunity and write a change proposal with target audience, target query, baseline and success metric.
- [ ] Pick ONE conversion bottleneck and draft an A/B test; do not deploy until reviewed.

## Google Business Profile posts
Drafts in `marketing/gbp-posts/` (not deployed). Engin publishes from his Google account; agents only draft. No Offer posts (pricing = Engin).
- Cadence: 1 post/week, Monday. Language rotation EN → DE → RU → TR.
- Measure: `landing_view` + `booking_submitted` with `utm_campaign=gbp-post` (site analytics); GBP Performance → website clicks. Check by 2026-12-07.

| Publish on | Type | Lang | Page | Draft |
|---|---|---|---|---|
| 2026-11-10 (expires 20 Nov) | Event | EN | /cop31/ | `2026-11-10-cop31-event-en.md` |
| 2026-11-10 (expires 20 Nov) | Event | TR | /tr/cop31/ | `2026-11-10-cop31-event-tr.md` |
| 2026-11-16 | Update | EN | /transfers/belek/ | `2026-11-16-belek-transfer-en.md` |
| 2026-11-23 | Update | DE | /de/transfers/side/ | `2026-11-23-side-transfer-de.md` |
| 2026-11-30 | Update | RU | /ru/transfers/kemer/ | `2026-11-30-kemer-transfer-ru.md` |
| 2026-12-07 | Update | TR | /tr/transfers/alanya/ | `2026-12-07-alanya-transfer-tr.md` |

Publish checklist:
- [ ] Business Profile → Add update / Add event; one language per post
- [ ] Paste text from the draft body, set button "Book", paste `url` with UTM unchanged
- [ ] Upload `image` (JPG); Event: title + start/end dates from frontmatter
- [ ] After publishing: open the post's button link once, confirm the page loads with UTM
- [ ] Mark the draft `published: <date>` in its frontmatter
- [ ] COP31 Event expires 20 Nov by itself; delete with /cop31/ cleanup (MEN-141, 2026-11-23)

## Done criteria
- [ ] Every finding links to repository paths or measured analytics.
- [ ] Every proposed change has owner, priority, due date, metric and rollback plan.
- [ ] No publishing, ad spend, pricing changes, medical claims or tracking changes without explicit approval.
- [ ] Record findings and next run date here after each session.

## Run log
| Date | Skill / workflow | Baseline and evidence | Decision | Owner | Next review |
|---|---|---|---|---|---|
| 2026-10-25 | seo-audit, programmatic-seo, cro, ai-seo | Repo + build evidence, no invented metrics — see [MARKETING_AUDIT_2026-10-25.md](MARKETING_AUDIT_2026-10-25.md) | 3 P0 / 6 P1 findings proposed; nothing shipped. Analytics baseline still missing and blocks every experiment | TBD | 2026-11-02 |
| 2026-10-25 | P0 execution | Build-measured: transfer chunk 113→52 KB raw, booking chunk 367→234 KB raw, home critical path 285→251 KB gzip | P0.1 shipped in all 23 languages (c24f2dbb); P0.3 hotel index off the critical path (06bc39fc); P0.2 ruled out of scope — /health/ is a demo. Baseline still missing | TBD | 2026-11-02 |
| 2026-11-05 | ecc:seo, copywriting (MEN-141) | COP31 (9–20 Nov 2026) had no page. Shipped /cop31/ in en, tr, de, fr, ru, ar, es: Service + FAQPage schema, hreflang ×7 + x-default, own OG image, sitemap. Site-wide opening dialog until 20 Nov links to it. Booking reuses create-booking as a daily hire priced €200/€250 with fuel included | Measure: `landing_view` / `booking_submitted` with route `cop31`. Remove page, routes and dialog after 22 Nov (temporary event) | Engin | 2026-11-23 |
| 2026-11-05 | ecc:seo, ecc:article-writing, ecc:brand-voice (MEN-141) | No informational COP31 pages; competitors (cop31hub, tantalya) own "COP31 Antalya transport/venue" queries. Facts from cop31.tr/transportation + UNFCCC participant info | Two blog guides × 23 languages: `cop31-antalya-transport` (airport, official shuttles, venue parking pass) and `cop31-where-to-stay` (areas by drive time, our estimates labelled as such). Both link to /cop31/ via a `cop31` article block. Translations unreviewed by native speakers | Engin | 2026-11-23: remove both with /cop31/ (or 301 to /blog/) |
| 2026-11-09 | ecc:seo, ecc:article-writing, ecc:brand-voice (MEN-193) | /cop31/ sold a "fixed" €200/€250 day rate; no Ultra Lux in its form; guest told the vehicle was reserved | Vito from €300, Sprinter from €400 (all prices "from", meta + 7 languages + 23 guide languages); Ultra Lux picker in the form as a plain daily hire (fuel excluded, checkbox); "availability confirmed after booking"; COP31 bookings saved `pending`. Deploy `create-booking` right after Pages | Engin | 2026-11-23 |
| 2026-11-10 | ecc:seo, ecc:article-writing, ecc:brand-voice (MEN-151) | Business Profile exists, Posts unused (MEN-145 research) | 6 drafts (COP31 Event EN+TR, 4 weekly Updates EN/DE/RU/TR), no prices/offers, UTM on every link. Nothing published | Engin | 2026-12-07 |
| 2026-11-11 | ecc:seo, ecc:article-writing, ecc:brand-voice, impeccable (MEN-248) | No page answered "where is the exit / Meet & Greet at Antalya Airport". Geometry from the airport's official floor plans (antalya-airport.aero/katplanlari) + OpenStreetMap; shelter order (police, A–G, left of the T2 exit) from our airport team | `/airport-map/` × 23 languages: three.js map of T2, T1 and the whole airport with a walked arrival route; step list in HTML, FAQPage + BreadcrumbList schema, hreflang ×23 + x-default, sitemap; linked from every transfer page. three.js loads only on this page. Translations unreviewed by native speakers; shelter spacing schematic | Engin | 2026-12-11: Search Console impressions for airport map / meet and greet queries |

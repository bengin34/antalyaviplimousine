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

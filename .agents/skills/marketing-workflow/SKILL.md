---
name: marketing-workflow
description: Coordinate evidence-based SEO, ASO and conversion reviews for antalyaviplimousine using the upstream marketingskills collection and MARKETING_TODO.md.
---

# Marketing workflow for antalyaviplimousine

This is a local orchestration skill. The marketing skills it calls are vendored into `.claude/skills/` — ten of the upstream fifty-two, listed with their provenance in [`.claude/skills/MARKETING_SKILLS_UPSTREAM.md`](../../../.claude/skills/MARKETING_SKILLS_UPSTREAM.md). Upstream: https://github.com/coreyhaines31/marketingskills (MIT).

## When to use
When asked for a marketing audit, weekly growth review, release marketing QA, keyword/content plan, pricing or conversion experiment for **Transfer bookings**.

## Procedure
1. Read `MARKETING_TODO.md`; check cadence and run log.
2. Invoke the skill the question belongs to: `seo-audit`, `programmatic-seo`, `site-architecture`, `schema`, `ai-seo`, `cro`, `copywriting`, `analytics`, `ads`, `pricing`. A question outside those ten is not vendored here; say so rather than improvising its method.
3. Inspect project code, metadata, landing pages and instrumentation; request missing analytics instead of fabricating data.
4. Focus on: route and language landing pages; flight/airport FAQs; booking funnel.
5. Output an evidence table (finding, evidence/path, impact, confidence, effort), prioritized backlog and at most 3 testable experiments with guardrails.
6. Do not modify production, publish content, alter prices, spend on ads or add tracking without approval. Update TODO checkboxes/run log only after completing a run.

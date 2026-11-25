# SEO health log

## 2026-11-25
Crawl: 1214 URLs, first logged run (no baseline).

| Tier | Finding | Count |
|---|---|---|
| FATAL | hreflang not reciprocal (uk/ur legal) | 24 |
| FATAL | STATUS 0 timeout (crawler noise: 24/24 returned 200 on curl recheck) | 24 |
| REVENUE | duplicate title/description | 6 |
| REVENUE | orphan (`/health/`, 23 languages) | 23 |
| REVENUE | thin server HTML (impressum pages) | 7 |
| FLUFF | title length | 206 |
| FLUFF | description length | 132 |

Search Console: skipped, service account sees no properties. Crawl-only run.

Fixed in this PR:
- uk/ur privacy + impressum (untranslated English) no longer publish one-way hreflang.
- cs impressum title no longer duplicates de.
- cs Land of Legends title no longer duplicates pl.

Left (top 5):
1. uk/ur legal pages still English: 4 duplicate title/description findings. Needs translation.
2. `/health/` orphans: demo page in sitemap; link vs. drop is an owner decision.
3. Search Console access for `agent-ops-ga@qrodesk.iam.gserviceaccount.com`.
4. Title/description length (FLUFF).
5. Impressum thin HTML: legal pages, no padding planned.

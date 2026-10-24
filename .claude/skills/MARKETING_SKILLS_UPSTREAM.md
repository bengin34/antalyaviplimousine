# Vendored marketing skills

Ten skills copied from [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills),
plugin version 2.13.0, upstream commit `e85f3cbc2e4a79bf33b2a12e9bdd9087d414735b` (2026-10-19).

The collection ships 52 skills. Half of them answer questions this project does
not have — app store listings, paywalls, churn, referrals, outbound sales — and
every skill description that sits in the folder is read on every turn, so only
the ones this site actually uses are here:

| Skill | Why it is here |
|---|---|
| `seo-audit` | Technical and on-page SEO for the route and language pages |
| `programmatic-seo` | The route and hotel landing pages are built from data, at scale |
| `site-architecture` | URL structure and internal linking across six languages |
| `schema` | The pages already emit JSON-LD; this keeps it honest |
| `ai-seo` | Being cited by AI answers for "Antalya airport transfer" |
| `cro` | The booking funnel |
| `copywriting` | Landing page and CTA copy |
| `analytics` | GA4 and the site_events funnel |
| `ads` | The Google Ads budget |
| `pricing` | Fares and how they are presented |

Each skill's `evals/` directory is left upstream: it tests the skill, and is of
no use to a project consuming it. `SKILL.md` and `references/` are copied as
they are, unmodified, so a diff against upstream is readable.

## Updating

Clone upstream, copy `skills/<name>/SKILL.md` and `skills/<name>/references/`
over the folder here, and record the new commit above. Read the diff before
committing it: a skill is an instruction the agent follows, not a dependency.

Upstream also publishes as a Claude Code plugin
(`/plugin marketplace add coreyhaines31/marketingskills`), which auto-updates
and installs all 52. That trade was considered and declined: the context cost
of 42 irrelevant skill descriptions is paid on every turn, in every session.

## License

MIT, (c) 2025 Corey Haines. Full text as shipped upstream:

```
MIT License

Copyright (c) 2025 Corey Haines

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

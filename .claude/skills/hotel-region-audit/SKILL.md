---
name: hotel-region-audit
description: Use when adding hotels to the index, when the region-audit guard test fails, or to re-verify hotel pricing regions against Google Places. Drives scripts/audit-hotel-regions.mjs and the correction loop.
---

# Hotel region audit

Spec: `docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md` for the
structure; `docs/superpowers/specs/2026-09-11-hotel-address-verification-design.md`
for the evidence model.
Plan: `docs/superpowers/plans/2026-09-10-hotel-region-audit.md`.

A region is confirmed only when **two of three sources agree** on it and it is
the hotel's index region: the address term (when its ilçe holds one price), the
coordinate, and the driving km compared among the candidates the ilçe left open.
The report's `addressRegion` / `locationRegion` / `kmRegion` / `agreeingSources`
columns say which spoke.

## Run

```bash
set -a; . ./.env; set +a
node scripts/audit-hotel-regions.mjs --only-unchecked   # after adding hotels
node scripts/audit-hotel-regions.mjs                     # full pass, resumes from checkpoint
node scripts/audit-hotel-regions.mjs --slug <slug>       # re-verify one row
node scripts/audit-hotel-regions.mjs --redo ok           # explicitly re-fetch confirmed rows
```
Read `scripts/hotel-region-audit/report.md` (non-ok rows, ordered by € at risk).
Never print the API key. The checkpoint and reports may only hold derived
values; the script refuses to persist raw Places text.

Each completed row records a hash of the classifier and matching rules, hotel
identity and region, Place ID, and route prices. A changed or missing hash
invalidates that row automatically, including with `--only-unchecked`. Legacy
checkpoints without hashes require a full pass. Stale, pending, failed and
non-`ok` rows lose `checked: true`; only current successful evidence grants it.
An incomplete run exits nonzero; run again without `--redo` to resume without
discarding work. The guard test also checks hashes, so changing rules or hotel
inputs cannot leave old checked flags silently valid.

## Correct `fix` rows by population

- `regionSource: district` — move the tuple into the right belde block of
  `src/hotel-index.js` (or out of `src/hotel-index-antalya-city.js`), pick the
  belde from `matchedTerm` via `districtRegions`, add a one-line comment saying
  why the seed was wrong (see `Sherwood Dreams Resort`).
- `regionSource: discovery` — never edit `src/hotel-index-discovered.js`. Find
  the Place ID in `scripts/hotel-discovery-pilot/region-price-matches.json` or
  `region-review-resolved.json`, set `pricingRegion` (+ `pricingName`, `prices`,
  `originalPrices` from `routeCatalog`), then
  `npm run generate:hotel-index-discovered`.

Then `--slug <slug>` so the row earns `checked: true` from the same
verification path. Never hand-flip `checked`. A `--slug` run prints its row
and leaves the report files alone; when all corrections are done, run the
script once more with no arguments (0 calls, everything is in the checkpoint)
to rebuild the full `report.json` / `report.md`.

## Residue

- `unresolved` — read `unresolvedReason` first, because it now covers three
  different situations and only the first is fixed by adding a term:
  - `no-evidence` — nothing spoke. Often a belde outside `ADDRESS_REGION_TERMS`
    (`scripts/lib/hotel-region-matching.mjs`): research it, add the term to the
    region's list scoped to its ilçe, with a test, then `--slug` every hotel in
    that group. Never add a term that spans two price regions — it would be
    inconclusive and decide nothing.
  - `single-source` — one source spoke and nothing corroborated it.
    `derivedRegion` holds the dearest candidate and is what to write.
  - `conflict` — sources disagree. Check the Place ID before trusting either;
    `derivedRegion` again holds the dearest of them.
- `identity` — `identityReason` says `name`, `missing`, or
  `loose-name-region-conflict`. Type and status no longer fail a row: they ride
  along in `identityNotes` and block nothing, because how Google files a place
  says nothing about where it is. Rebrand → add an alias. Wrong Place ID →
  re-discover via Text Search +
  `selectOperationalHotelPlace`, route from AYT with `{ placeId }`, write `km`
  + `place` for the slug (scratchpad helper; `build-hotel-distances.mjs --only`
  re-geocodes by name and must not be used here), update the pilot JSON
  `placeId` for discovery rows, then `--slug`.
- `gone` — confirm on the web. Rebrand → identity path. Closure → allowlist in
  `src/hotel-region-audit.test.js` with reason + date; removal from the index
  is the operator's decision, report it.

Ambiguous across a price boundary → file under the dearer region (rule in
`src/hotel-index.js` header).

## Finish

`npm test`, then report what changed and the € impact per hotel (`euroDelta`
in `report.json`).

# Hotel region audit

**Date:** 2026-09-10
**Status:** Approved design, pending implementation planning

## Problem

A hotel's district decides its pricing region, and the region decides the fixed
price quoted for the whole vehicle. A wrong district is therefore wrong on every
transfer to that hotel, for as long as the row stays wrong.

`Kirman Belazur Resort & Spa` was filed under Belek (€40 Vito) although its
address is Boğazkent, Serik (€45 Vito) — 8 km east of Belek and on the far side
of a price boundary. The booking sites the August 2026 seed was compiled from
sell the hotel as "Belek", so the seed inherited their marketing geography.

Nothing in the codebase would have caught it:

- `src/hotel-index.js` is a hand-curated seed. 1197 of its 1223 rows are still
  `status: "draft"` — a research seed that has never been checked against an
  independent source.
- `src/hotel-distances.js` carries a `district` field that looks like
  corroboration but is not. `applyResult`
  (`scripts/lib/hotel-distances-merge.mjs:32-35`) writes `district:
  hotel.district` straight from the index row, so the index confirms itself.
  Nothing reads that field: every `.district` read in the app comes from the
  index object instead (`src/hotel-search.js:99`,
  `public-app/app/components/BookingForm.tsx:183`,
  `public-app/app/components/HotelCombobox.tsx:139`). It is dead data whose only
  effect is to make a single unverified source look like two.
- The stored Place ID is not independent evidence either — for the seed half.
  `scripts/build-hotel-distances.mjs:60` builds the query as
  `"${hotel.name}, ${hotel.district}, Antalya, Turkey"`, restricts it to a
  rectangle derived from that same district, and then takes `json.places?.[0]`
  with no name verification. A wrong district biases the search that produced
  the Place ID, and a wrong Place ID makes both the region and the measured
  distance wrong. This applies to the 872 seed rows only; the 351 discovery rows
  carry a `placeId` that already passed `selectOperationalHotelPlace`, and all
  351 match their `hotelDistances` entry exactly.
- `checked: true` is set on exactly 1 of 1223 rows.

The audit closes this gap by reading an independent source of truth for every
row and reconciling it against the index.

## Goal

Verify all 1223 indexed hotels against Google Places address data, correct every
mismatch the evidence proves, research the residue on the web, and leave behind
a guard that keeps newly added hotels from re-entering the index unverified.

Distances are out of scope except where the audit invalidates one. A hotel whose
Place ID turns out to name a different business has an untrustworthy `km`;
layer 1 only reports that, and re-measuring it is layer 2's `identity` path,
which re-uses `build-hotel-distances.mjs --only` rather than adding a second
Routes pass to the audit.

## Evidence model

Google Places **Details** returns `addressComponents` for a Place ID.
`pricingRegionFromAddressComponents` (`scripts/lib/hotel-region-matching.mjs:138`)
already converts those components into an internal pricing region against the
`ADDRESS_REGION_TERMS` table, whose 12 entries cover roughly 40 beldes.

For the motivating case the address reads
`Boğazkent, 31. Sk. No:8, 07552 Serik/Antalya`, whose components resolve to
`bogazkent`. The audit would have flagged the row without any web research.

Identity is verified with the existing `placeIdentityKey` helper
(`hotel-region-matching.mjs:151`), which strips generic words (`hotel`,
`resort`, `spa`, `the`) before comparing, together with
`businessStatus === "OPERATIONAL"` and a `primaryType` of `hotel` or
`resort_hotel`.

No new *matching* logic is invented, but a small change to
`hotel-region-matching.mjs` is required and the plan must budget for it.
`placeIdentityKey` is module-private, and the exported helper that combines the
three checks, `selectOperationalHotelPlace` (`:155`), takes a *list* of search
results and returns null unless exactly one matches. The audit holds a single
Details response, so it needs either `placeIdentityKey` exported or a new
single-place sibling built from the same predicates. The comparison rules
themselves stay untouched.

### Persistence constraint

Google's terms allow caching Place IDs indefinitely but not the other content
returned with them. The existing discovery scripts state this explicitly and
persist only Place IDs and derived internal classifications. The audit inherits
that rule: **raw display names, formatted addresses, address components,
coordinates, and business statuses stay in memory only.** Reports and source
files record the derived region, the bucket, and a boolean identity verdict —
never the Places text that produced them.

This has a consequence for layer 2: the residue report cannot hand Claude the
Places address to reason about. It can only say "this row is unresolved", and
the web research starts from the hotel name.

## Two row shapes

`hotelIndex` is a concatenation of two populations with different data shapes,
and the audit's correction path differs for each. `hotel-index.js:436` builds
the second from `discoveredHotelRows`.

| | Seed rows | Discovery rows |
| --- | --- | --- |
| Count | 872 | 351 |
| `regionSource` | `district` | `discovery` |
| Source file | `src/hotel-index.js` (hand-curated) | `src/hotel-index-discovered.js` (generated) |
| Region comes from | `districtRegions[district]` | the row's own `region` field |
| `district` value | belde (`Boğazkent`, `Çolaklı`) | coarse ilçe (`Serik`, `Manavgat`, `Alanya`, `Kemer`, `Konyaaltı`, `Muratpaşa`) |
| `placeId` on the row | absent | present, `selectOperationalHotelPlace`-verified |

For a seed row, correcting the district corrects the price, because the region
is derived. For a discovery row the district is decorative — it only reaches the
guest as a label in `HotelCombobox.tsx:139` — and the `region` field is what
must change.

Crucially, a discovery row **cannot be corrected in place**:
`src/hotel-index-discovered.js` is regenerated by
`npm run generate:hotel-index-discovered` from
`scripts/hotel-discovery-pilot/region-price-matches.json` (351 records, each
carrying `pricingRegion`), so a hand edit is silently reverted on the next run.
The correction belongs in that source artifact, keyed by Place ID, followed by
a regeneration. Layer 2 therefore has two distinct edit procedures, and the
report must say which population a row belongs to so the right one is used.

## Architecture

Two layers, split along the line between what a script can prove and what needs
judgement.

### Layer 1 — `scripts/audit-hotel-regions.mjs`

Deterministic, resumable, cheap. For each indexed hotel it issues one Places
Details call for `hotelDistances[slug].place` — present on all 1223 rows,
unlike the row's own `placeId`, which only the 351 discovery rows carry — with
field mask
`id,displayName,formattedAddress,addressComponents,businessStatus,primaryType`,
then sorts the row into one of five buckets:

| Bucket | Condition | Disposition |
| --- | --- | --- |
| `ok` | identity verified, derived region equals index region | write `checked: true` |
| `fix` | identity verified, derived region differs | report only; no write |
| `unresolved` | identity verified, `pricingRegionFromAddressComponents` returns null | residue |
| `identity` | display name does not match, or type/status disqualifies it | residue; `km` also suspect |
| `gone` | Place ID not found, or `CLOSED_PERMANENTLY` | residue |

`ok` is the only bucket layer 1 writes, and this is deliberate. A `fix` row is
corrected in `src/hotel-index.js` by layer 2, which then re-runs
`--slug <slug>`; the row now classifies as `ok` and earns `checked: true` from
the same code path that verifies everything else. Nothing is ever marked audited
on the strength of a correction that has not been re-verified, and there is no
window in which the flag says audited while the index still says otherwise.

`checked: true` is also what protects the result: `applyResult`
(`scripts/lib/hotel-distances-merge.mjs:33`) returns early on a checked row, so
a later `build-hotel-distances` gap-fill cannot overwrite an audited row with a
fresh biased guess. That short-circuit is the reason layer 1 can own this file
at all.

A district change does not invalidate the measured distance: `km` was computed
from the Place ID's own coordinates by `computeRoutes`, not from the district.
Once identity is verified the distance stands, whatever the region turns out to
be. This keeps the audit from triggering a second, far more expensive Routes
pass.

**Writes.** The script owns `src/hotel-distances.js` only, and within it writes
exactly one field: `checked`.

It does not write a district, because the audit removes that field instead.
`pricingRegionFromAddressComponents` yields a pricing *region* (`bogazkent`,
`side`), while the file stores a Turkish district *display string*
(`"Boğazkent"`, `"Çolaklı"`), and the mapping is one-to-many — region `side`
covers nine districts. There is no correct district string to derive, no
consumer that would read one, and keeping the field would preserve the exact
false-corroboration trap this audit exists to remove. So `applyResult` stops
writing `district`, and the key is dropped from the data file. This is a
narrowing of a file the audit already owns, not an unrelated refactor.

Three follow-ons come with it, none large but all on the plan's path:
`applyResult`'s JSDoc still declares `@param {{slug:string, district:string}}`
(`hotel-distances-merge.mjs:28`); three assertions in
`scripts/lib/hotel-distances-merge.test.js:33-45` expect `district: "Side"` in
the merged entry; and because `build-hotel-distances.mjs` rewrites the whole
file from the merged map, rows it never touches would keep their existing
`district` key — so a one-off strip pass over `src/hotel-distances.js` is needed
as well as the generator change. The inert `district` fixtures in
`src/hotel-distance-lookup.test.js:6-7` can stay.

The script deliberately does **not** touch `src/hotel-index.js`, which is
organised into commented belde blocks for human review; moving a row into the
right block with a rationale comment is judgement work that a regex does badly
and layer 2 does well.

**Outputs.** `scripts/hotel-region-audit/report.json` — per row: slug, index
region, derived region, the `ADDRESS_REGION_TERMS` term that matched
(`colakli`, `evrenseki`), `regionSource` so layer 2 knows which edit procedure
applies, bucket, and identity verdict. The matched term is a derived internal
classification rather than Places text, so recording it is
persistence-safe, and it makes the belde choice deterministic for a region like
`side` that spans nine of them — otherwise layer 2 would have to research a
question the address already answered. Alongside it a human-readable table
ordered by money at risk — the per-vehicle euro delta between the two regions,
so the rows that cost the most are read first.

**Operational shape.** Checkpoint-and-resume and a `--max-calls` cap, matching
`scripts/match-hotel-regions.mjs`. A `--slug` flag audits one hotel, and
`--only-unchecked` audits only rows the guard would reject, which is what a
developer runs after adding a hotel. Throttled like the sibling scripts.

**Cost.** Roughly 1223 Details calls for the full pass, on the order of $10–20.
One €5 region error carried across a season exceeds that many times over.

### Layer 2 — `hotel-region-audit` skill

A project skill at `.claude/skills/hotel-region-audit/SKILL.md` that drives the
whole correction, so the operator runs one thing and reviews the result rather
than shepherding steps:

1. Run the script (resuming if a checkpoint exists).
2. Apply each `fix` row, by population:
   - **Seed row** (`regionSource: "district"`) — move the tuple into the correct
     belde block in `src/hotel-index.js`, using the report's matched term to
     pick the block, and add a one-line comment recording why the seed was
     wrong, matching the existing `Sherwood Dreams Resort` precedent.
   - **Discovery row** (`regionSource: "discovery"`) — edit `pricingRegion` for
     that Place ID in
     `scripts/hotel-discovery-pilot/region-price-matches.json`, then run
     `npm run generate:hotel-index-discovered`. Never hand-edit
     `src/hotel-index-discovered.js`; the generator overwrites it.
3. Re-run `--slug` for each corrected row so it re-verifies as `ok` and earns
   `checked: true`.
4. Work the residue. This is the only part that needs the internet, and it
   exists because the script has nothing to write when it cannot prove an
   answer. Each bucket has its own exit:
   - `unresolved` — the address resolved to a belde outside
     `ADDRESS_REGION_TERMS`. Research which belde it is; if it belongs to a
     region we already price, add the term to the table and re-run `--slug`,
     which fixes every other hotel in that belde at the same time. Extending the
     table is the preferred outcome, because it converts a residue row into a
     deterministic one permanently.
   - `identity` — the stored Place ID names a different business, so the region
     *and* the `km` are untrustworthy. Re-discover the Place ID with a Text
     Search filtered through `selectOperationalHotelPlace`, write it, then
     re-measure with `build-hotel-distances.mjs --only <slug>` (the row is not
     `checked`, so `applyResult` will accept the new value). Then re-run
     `--slug` to audit it.
   - `gone` — confirm on the web whether the hotel has closed or merely
     rebranded. A rebrand is an `identity` row under a new name; a genuine
     closure is removed from the index, which needs the operator's confirmation
     because it withdraws a hotel guests may still search for.
5. Where research leaves a hotel genuinely ambiguous across a price boundary,
   apply the rule `src/hotel-index.js` already states: file it under the dearer
   region, because an under-quote is a loss on every transfer while an
   over-quote costs at most the one booking that walks away.
6. Allowlist what genuinely cannot be resolved — see layer 3 — rather than
   leaving the guard permanently unreachable.
7. Run `npm test`.
8. Report what changed and the euro impact per changed hotel.

Steps 4 and 6 are where the skill needs the operator's judgement rather than
its own: removing a hotel and allowlisting one are both reported for
confirmation, not done silently.

### Layer 3 — the guard

A test asserting that every row in `hotelIndex` either has `checked: true` in
`hotelDistances` or appears in an explicit `UNAUDITED_HOTEL_SLUGS` allowlist,
each entry carrying a one-line reason and a date. A newly added hotel fails CI
until it has been audited, which is what keeps the seed from silently regrowing
an unverified tail.

The allowlist is what makes the guard reachable. Some rows will resist every
step in layer 2 — a hotel with no Google presence, or one whose address is
genuinely disputed — and without an escape hatch the guard could never be
switched on, which in practice means it never gets written. The pattern already
exists in this repo: `src/hotel-distances.test.js:9` uses `UNMAPPED_HOTEL_SLUGS`
exactly this way, paired with a second test asserting no allowlisted slug
secretly has a value, so a stale entry is caught rather than hiding a
regression. The guard copies both tests.

The guard cannot land with the bulk pass: today 1222 of 1223 rows would fail it.
It is enabled once the bulk pass and residue research have driven the unchecked,
un-allowlisted count to zero — which makes it the last step of the work, not the
first.

## Error handling

- **API key missing** — fail immediately, matching the sibling scripts.
- **Transient HTTP failure** — the row stays unwritten and is retried on the
  next resume; a failure never writes `checked: true`.
- **Rate limiting** — the `--max-calls` cap plus the existing throttle bound one
  run; resume continues where it stopped.
- **Ambiguous evidence** — never guessed at. Anything the script cannot prove
  becomes residue, and residue is a reported bucket, not a silent default.

## Testing

Layer 1's bucket classifier is a pure function over an in-memory Places Details
response and the index row, tested directly with fixtures for all five buckets,
including the Belazur case as a regression fixture. That fixture reproduces the
row's *pre-fix* state — indexed as `belek`, address components resolving to
`bogazkent` — because the index itself has since been corrected
(`src/hotel-index.js:229`); the test's job is to prove the classifier would have
caught it, not to describe the file as it stands.

Network access, checkpoint I/O, and file writes stay outside the classifier,
consistent with how `scripts/lib/hotel-index-discovered.test.js` tests its own
pure core.

The euro-delta ordering is tested against `routeCatalog` prices.

Layer 3's guard is itself the regression test for the index.

## Risks

- **Places disagrees with reality.** Google's address components are a strong
  source but not a land registry. The audit corrects the mass of clear cases and
  routes the doubtful ones to research rather than treating Places as final.
- **Auto-correction moves a price the wrong way.** Bounded by the identity
  check: a row is only auto-corrected when the Place ID demonstrably names the
  hotel we mean. Everything else is residue.
- **`ADDRESS_REGION_TERMS` coverage.** Beldes outside the table produce
  `unresolved` rather than a wrong answer. A large `unresolved` bucket is a
  signal to extend the table, and the report makes its size visible.

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
  corroboration but is not. `scripts/build-hotel-distances.mjs:116` copies the
  index's own district into it, so the index confirms itself.
- The stored Place ID is not independent evidence either.
  `scripts/build-hotel-distances.mjs:60` builds the query as
  `"${hotel.name}, ${hotel.district}, Antalya, Turkey"`, restricts it to a
  rectangle derived from that same district, and then takes `json.places?.[0]`
  with no name verification. A wrong district biases the search that produced
  the Place ID, and a wrong Place ID makes both the region and the measured
  distance wrong.
- `checked: true` is set on exactly 1 of 1223 rows.

The audit closes this gap by reading an independent source of truth for every
row and reconciling it against the index.

## Goal

Verify all 1223 indexed hotels against Google Places address data, correct every
mismatch the evidence proves, research the residue on the web, and leave behind
a guard that keeps newly added hotels from re-entering the index unverified.

Distances are out of scope except where the audit invalidates one: a hotel whose
Place ID turns out to name a different business has an untrustworthy `km`, which
the audit reports rather than re-measures.

## Evidence model

Google Places **Details** returns `addressComponents` for a Place ID.
`pricingRegionFromAddressComponents` (`scripts/lib/hotel-region-matching.mjs:138`)
already converts those components into an internal pricing region against the
`ADDRESS_REGION_TERMS` table, which covers 13 regions and roughly 40 beldes.

For the motivating case the address reads
`Boğazkent, 31. Sk. No:8, 07552 Serik/Antalya`, whose components resolve to
`bogazkent`. The audit would have flagged the row without any web research.

Identity is verified with the existing `placeIdentityKey` helper
(`hotel-region-matching.mjs:151`), which strips generic words (`hotel`,
`resort`, `spa`, `the`) before comparing, together with
`businessStatus === "OPERATIONAL"` and a `primaryType` of `hotel` or
`resort_hotel`. No new matching logic is written; the audit reuses what the
discovery pipeline already proved out.

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

## Architecture

Two layers, split along the line between what a script can prove and what needs
judgement.

### Layer 1 — `scripts/audit-hotel-regions.mjs`

Deterministic, resumable, cheap. For each indexed hotel it issues one Places
Details call for the stored Place ID with field mask
`id,displayName,formattedAddress,addressComponents,businessStatus,primaryType`,
then sorts the row into one of five buckets:

| Bucket | Condition | Disposition |
| --- | --- | --- |
| `ok` | identity verified, derived region equals index region | write `checked: true` |
| `fix` | identity verified, derived region differs | auto-correct |
| `unresolved` | identity verified, `pricingRegionFromAddressComponents` returns null | residue |
| `identity` | display name does not match, or type/status disqualifies it | residue; `km` also suspect |
| `gone` | Place ID not found, or `CLOSED_PERMANENTLY` | residue |

A district change does not invalidate the measured distance: `km` was computed
from the Place ID's own coordinates by `computeRoutes`, not from the district.
Once identity is verified the distance stands, whatever the region turns out to
be. This keeps the audit from triggering a second, far more expensive Routes
pass.

**Writes.** The script owns `src/hotel-distances.js` only — a machine-maintained
data file where a district string and a `checked` flag can be rewritten safely.
It deliberately does **not** touch `src/hotel-index.js`, which is organised into
commented belde blocks for human review; moving a row into the right block with
a rationale comment is judgement work that a regex does badly and layer 2 does
well.

**Outputs.** `scripts/hotel-region-audit/report.json` (every row: slug, index
region, derived region, bucket, identity verdict) plus a human-readable table
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
2. Apply each `fix` row to `src/hotel-index.js`: move the tuple into the correct
   belde block and add a one-line comment recording why the seed was wrong,
   matching the existing `Sherwood Dreams Resort` precedent.
3. Research the residue on the web — the hotel's own site, TripAdvisor, address
   listings — and decide the district. This is the only part that needs the
   internet, and it exists because the script has nothing to write when it
   cannot prove an answer.
4. Where research leaves a hotel genuinely ambiguous across a price boundary,
   apply the rule `src/hotel-index.js` already states: file it under the dearer
   region, because an under-quote is a loss on every transfer while an
   over-quote costs at most the one booking that walks away.
5. Run `npm test`.
6. Report what changed and the euro impact per changed hotel.

### Layer 3 — the guard

A test asserting that every row in `hotelIndex` has `checked: true` in
`hotelDistances`. A newly added hotel fails CI until it has been audited, which
is what keeps the seed from silently regrowing an unverified tail.

The guard cannot land with the bulk pass: today 1222 of 1223 rows would fail it.
It is enabled once the bulk pass and residue research have driven the unchecked
count to zero.

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
including the Belazur case as a regression fixture. Network access, checkpoint
I/O, and file writes stay outside it, consistent with how
`scripts/lib/hotel-index-discovered.test.js` tests its own pure core.

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

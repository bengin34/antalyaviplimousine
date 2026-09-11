# Hotel address verification

An indexed hotel must be priced on the region it is actually in. Today that
rests on a single piece of evidence — the text Google returns for its address —
and where that text is thin or the hotel cannot be identified, nothing catches a
wrong region. This design adds two independent sources of evidence and requires
two of the three to agree before a region counts as verified.

It changes the evidence model of
`docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md`. Everything
else in that spec stands: the checkpoint, the bucket taxonomy, input hashes, the
guard test, and — stated again here because this design depends on it — the rule
that **the audit writes exactly one field, `checked`, and never edits the index.**
Corrections stay a human step, following that spec's two-population procedure.

## Why

Two hotels were quoted on the wrong region and found by hand, not by the audit.
Tracing them exposed two holes, measured against the 2026-09-11 report (1246
hotels: 1165 ok, 3 fix, 7 unresolved, 71 identity).

**An ilçe name is accepted as belde evidence.** `ADDRESS_REGION_TERMS`
(`scripts/lib/hotel-region-matching.mjs:126`) lists `manavgat` among `side`'s
terms and `kemer` among `kemer`'s. Both ilçeler span two price regions — Manavgat
holds Side (€50) and Kızılağaç (€70), Kemer holds Kemer (€55) and Tekirova (€75)
— so an address naming only the ilçe cannot tell the cheap belde from the dear
one. **72 rows are `ok` on exactly that evidence** (52 kemer, 20 manavgat), all
on the cheap side. Two are demonstrably wrong: Caner Mountain Hotel is 74 km from
AYT where Kemer's hotels sit at 44–68 km, and La Benata Hotel is 90 km where
Side's sit at 55–71 km. The skill's own rule already forbids this — "Never add a
term that spans two price regions" (`.claude/skills/hotel-region-audit/SKILL.md:56`)
— but it was never enforced in code. `kas` and `kumluca` also appear as their own
belde terms; each of those ilçeler holds a single price region, so they are safe
and stay.

**One failed check discards every other kind of evidence.** 74 rows carry no
address evidence: 67 failed identity (44 name, 18 type, 5 status) and 7 were
identity-verified but matched no address term. `identityCheck`
(`scripts/lib/hotel-region-audit.mjs:25`) tests status and type and returns
before it ever compares the name, so those 23 type/status rows have never had
their identity actually assessed — they were rejected for being listed under an
unusual category or flagged temporarily closed, neither of which says anything
about where a place is.

The ministry dataset (`scripts/hotel-discovery-pilot/unverified-ministry.json`,
456 records) was considered as a second source and rejected: it carries ilçe
only, no belde and no address, so it reproduces the weakness it would have to fix.

## Evidence model

Three sources, each resolving to a pricing region or to nothing.

| # | Evidence | Source | Blind where |
|---|---|---|---|
| 1 | Belde name in address components | `matchAddressRegionTerm` | Address names only the ilçe |
| 2 | Coordinate → pricing region | `resolvePricingRegion` | Place ID points at the wrong business; outside the corridor (Kaş, Kumluca) |
| 3 | AYT driving km against the region's observed range | `src/hotel-distances.js` | Regions whose ranges overlap (belek/bogazkent) or are wide (antalya) |

**A row is `ok` when at least two sources name the same region *and* that region
is the hotel's index region, or price-equivalent to it.** The second half is not
optional: two sources agreeing on `tekirova` while the index says `kemer` is a
`fix`, not a pass. This preserves the existing `agrees` condition at
`scripts/lib/hotel-region-audit.mjs:73`; what changes is only how many sources
must support the derived region.

When two sources agree on a region other than the index region, the row is `fix`
and the report names that region. When no two sources agree — they conflict, or
only one speaks — the row is `unresolved` and the report names **the dearest of
the regions the evidence actually named**, which is the region the operator
should write. Bounding the candidates to what the evidence named is what keeps
this from proposing Kaş rates for an unidentifiable pension; a row with no
evidence at all names no candidate and is reported as needing research.

"Dearest" compares Vito first and Sprinter as the tiebreaker, so kizilagac
(70/115) is correctly dearer than alanya_bati (70/90). `euroDelta`
(`scripts/lib/hotel-region-audit.mjs:12`) keeps reporting the Vito difference.

This rule is the same principle as the price-boundary note in
`src/hotel-index.js:38` and supersedes it for audited rows: the three `fix`
entries in `UNAUDITED_HOTEL_SLUGS` that invoke it by hand
(`src/hotel-region-audit.test.js:17-19`) are expected to resolve through the
normal path and leave the allowlist.

### Source 1 — belde name

`manavgat` is removed from `side`'s term list and `kemer` from `kemer`'s. An
address resolving only to an ilçe yields no source-1 region. The ilçe gate (the
third tuple element) is unchanged and still scopes belde terms to their ilçe.

### Source 2 — coordinate

**This is existing code, not new work.** `resolvePricingRegion`
(`scripts/lib/hotel-region-matching.mjs:70`) already converts a Places
coordinate into a pricing region through `EASTERN_BANDS` longitude bands plus a
latitude split for the Kemer coast, already returns `{ review, reason }` for
boundary and out-of-corridor cases, and already refuses to return the
coordinate so callers can persist its verdict. It is in production use at
`scripts/match-hotel-regions.mjs:119` and `scripts/review-hotel-regions.mjs:232`.
Notably `EASTERN_BANDS` carries a dedicated `bogazkent` band (31.134–31.222),
so source 2 separates exactly the Belek/Boğazkent boundary that motivated this
work.

The only change is wiring: the audit's field mask
(`scripts/audit-hotel-regions.mjs:99`) gains `location`, and the classifier
calls the function. A `review: true` result is recorded and does not count as an
agreeing source.

Kaş and Kumluca lie outside the corridor and yield no source-2 region. They
depend on sources 1 and 3, and source 1 is reliable there because neither ilçe
spans a price boundary.

### Source 3 — driving km

Source 3 is a **tiebreaker and a report, never a gate.** Each region's observed
range is the min and max stored km across hotels whose sources 1 and 2 agree. A
hotel whose km falls inside exactly one region's range yields that region;
inside several or none, it yields nothing.

Ranges are computed after every row has been classified on sources 1 and 2, so
there is no ordering or bootstrap dependency: source 3 never participates in the
decision that produces the population it is derived from.

Its discriminating power is uneven and the design does not pretend otherwise.
Kemer (44–68) against Tekirova (75–78) and Side (55–71) against Kızılağaç
(80–88) separate cleanly — those are the two boundaries the 72 weak rows sit on,
which is why source 3 earns its place. Belek and Boğazkent overlap and antalya
spans 3–43 km, so source 3 is silent there; source 2 covers both.

## Identity gate

`identityCheck` is reordered to compare the name first. A `name` mismatch still
invalidates sources 1 and 2, because there the Place may genuinely describe a
different business; such a row falls to source 3 alone, cannot reach two
agreeing sources, and so takes the report-the-dearest-candidate path.

Once the name matches, `status` and `type` mismatches no longer invalidate
anything. They are recorded on the row and surface in the report as notes.
`LODGING_PLACE_TYPES` and `STRICT_HOTEL_TYPES` keep their definitions and now
feed the report rather than the pass/fail decision.

`CLOSED_PERMANENTLY` keeps its own `gone` bucket and stays an operator decision.
Because `identityCheck` currently rejects every non-`OPERATIONAL` status before
`classifyAuditRow` reaches its `CLOSED_PERMANENTLY` branch, this reordering is
what makes the existing `gone` branch reachable as intended.

The loose-name rule at `scripts/lib/hotel-region-audit.mjs:69` — trust a loose
name match only when the address corroborates the index — loses its corroborator
on ilçe-only addresses. Source 2 substitutes: a loose name match is trusted when
either source 1 or source 2 agrees with the index, and the existing
`loose-name-region-conflict` outcome applies when one of them disagrees.

## Persistence

`scripts/audit-hotel-regions.mjs:58` refuses to write raw Places content to
disk, `location` included. That guard stays exactly as it is, and
`resolvePricingRegion` is built for it. Coordinates are fetched, resolved in
memory, and discarded; the checkpoint gains only derived values alongside the
existing `derivedRegion` and `matchedTerm`:

- `addressRegion` — source 1 result, or null
- `locationRegion` — source 2 result, or null, plus `locationReview` when the
  coordinate fell on a boundary or outside the corridor
- `kmRegion` — source 3 result, or null
- `agreeingSources` — how many named `derivedRegion`
- `candidateRegions` — the regions the evidence named, when no two agreed

`checked: true` keeps its meaning — written only for an `ok` row, from a current
successful fetch — and now additionally requires `agreeingSources >= 2`. Every
other bucket continues to lose `checked`, and `--redo <bucket>` is unaffected.

`inputHash` extends to cover the term table, `EASTERN_BANDS`, the identity
ordering, and the classifier — **the rules, not the computed km ranges.** Hashing
derived ranges would let one added hotel shift a percentile and invalidate every
row in its region, forcing an unbounded paid re-fetch. Since source 3 cannot
decide an `ok` on its own, leaving ranges out of the hash costs nothing.

## Guard test

`src/hotel-region-audit.test.js` keeps its existing `checked`/hash check and
gains one more, running with no API calls:

- every row marked `ok` records `agreeingSources >= 2` and a `derivedRegion`
  equal to the row's index region or price-equivalent to it

A km-range assertion was considered as a guard and rejected: any range derived
from a population necessarily excludes part of that population, so it would
manufacture exemptions — roughly 38 hotels today — for hotels that are merely at
the edge of their region. km outliers belong in the report, where a human reads
them, and they are listed there ordered by € at risk.

`UNAUDITED_HOTEL_SLUGS` keeps its shape and its one-line-reason discipline.

## Expected effect

Predictions from the current report, to be replaced by the real numbers from the
first full pass:

- **Caner Mountain Hotel** → tekirova and **La Benata Hotel** → kizilagac, +€20
  per vehicle each, both currently `ok`.
- **Throne Nilbahir Resort & Spa** flagged for research: 93 km, priced as side
  (€50) where its distance points past kizilagac.
- The other 70 ilçe-evidence rows should confirm in place on sources 2 and 3.
  This is not a broad price rise.
- Of the 23 rows failing on type or status, those whose names also match become
  verified. How many that is cannot be predicted, because their names have never
  been compared.

## Out of scope

Verified rows do not expire — a checkpoint row carries no date, so a hotel that
rebrands or moves keeps its verdict until the rules change — and nothing
schedules the audit. Both are real gaps, neither caused the wrong prices found
here, and both belong to their own piece of work.

Index coverage is also out of scope. Orange County Resort Hotel Belek was
mispriced because it was absent from the index entirely, which no audit can
detect; it was added by hand and is used below only as a fixture.

`src/hotel-index.js:481` describes kizilagac as €60 while `src/routes.js` prices
it at €70. The comment is stale and sits in the block this work edits; correcting
it is a one-line drive-by, not a design decision.

## Testing

Unit tests in `scripts/lib/hotel-region-matching.test.js` and
`scripts/lib/hotel-region-audit.test.js` cover:

- an ilçe-only address yields no source-1 region, while a belde address still does
- `resolvePricingRegion`'s `review: true` results do not count as an agreeing source
- km range membership yields a region only when exactly one range contains it
- two agreeing sources on the index region give `ok`; two agreeing on another
  region give `fix`; one source alone never gives `ok`
- the dearest-candidate report picks kizilagac over alanya_bati on the Sprinter
  tiebreaker
- a `type` or `status` mismatch with a matching name no longer blocks
  verification, while a `name` mismatch still does
- `CLOSED_PERMANENTLY` still reaches `gone`

A fixture test replays the three known rows — `orange-county-resort-hotel-belek`
(bogazkent, the case that started this), `caner-mountain-hotel` (expected to move
to tekirova) and `la-benata-hotel` (expected to move to kizilagac) — through the
classifier with recorded synthetic Places responses, asserting the bucket and
derived region each lands on, so this regression stays caught.

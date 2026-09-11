# Hotel address verification

An indexed hotel must be priced on the region it is actually in. Today that
rests on a single piece of evidence — the text Google returns for its address —
and where that text cannot distinguish a cheap belde from a dear one, nothing
catches a wrong region. This design adds two independent sources of evidence and
requires two of the three to agree before a region counts as verified.

It changes the evidence model of
`docs/superpowers/specs/2026-09-10-hotel-region-audit-design.md`. Everything
else in that spec stands: the checkpoint, the bucket taxonomy, input hashes, the
guard test, and — restated here because this design depends on it — the rule that
**the audit writes exactly one field, `checked`, and never edits the index**
(`reconcileAuditFlags`, `scripts/lib/hotel-audit-state.mjs:17`). Corrections stay
a human step, following that spec's two-population procedure.

## Why

Two hotels were quoted on the wrong region and found by hand, not by the audit.
Tracing them exposed two holes, measured against the 2026-09-11 report (1246
hotels: 1165 ok, 3 fix, 7 unresolved, 71 identity).

**A term that cannot decide a price is treated as if it could.**
`ADDRESS_REGION_TERMS` (`scripts/lib/hotel-region-matching.mjs:126`) lists
`manavgat` among `side`'s terms and `kemer` among `kemer`'s. Both are ilçe names
whose ilçe spans two price regions — Manavgat holds Side (€50) and Kızılağaç
(€70), Kemer holds Kemer (€55) and Tekirova (€75) — so an address matching only
that term cannot tell the cheap belde from the dear one. **72 rows are `ok` on
exactly that evidence** (52 kemer, 20 manavgat), all on the cheap side, as are
all 3 current `fix` rows. Two are demonstrably wrong: Caner Mountain Hotel is 74
km from AYT where Kemer's hotels sit at 43–71 km, and La Benata Hotel is 90 km
where Side's sit at 54–72 km. The skill already forbids this — "Never add a term
that spans two price regions"
(`.claude/skills/hotel-region-audit/SKILL.md:56`) — but it was never enforced in
code.

**One failed check discards every other kind of evidence.** 74 rows carry no
address evidence: 67 failed identity (44 name, 18 type, 5 status) and 7 were
identity-verified but matched no term. `identityCheck`
(`scripts/lib/hotel-region-audit.mjs:25`) tests status and type and returns
before it ever compares the name, so those 23 type/status rows have never had
their identity assessed. Being listed under an unusual category, or flagged
temporarily closed, says nothing about where a place is.

The ministry dataset (`scripts/hotel-discovery-pilot/unverified-ministry.json`,
456 records) was considered as a second source and rejected: it carries ilçe
only, no belde and no address, so it reproduces the weakness it would have to fix.

## Evidence model

Three sources, each resolving to a pricing region or to nothing.

| # | Evidence | Source | Silent or wrong where |
|---|---|---|---|
| 1 | Conclusive address term | `matchAddressRegionTerm` | Term's ilçe spans two price regions |
| 2 | Coordinate → pricing region | `resolvePricingRegion` | Wrong Place ID; near a band edge; outside the corridor |
| 3 | AYT driving km, among the candidates in play | `src/hotel-distances.js` | Fewer than two candidates; km fits several of them |

**A row is `ok` when at least two sources name the same region *and* that region
is the hotel's index region or price-equivalent to it.** The second half is not
optional: two sources agreeing on `tekirova` while the index says `kemer` is a
`fix`, not a pass. This preserves the existing `agrees` condition
(`scripts/lib/hotel-region-audit.mjs:63`); what changes is how many sources must
support the derived region. Two sources naming different but price-equivalent
regions count as agreeing, using the existing `samePrices`
(`scripts/lib/hotel-region-audit.mjs:18`) — `side` and `manavgat` are both 50/85
and must not be treated as a conflict.

When two sources agree on a region other than the index region, the row is `fix`
and the report names that region.

When no two agree — they conflict, or only one spoke — the row is `unresolved`,
`derivedRegion` holds **the dearest of the regions the evidence actually named**,
and `candidateRegions` lists them all. That is the region the operator should
write. Bounding candidates to what the evidence named keeps this from proposing
Kaş rates for an unidentifiable pension; a row with no evidence names no
candidate, leaves `derivedRegion` null, and is reported as needing research.

"Dearest" compares Vito first and Sprinter as the tiebreaker, so kizilagac
(70/115) is dearer than alanya_bati (70/90). `euroDelta`
(`scripts/lib/hotel-region-audit.mjs:12`) keeps reporting the Vito difference.

This is the same principle as the price-boundary note at `src/hotel-index.js:38`
and supersedes it for audited rows; the three `fix` entries in
`UNAUDITED_HOTEL_SLUGS` that invoke it by hand (`src/hotel-region-audit.test.js:17-19`)
are expected to resolve through the normal path and leave the allowlist.

### Source 1 — conclusive address term

A matched term is **conclusive when every region gated on that term's ilçe
resolves to the same price**, and inconclusive otherwise. This is computed from
`ADDRESS_REGION_TERMS` and `routeCatalog`, not hand-listed, so adding a region
to an ilçe automatically demotes that ilçe's terms.

Today exactly two terms are inconclusive: `manavgat` (Side / Kızılağaç) and
`kemer` (Kemer / Tekirova). `kas` and `kumluca` are also ilçe names appearing as
their own belde terms, but each of those ilçeler holds a single price region, so
they stay conclusive and the five hotels relying on them are unaffected. Framing
the rule as "an ilçe name is never evidence" would have deadlocked those five:
source 2 is blind outside its corridor, leaving them one source and no path to
`ok`.

An inconclusive match still records its term, so the report can say why source 1
abstained.

### Source 2 — coordinate

**This is existing code, not new work.** `resolvePricingRegion`
(`scripts/lib/hotel-region-matching.mjs:70`) converts a Places coordinate into a
pricing region through `EASTERN_BANDS` longitude bands plus a latitude split for
the Kemer coast, returns `{ review, reason }` for boundary and out-of-corridor
cases, and refuses to return the coordinate so callers may persist its verdict.
It is in production use at `scripts/match-hotel-regions.mjs:119` and
`scripts/review-hotel-regions.mjs:232`.

The only change is wiring: the audit's field mask
(`scripts/audit-hotel-regions.mjs:99`) gains `location`, and the classifier calls
the function. A `review: true` result is recorded and does **not** count as an
agreeing source.

Two properties matter to this design and neither is a defect to fix here:

- **It abstains near every band edge.** `LONGITUDE_REVIEW_MARGIN = 0.012`
  (`scripts/lib/hotel-region-matching.mjs:1`) is roughly 1.1 km at this latitude,
  so a hotel within about 1 km of the Belek/Boğazkent line returns `review: true`
  and stays silent. Source 2 therefore does not *separate* that boundary; it
  classifies confidently away from it and declines at it. A hotel that close to
  the line reaches at most one agreeing source and takes the dearest-candidate
  path — which is the outcome the price-boundary rule already asks for, so the
  abstention produces the right answer rather than a gap.
- **It can be confidently wrong on the Kemer coast.** The branch at
  `scripts/lib/hotel-region-matching.mjs:81` requires both `longitude < 30.68`
  and `latitude < 36.80`; a Kemer-area coordinate failing either test falls
  through to the eastbound bands and returns `antalya` with `review: false`.
  That is an actively voting wrong source, not a silent one. It is the reason
  source 2 alone never confirms.

Kaş and Kumluca lie outside the corridor entirely and yield no source-2 region;
they depend on sources 1 and 3, both of which speak there.

### Source 3 — driving km, among the candidates in play

Source 3 answers one narrow question: **which region, among those the other
evidence has put in play, does this hotel's distance fit?** It is never asked to
choose among all regions, and it never votes into an empty field.

The candidate set is the regions of the ilçe the address matched, plus the
region the coordinate named. Fewer than two candidates and source 3 is silent —
a single candidate would agree with itself and hand out a free second source.

That scoping is what makes the source work at all. Driving km from AYT is a
one-dimensional projection of a two-dimensional coast, so regions in opposite
directions sit at the same distance: Kemer spans 43–71 km and Side 54–72 km,
almost entirely overlapping, though one is southwest of the airport and the
other east. Compared globally, a Kemer hotel at 60 km falls inside both ranges
and source 3 abstains — which is what happens to 67 of the 72 rows it exists to
rescue. Compared within Kemer ilçe, where the only candidates are Kemer and
Tekirova, the same 60 km is decisive.

Each region's range is the min and max stored km across rows whose address term
was conclusive and whose coordinate, if it spoke, agreed. A km inside exactly
one candidate's range names that region. Inside none, the nearest range boundary
wins, provided it is at least 2 km nearer than the runner-up. Inside more than
one, source 3 is silent.

Ranges are computed **from the checkpoint**, across all completed rows, not from
the rows a given run happens to fetch. This is what keeps buckets deterministic
under `--slug`, `--max-calls` and resume, where the current run's population may
be a single row.

Measured over today's data, scoped comparison speaks for all 77 ilçe-evidence
rows and proposes a different region for exactly four: `caner-mountain-hotel`
(74 km, Kemer → Tekirova), `la-benata-hotel` (90 km, Side → Kızılağaç),
`throne-nilbahir-resort-spa` (93 km, Side → Kızılağaç) and
`alarcha-hotels-resort` (90 km, already residue for a loose-name conflict). The
other 73 confirm in place.

Ranges for reference: kemer 43–71, tekirova 75–78, side 54–72, kizilagac 80–88,
belek 26–42, bogazkent 41–44, antalya 3–43, kumluca 108–110, kas 202–208.

## Identity

Reordering `identityCheck` to compare the name first is necessary but **not
sufficient**, because `isOperationalHotelPlace`
(`scripts/lib/hotel-region-matching.mjs:249`) independently re-tests
`primaryType` and `businessStatus`. Left alone, a type- or status-mismatched
place could never return `strength: "strict"`; it would silently degrade to a
loose match and inherit the loose rule's demand for corroboration. So identity
gains a name-only comparison — the existing `placeIdentityKey` equality with
`isOperationalHotelPlace`'s type and status conditions dropped — and
`isOperationalHotelPlace` itself is left untouched for its other callers,
notably `selectOperationalHotelPlace` (`scripts/lib/hotel-region-matching.mjs:257`),
where an operating classic hotel is genuinely the question.

After that change: a `name` mismatch still invalidates sources 1 and 2, because
the Place may describe a different business; such a row falls to source 3 alone,
cannot reach two agreeing sources, and takes the dearest-candidate path. A
`status` or `type` mismatch with a matching name no longer invalidates anything
and is recorded as a note on the row.

`CLOSED_PERMANENTLY` is unaffected: `classifyAuditRow`
(`scripts/lib/hotel-region-audit.mjs:53`) already returns `gone` before
`identityCheck` is reached, and `gone` stays an operator decision.

The loose-name rule (`scripts/lib/hotel-region-audit.mjs:67`) — trust a loose
name match only when the address corroborates the index — loses its corroborator
on inconclusive terms. Source 2 substitutes: a loose match is trusted when either
source 1 or source 2 agrees with the index, and the existing
`loose-name-region-conflict` outcome applies when one of them disagrees.

## Persistence

`scripts/audit-hotel-regions.mjs:58` refuses to write raw Places content to
disk, `location` included. That guard stays exactly as it is, and
`resolvePricingRegion` is built for it: coordinates are fetched, resolved in
memory, and discarded. The checkpoint gains only derived values alongside the
existing `derivedRegion` and `matchedTerm`:

- `addressRegion` — source 1 result, or null when the term was inconclusive
- `locationRegion` — source 2 result, or null; `locationReview` carries the
  `reason` when it abstained
- `kmRegion` — source 3 result, or null
- `agreeingSources` — how many named `derivedRegion`
- `candidateRegions` — the regions the evidence named, when no two agreed
- `unresolvedReason` — `no-evidence`, `single-source`, or `conflict`

`COLUMNS` (`scripts/lib/hotel-region-audit.mjs:100`) renders the new fields so
the report shows which sources spoke.

`checked: true` keeps its meaning — written only for an `ok` row, from a current
successful fetch — and now additionally requires `agreeingSources >= 2`. Every
other bucket continues to lose `checked`; `--redo <bucket>` is unaffected.

No hashing work is needed. `auditRulesHash`
(`scripts/lib/hotel-audit-state.mjs:4`) already hashes the full bytes of both
`hotel-region-audit.mjs` and `hotel-region-matching.mjs`, so the term table,
`EASTERN_BANDS`, the identity ordering and the classifier are all covered
automatically, and the derived km ranges are correctly *not* covered — hashing
them would let one added hotel shift a range and invalidate every row in its
region. The corollary is an operational cost to plan for: because whole files
are hashed, this change invalidates all 1246 rows and the first run is a full
paid re-fetch.

## Guard test

`src/hotel-region-audit.test.js` keeps its existing `checked`/hash check and
gains one more, running with no API calls:

- every row marked `ok` records `agreeingSources >= 2` and a `derivedRegion`
  equal to the row's index region or price-equivalent to it

A km assertion was considered as a guard and rejected. The range is derived from
conclusive-source-1 rows, so every other row — ilçe-only matches, identity
failures, hotels legitimately at the edge of a region — sits outside it by
construction and would need an exemption entry. km outliers belong in the report,
ordered by € at risk, where a human reads them.

`UNAUDITED_HOTEL_SLUGS` keeps its shape and its one-line-reason discipline.

## Operator documentation

`.claude/skills/hotel-region-audit/SKILL.md` changes with this work. Its Residue
section currently reads `unresolved` as one thing — an address naming a belde
outside `ADDRESS_REGION_TERMS`, fixed by adding a term — which is now only one of
three `unresolvedReason` values, and its instruction is wrong for the other two.
Its `identity` section must also drop `type` and `status` as failure reasons.

## Expected effect

Predictions from the current report, to be replaced by the real numbers from the
first full pass:

- **Caner Mountain Hotel** → tekirova, **La Benata Hotel** → kizilagac and
  **Throne Nilbahir Resort & Spa** → kizilagac, +€20 per vehicle each, all three
  currently `ok`. Each should land `fix` rather than `unresolved`: the coordinate
  and the scoped km agree, which is two sources.
- **Alarcha Hotels Resort** (90 km, alanya_bati) is already residue for a
  loose-name conflict and stays residue; the scoped km agrees with that doubt.
- The other 73 inconclusive-term rows should confirm in place on sources 2 and 3.
  This is not a broad price rise.
- Of the 23 rows failing on type or status, those whose names also match become
  verified. How many that is cannot be predicted, because their names have never
  been compared.

## Out of scope

Verified rows do not expire — a checkpoint row carries no date, so a hotel that
rebrands or moves keeps its verdict until the rules change — and nothing
schedules the audit. Both are real gaps, neither caused the wrong prices found
here, and both belong to their own work.

Index coverage is out of scope. Orange County Resort Hotel Belek was mispriced
because it was absent from the index entirely, which no audit can detect; it was
added by hand and appears below only as a fixture.

Extending `EASTERN_BANDS` westward to bring Kaş and Kumluca inside source 2's
corridor is deliberately deferred: five hotels, all currently confirming on
sources 1 and 3.

`src/hotel-index.js:481-482` describes kizilagac as €60 while `src/routes.js`
prices it at €70. The comment is stale and sits in the block this work edits;
correcting it is a drive-by, not a design decision.

## Testing

Unit tests in `scripts/lib/hotel-region-matching.test.js` and
`scripts/lib/hotel-region-audit.test.js` cover:

- term conclusiveness derived from prices: `manavgat` and `kemer` inconclusive,
  `kas`, `kumluca` and every belde term conclusive; adding a second price region
  to an ilçe demotes its terms
- a `review: true` coordinate result does not count as an agreeing source
- km range membership yields a region only when exactly one range contains it,
  and ranges come from the checkpoint rather than the current run
- two agreeing sources on the index region give `ok`; two agreeing elsewhere give
  `fix`; one source alone never gives `ok`
- price-equivalent regions (`side` / `manavgat`) count as agreement between sources
- the dearest-candidate rule picks kizilagac over alanya_bati on the Sprinter
  tiebreaker, and each `unresolvedReason` is set correctly
- a `type` or `status` mismatch with a matching name yields a strict identity,
  while a `name` mismatch still fails
- `CLOSED_PERMANENTLY` still reaches `gone` without consulting identity

A fixture test replays three rows — `orange-county-resort-hotel-belek`
(bogazkent, the case that started this), `caner-mountain-hotel` (expected to move
to tekirova) and `la-benata-hotel` (expected to move to kizilagac) — through the
classifier with synthetic Places responses, asserting the bucket and derived
region each lands on, so this regression stays caught. The Boğazkent fixture is
written with a coordinate away from the band edge; whether the real hotel sits
inside `LONGITUDE_REVIEW_MARGIN` cannot be known without a live call, and the
design does not depend on it.

# Wischos U.I.S.C. product-line expansion — analysis notes

Generated: 15 August 2026 (Asia/Singapore)

## Decision

Select new metal-led products that expand the number of customer briefs Wischos can answer without duplicating the primary actions already covered by the 39 active SKUs.

## Authoritative internal sources

- Live `products` table, read on 15 August 2026 through `scripts/dump-specs.ts`: 39 active WP-series products.
- `src/content/giftSets.ts`: nine current gift sets, using 24 distinct active SKUs.
- `src/content/homepage.ts`: the U.I.S.C. definitions used as the selection standard.

## Current portfolio baseline

| Category | Active SKUs | Share |
|---|---:|---:|
| Writing Instruments | 8 | 20.5% |
| Desk Accessories | 13 | 33.3% |
| EDC Accessories | 10 | 25.6% |
| Drinkware | 8 | 20.5% |
| Total | 39 | 100% |

Desk Accessories plus EDC Accessories account for 23 of 39 products (59.0%). The nine gift sets use 24 distinct products, leaving 15 active products outside the current gift-set architecture.

## Scoring model

Each candidate receives 1–5 points on each U.I.S.C. dimension and market breadth:

- Useful: repeated friction reduction for a defined recipient.
- Interesting: a physical interaction or mechanism worth noticing.
- Substantial: honest metal construction and credible hand feel.
- Cohesive: a clear role beside at least two current SKUs in one recipient story.
- Market breadth: plausible use across Canada, Australia, New Zealand, with the UK and US as secondary validation.

The directional priority score is:

`Useful + Interesting + Substantial + Cohesive + Market breadth − overlap penalty − execution-risk penalty`

This score is a decision rubric, not a sales forecast. A candidate must also score at least 3 on every U.I.S.C. dimension. A high total cannot compensate for failing one of the four principles.

## Recommended candidate scores

| Product | U | I | S | C | Market | Overlap | Risk | Priority |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Weighted machined cable dock | 5 | 4 | 5 | 5 | 5 | 0 | 1 | 23 |
| Compact AAA aluminium flashlight | 5 | 4 | 4 | 5 | 5 | 0 | 1 | 22 |
| Privacy aluminium luggage tag | 5 | 3 | 4 | 5 | 5 | 0 | 1 | 21 |
| Folding metal bag and briefcase hook | 4 | 5 | 4 | 5 | 4 | 0 | 1 | 21 |
| Modular metal landing tray | 4 | 4 | 5 | 5 | 4 | 1 | 1 | 20 |
| Compact metal tape measure | 5 | 3 | 4 | 5 | 4 | 1 | 1 | 19 |
| Aluminium protective glasses case | 4 | 3 | 5 | 4 | 4 | 0 | 1 | 19 |
| Stainless pocket mirror with sliding sleeve | 4 | 3 | 4 | 4 | 4 | 0 | 1 | 18 |

## Market evidence and limits

- PPAI Product Power 2026 surveyed more than 5,000 US consumers. It reports that 65% are very likely to keep a branded product for at least six months, with durability, design and material among the main reasons; 38% say tech accessories make a brand appear modern and relevant. This is the strongest research source but is US-centric.
- Current Australian and New Zealand promotional catalogues carry metal luggage tags, foldable bag hooks, stainless pocket mirrors, aluminium flashlights, tape measures and cable accessories. This establishes that buyers can recognize and procure these product types; it does not establish sell-through.
- Candidate selection therefore uses the intersection of external catalogue presence, Wischos's U.I.S.C. fit, non-overlap with the live catalogue, and sourcing/compliance simplicity.

## Products deliberately held back

- USB-C cable kit: strong usefulness and market signal, but the cable is the hero and the metal content can become decorative; power claims and connector licensing add execution risk.
- Mechanical focus timer: attractive object, but the desk category is already deep and WP-206/WP-306 cover tactile desk interaction.
- Reusable coffee dripper: credible ritual product, but drinkware is already eight SKUs and it adds food-contact and cleaning-performance validation.
- NFC metal business card: interesting but overlaps WP-309's meeting role and creates encoding, redirect ownership and privacy-service dependencies.
- Laptop or phone stand, commuter mug and screwdriver kit: removed because they duplicate WP-208, WP-401/WP-403/WP-407/WP-408, and WP-104/WGS-004 respectively.

## Phase gates

Phase 1 should contain four products only: cable dock, flashlight, luggage tag and bag hook. Before any public listing, each product should pass sample inspection, logo-area review, MOQ-100 pricing and a defined set pairing. Flashlights should ship without lithium cells; use replaceable AAA cells or a customer-approved compliant battery program.

Phase 2 should add the landing tray, tape measure, glasses case and pocket mirror only after Phase 1 quotations show that the new categories can stay within Wischos's target set-price architecture.

## Reporting notes

- Chart map: `候选产品优先级` answers which of the eight passing candidates should be validated first. It is a sorted categorical `bar` chart using short product labels and `priority`, backed by the full shortlist dataset. A single-root palette is preferred; exact U.I.S.C. dimensions and deductions remain in the adjacent table because the total score must not hide a weak dimension.
- Market catalogue evidence is directional, not sales data.
- FOB ranges require factory RFQs and are intentionally omitted from the final recommendation until construction and finish specifications are fixed.

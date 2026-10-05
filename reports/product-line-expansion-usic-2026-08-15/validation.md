# Validation Report

## Overall Assessment: Share with caveats

The recommendation is directionally ready for sourcing decisions. The live catalogue baseline, category counts, candidate-score arithmetic and decision-row SQL were verified. It is not yet a purchase forecast because no factory RFQs, sample tests, customer interviews or historical conversion data were available.

## Methodology Review

- Question: which new metal-led products expand Wischos's offer while passing Useful, Interesting, Substantial and Cohesive and avoiding current-catalogue duplication.
- Population: 39 active products in the live `products` table on 15 August 2026, plus nine gift sets in `src/content/giftSets.ts`.
- Comparison: each candidate was checked against the primary action of every active SKU, not merely the category name.
- Priority formula: U + I + S + C + market breadth − overlap deduction − execution-risk deduction. Every U.I.S.C. dimension must be at least 3.

## Issues Found

1. **Medium:** External Canadian, Australian and New Zealand catalogue results establish category presence, not sales demand. This limits demand confidence but does not invalidate the portfolio-fit recommendation.
2. **Medium:** No RFQ or sample evidence exists yet. Material integrity, mechanism quality, MOQ-100 price and packaging volume may change the phase order.
3. **Low:** The installed Chromium reached the semantic fallback instead of the enhanced report reader. The final HTML passed canonical validation, payload equality and structural checks, but interactive source-dialog and viewport QA were not completed.

## Calculation Spot-Checks

- Active catalogue total: verified at 39.
- Category counts: verified live as Desk Accessories 13, EDC Accessories 10, Drinkware 8 and Writing Instruments 8.
- Concentration: 23 / 39 = 59.0% for Desk Accessories plus EDC Accessories.
- Gift-set component coverage: 24 distinct SKUs referenced; 15 of 39 active SKUs are outside current gift sets.
- Candidate scores: all eight totals independently recomputed from component scores and deductions; no discrepancies.
- U.I.S.C. gate: all eight recommended candidates score at least 3 on every U.I.S.C. dimension.
- SQL sources: category mix, candidate priority, family roadmap and gift-set pairing queries executed successfully against PostgreSQL.

## Visualization Review

The categorical bar-chart contract is appropriate for ranking eight candidates. Short labels and a numeric zero-based magnitude comparison are used. Because browser extraction did not reach the enhanced reader, the delivered HTML retains the complete semantic chart-data table as its verified fallback.

## Required Caveats for Stakeholders

- Scores are a consistent decision rubric, not predicted unit sales.
- Target-market catalogue presence must not be described as customer demand or sell-through.
- Phase 1 remains conditional on RFQs, samples, U.I.S.C. re-scoring and distributor concept testing.

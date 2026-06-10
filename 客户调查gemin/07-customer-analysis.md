# Customer Analysis

Use this reference to judge whether a lead is real, relevant, reachable, and worth initial outreach. First build `customer-intelligence-profile.md`; then use this file for fit scoring. After fit scoring, read `customer-value-assessment.md` to decide how much sales time the lead deserves.

## Website Analysis Checklist

Inspect the company website before contacting:

- Logo and brand: parent brand, sub-brand, private label, distributor brand, or marketplace brand. To detect parent/subsidiary relationships: search `"{company name}" -site:{domain}` to find mentions on other corporate sites; check if the site is one brand inside a larger group with separate purchasing authority.
- Navigation and categories: many unrelated categories often means general trader; focused matching categories usually means higher fit.
- About page: role, customer groups, history, markets served, distribution network, manufacturing/OEM claims.
- Products: matching product category, adjacent categories, specifications, certifications, packaging, brands.
- Catalogs: when not directly linked, use `site:{domain} filetype:pdf` or `site:{domain} catalog OR brochure` to find PDFs. Analyze for metal product coverage, material tier, and price band to infer the buyer's acceptable FOB range.
- Contact page: office, warehouse, branches, phone, generic email, contact form, named staff.
- Factory or sourcing claims: manufacturer, OEM, supplier, sourcing agent, importer, distributor, retailer.
- Social profiles: LinkedIn/Facebook/YouTube/Instagram activity and staff names.
- Evidence of import/distribution: dealer network, brands carried, private labels, wholesale terms, import records, certificates.
- Business model clues: catalog resale, decoration service, project sourcing, platform fulfillment, private label, inventory stock, or end-user procurement.

## Customer Role Taxonomy

Classify each lead:

- Retailer: sells to end users, usually small purchases, price sensitive, urgent restocking.
- Dealer: professional sales channel, focuses on category quality, brand, and local service.
- Distributor: manages regional channels, often price sensitive but can order repeat volume.
- Importer/trader: imports fixed product lines; volume may be large, price pressure high.
- Wholesaler: sells to local retailers or businesses; cares about margin and stable supply.
- Brand owner: sells under own brand; cares about quality, compliance, packaging, exclusivity.
- Manufacturer/OEM: may buy components, materials, accessories, or outsource lines.
- End user: buys for own use; may be valuable only for large industrial use or project orders.
- False positive: directory, marketplace, blog, unrelated company, competitor supplier, or buyer with no category fit.

## Buyer Tier Table (Wischos / Custom Metal Gift Context)

Use this to quickly classify a lead and set action level before scoring.

| Tier | Buyer type | Development strategy |
|---|---|---|
| **A — Primary** | Direct end buyer: HR / Marketing / Procurement at tech, finance, mining, legal, consulting firms | Highest priority; build full account file and custom outreach |
| **A — Primary** | Incentive and loyalty program companies (e.g., ITA Group, O.C. Tanner, Reward Gateway) | Highest priority; repeat-purchase stable once entered; locks in ongoing supply |
| **A — Primary** | Employee recognition SaaS platforms | Highest priority; entering as a platform SKU = automatic continuous reorder |
| **B — Selective** | Boutique gift distributors with no existing China metal supply chain | Select by scale; build account file |
| **B — Selective** | APAC gift platforms | Select by scale; build account file |
| **B — Selective** | Event management companies with fixed annual corporate events / summit VIP gifts | Select those with recurring annual events |
| **B — Selective** | Luxury real estate agencies (closing gifts; Australia / Singapore / UAE) | Decision-maker is often the agent directly; short chain |
| **C — Supplementary** | Local promo stores (Fully Promoted type) / gift hamper companies | Limited volume ceiling; treat as supplementary |
| **C — Supplementary** | B2B marketing agencies / university alumni associations / healthcare HCP | Project-dependent |
| **Exclude** | Large distributors with own China sourcing teams (e.g., Dynamic Gift, Cubic Promote) | Will negotiate price down and bypass; do not develop |
| **Exclude** | Local artisan / print-only / non-profit fundraising | Hard mismatch; do not build file |

Action rules:
- Tier A or B → proceed with full analysis and outreach.
- Tier C → evaluate case by case; limit time investment.
- Exclude → record in CRM notes only; no active effort.

## False-Positive Filters

Be careful when a lead only looks useful. Deprioritize if:

- It is not an importer/distributor/brand but a small local retailer with limited purchasing.
- It is a final user buying only occasional small quantities.
- It has a factory in China or is mainly a Chinese supplier.
- Its main imported product is unrelated to the user's product.
- The site is only a product page inside a marketplace.
- The company category is broad but the target product is missing from catalog and navigation.
- The website is abandoned, broken, or has no credible company identity.
- It explicitly positions itself as local-made, artisan-only, domestic-only, or immediate-turnaround-only when the user's offer cannot satisfy that promise.

## Fit And Priority Score

This score measures lead fit, not full commercial value. Use it to decide whether the company belongs in the pipeline. Use `customer-value-assessment.md` to decide whether to invest high-touch selling effort.

Score 0 to 100:

- Product fit (0-20): matching category, specs, certifications, use case.
- Buyer role fit (0-15): importer/distributor/wholesaler/brand/manufacturer alignment.
- Evidence strength (0-15): website, catalog, import clue, trade show, social profile, staff.
- Purchase potential (0-15): company size, channel depth, repeat purchase likelihood.
- Reachability (0-10): named contacts, direct emails, LinkedIn, phone, form.
- Market value (0-10): attractive country, price level, demand, strategic value.
- Supplier fit (0-10): MOQ, price, certification, packaging, capacity, delivery match.
- Risk adjustment (-15 to 0): compliance barrier, weak evidence, low relevance, high price pressure.

Priority:

- A: 75-100. Strong fit and evidence. Contact first with personalization.
- B: 55-74. Reasonable fit. Contact after A leads or with lighter personalization.
- C: 35-54. Weak or uncertain. Keep for later validation.
- D: 0-34. Reject or archive.

## Supplier And Competitor Analysis

When a customer asks for price or when judging competition, investigate the supplier environment:

- Search whether the customer already sources from China.
- Check import traces if accessible.
- Search B2B records for competing suppliers.
- Identify whether the customer is price-sensitive or quality/compliance-sensitive.
- Estimate whether the user can compete on price, product, packaging, certification, delivery, or service.

Useful queries:

```text
"{customer company}" "{product}"
"{customer company}" supplier
"{customer company}" vendor
"{customer company}" "vendor code"
"{customer company}" "vendor part"
"{customer company}" "supplier:"
"{customer company}" "{Chinese supplier name}"
```

## Customer Scorecard Output

```markdown
## Customer Scorecard
- Company:
- Website:
- Country:
- Customer profile summary:
- Supply-chain position:
- Business model:
- Role hypothesis:
- Product match:
- Evidence:
- Potential concerns:
- Fit score:
- Fit priority:
- Value score:
- Value tier:
- Star rating:
- Buying trigger:
- Supplier-switching hypothesis:
- Entry strategy:
- Recommended first message angle:
- Next action:
```

# Customer Value Assessment

Use this reference after basic customer analysis. The goal is to decide how much time, personalization, sample support, price flexibility, and management attention a customer deserves.

Do not confuse customer fit with customer value:

- Fit answers: "Is this company a relevant potential buyer?"
- Value answers: "If we win this customer, is it commercially worth the effort?"

## Evidence Rules

Base the value judgment on observable evidence:

- Company website, catalog, product range, branch network, dealer network, warehouse/service locations.
- Import records, supplier traces, shipment frequency, or visible China sourcing clues when available.
- Trade show participation, association membership, distributor/brand pages, case studies.
- E-commerce listings, retail price bands, SKU count, reviews, market coverage.
- LinkedIn staff count, buying-role contacts, management visibility, hiring/activity.
- Inquiry content: quantity, specs, destination, timeline, Incoterms, payment, sample request.

If evidence is missing, mark the item as `unknown` and reduce confidence instead of inventing order volume or value.

## Target Country Retail Price Research (calibrate profit quality and FOB feasibility)

Before scoring profit quality, check what similar products retail for in the customer's market. This reveals the buyer's likely margin expectations and acceptable FOB price range.

| Market | Query approach |
|--------|---------------|
| Australia | `amazon.com.au "corporate gift set metal"` / `myer.com.au "desk accessories"` |
| Canada | `amazon.ca "executive gift set"` / `chapters.indigo.ca "corporate gifts"` |
| UK | `amazon.co.uk "corporate desk gift set"` / `johnlewis.com "executive gifts"` |
| Singapore | `lazada.sg "corporate gifts metal"` / `shopee.sg "premium gift set"` |
| Germany | `amazon.de "Metallstift Geschenkset"` / `otto.de "Werbeartikel Metall"` |

**Inference rule:**
```
Local retail price ÷ 2.5 ≈ local wholesale/buying price
Wholesale price × 0.65 ≈ reasonable FOB import price
```
Example: AU retail AUD 120 (~USD 80) → buying price ~USD 32 → FOB range ~USD 20–26.
Compare against Wischos FOB $18–50/set to judge whether profit quality score is High / Medium / Low.

## Value Dimensions

Score 0 to 100:

- Annual purchase potential (0-20): likely order size, reorder frequency, SKU breadth, channel size, import evidence.
- Profit quality (0-15): acceptable price level, low price-only behavior, room for value-added packaging/certification/service.
- Strategic market value (0-15): opens a target country, industry, distributor network, reference account, or new category.
- Cooperation depth (0-15): potential for OEM/private label, exclusive styles, framework orders, joint development, multi-year repeat.
- Conversion accessibility (0-10): reachable decision maker, clear buying role, active sourcing signal, manageable switching path.
- Supplier capability fit (0-10): user's MOQ, certifications, capacity, lead time, packaging, QC, and documentation match the customer.
- Relationship efficiency (0-10): short decision chain, professional communication, realistic requirements, no excessive sample burden.
- Risk and cost adjustment (-15 to 0): payment risk, compliance burden, very high complaint risk, unrealistic target price, sample abuse, low trust.

## Value Tiers

- Tier 1 Strategic Account: 80-100. High value, strong evidence, worth high-touch research, tailored outreach, management review, and careful follow-up.
- Tier 2 Growth Account: 65-79. Good value, worth personalized outreach and active follow-up.
- Tier 3 Transactional Account: 45-64. Can generate orders but should be handled efficiently with standard materials and limited customization.
- Tier 4 Nurture Account: 30-44. Not ready or not proven. Keep in CRM, monitor, and contact lightly when there is a clear angle.
- Reject / Archive: 0-29. Low relevance, low value, or high risk. Do not spend time unless strategy changes.

## Fit-Value Matrix

Use both fit score and value score:

```markdown
| Fit | Value | Meaning | Action |
|---|---|---|---|
| High | High | Best target | High-touch development |
| High | Low | Relevant but small/low margin | Light-touch or transactional |
| Low | High | Strategic but poor current match | Research more, find adjacent angle, nurture |
| Low | Low | Weak target | Archive |
```

High fit normally means fit score >= 65. High value normally means value score >= 65.

## Account Type Labels

Use one account type per lead:

- Strategic distributor: can open a region/channel and repeat orders.
- Brand/OEM opportunity: needs private label, packaging, compliance, or product development.
- Volume importer: strong purchase potential but likely price-sensitive.
- Specialist dealer: focused category buyer, smaller volume but good technical fit.
- Transactional buyer: may buy quickly but low strategic value.
- Market intelligence lead: valuable for learning prices/specs/channels, not immediate sales.
- Nurture lead: good future potential but no current buying signal.
- Low-value distraction: consumes time without credible commercial return.

## Development Investment Level

Map the value tier to effort:

- High-touch: deep research, tailored message, decision-maker search, call attempt, sample/quote support, weekly follow-up.
- Active: personalized email sequence, LinkedIn/contact form backup, quotation support after qualification.
- Light-touch: one concise outreach plus one or two follow-ups; no heavy customization before reply.
- Nurture: save in CRM, monitor events, revisit later.
- Stop: archive, no outreach.

## Red Flags

Reduce value or stop when multiple red flags appear:

- Only asks for cheapest price with no spec, quantity, company identity, or target use.
- Requests many free samples without credible order path.
- Demands exclusivity before trust or volume exists.
- Wants long payment terms before any relationship.
- Has unrelated product range and no evidence of buying this category.
- Has many suppliers and only uses inquiries to benchmark price.
- Compliance requirement is beyond supplier capability.
- Communication is inconsistent, evasive, or suspicious.

## Value Assessment Output

```markdown
## Customer Value Assessment
- Company:
- Fit score:
- Value score:
- Value tier:
- Account type:
- Evidence confidence: High / Medium / Low
- Main value driver:
- Main risk:
- Recommended investment level:
- Commercial angle:
- Next action:
```

# Customer Intelligence Profile

Use this reference when analyzing a named customer, company website, contact person, or lead list. Build this profile before scoring fit/value or writing outreach.

The goal is to understand who the customer is, how they make money, where they sit in the supply chain, what has changed recently, and why the user's offer could matter to them.

## Evidence Standard

- Attach source links or source notes to important claims.
- Mark unknown items as `unknown`; do not invent revenue, staff count, supplier names, import volume, emails, or recent news.
- Separate confirmed facts from inference.
- Prefer official website, public company profiles, LinkedIn, catalog pages, press/news pages, social posts, trade-show pages, public business registries, and reputable third-party directories.

## Information Collection Points

Collect:

- Company legal/trading name.
- Website and country/region.
- Address, city, branches, warehouse, showroom, or service area.
- Main business categories and product/service lines.
- Contact page, phone, generic email, contact form, quote form.
- Named people: owner, founder, CEO, president, purchasing, sourcing, product, sales, operations.
- Public emails and where each email was found.
- Social links: LinkedIn company, LinkedIn people, Facebook, Instagram, YouTube, X/Twitter, TikTok, Pinterest if relevant.
- Catalogs, brochures, product PDFs, quote forms, online store, company store, or B2B platform profiles. When catalogs are not directly linked, use these search operators to find them:
  ```
  site:{domain} filetype:pdf
  site:{domain} catalog OR brochure OR "product guide"
  "{company name}" 2025 catalog filetype:pdf
  ```
  Analyze downloaded catalogs for: metal product coverage, material/quality tier, price band (infer buyer's acceptable FOB range), and category gaps that Wischos can fill.
- Customer groups served: industries, company sizes, geographies, end users, distributors, agencies, institutions.
- Proof of scale: staff count, branch count, years in business, client logos, case studies, reviews, event volume, catalog size.

## Recent Web And Social Signals

Look for activity from the last 6-18 months when possible:

- New products, new categories, or seasonal collections.
- Trade shows, exhibitions, conferences, sponsorships, community events.
- Recent blog posts, press releases, news articles, awards, announcements.
- Hiring posts that suggest growth, new roles, warehouse, sourcing, sales, or product expansion.
- Social media posts showing customer projects, large orders, new equipment, new clients, campaign themes.
- Website changes, new landing pages, new catalog pages, updated quote forms.
- Customer reviews that mention product quality, delay, price, customization, service, or sourcing pain.

If there is no recent activity, say so. Lack of activity can reduce confidence or suggest the company is small, inactive online, or relationship-driven offline.

Useful queries:

```text
"{company name}" news
"{company name}" press release
"{company name}" LinkedIn posts
"{company name}" Facebook
"{company name}" Instagram
"{company name}" trade show OR exhibition OR conference
"{company name}" hiring OR careers
site:{domain} blog OR news OR "case study" OR "portfolio"
site:{domain} "new" "{product/category}"
```

Turn recent signals into a buying-trigger hypothesis. Use `account-entry-strategy.md` when deciding whether a signal is strong enough to lead outreach or only belongs in background notes.

## Customer Profile Analysis

Summarize:

- Customer type: end buyer, retailer, distributor, promotional products dealer, importer, wholesaler, brand owner, manufacturer, platform, agency, decorator, sourcing company, or hybrid.
- Served market: local, regional, national, international.
- Served industries: e.g. schools, government, healthcare, beer/wine, construction, finance, tech, restaurants, universities.
- Buyer persona inside the company: owner-led, sales-led, procurement-led, category manager-led, founder-led, account-executive-led.
- Buying behavior: standard catalog reorder, custom project sourcing, tender/project orders, seasonal campaigns, inventory-based resale, dropship/platform fulfillment.
- Decision chain: likely short, medium, or long.
- First likely decision-maker and backup route.

## Supply-Chain Positioning

Identify where the company sits:

```markdown
Manufacturer -> Exporter -> Importer -> Distributor -> Dealer/Decorator -> End buyer -> Recipient
```

Possible labels:

- End buyer: buys for own staff, clients, events, or operations.
- Dealer/decorator: sells decorated products, screen printing, embroidery, engraving, local service.
- Distributor/reseller: maintains supplier catalog and sells to business customers.
- Importer/trader: imports products directly, may hold stock or run private labels.
- Brand owner: owns product/brand and outsources production.
- Platform/company store: runs online stores, reward portals, one-by-one fulfillment, or employee gifting platforms.
- Manufacturer/OEM: may buy components/materials or outsource adjacent lines.

**Customs data platforms (verify import activity):**
- importyeti.com — search company name → shipment history, product descriptions, supplier names
- customs.report — US customs public data, free
- volza.com — global 80+ countries, keyword + company search
- Use these to confirm: does this company actually import? What categories? How frequently? Who are their current suppliers?

**B2B platform footprint (active sourcing signals):**
```
alibaba.com + "{company name}"            → any RFQ or supplier contact records
made-in-china.com + "{company name}"      → same
"{company name}" "send me pricelist" OR "looking for supplier"
```
- Has B2B footprint → actively sourcing, higher receptiveness
- No footprint but other signals strong → may rely on fixed supplier chain, needs stronger entry angle
- Has metal-category B2B footprint → competitor supplier exists; research their tier and find upgrade angle

Analyze supplier implications:

- Does it likely buy locally, from North American distributors, from overseas factories, or a mix?
- Does it need fast domestic stock, custom overseas production, or both?
- Does the user's MOQ/lead time fit its buying model?
- Is the opportunity a standard supplier replacement, special project supplier, private label/OEM partner, or market intelligence lead?
- Is the user's role better framed as replacement supplier, backup supplier, category-expansion partner, blank/component partner, or custom-project partner?

## Business Model Analysis

State how the customer likely makes money:

- Product resale margin.
- Decoration/service margin: screen print, embroidery, laser engraving, packaging, kitting.
- Project management fee or account service margin.
- Platform/fulfillment fee.
- Inventory markup.
- Corporate program / company store management.
- Event or campaign bundles.
- Private label or exclusive product margin.

Then state what the customer likely values:

- Low landed cost.
- Fast turnaround.
- Reliable quality.
- Product novelty/differentiation.
- Packaging and presentation.
- Easy artwork/approval workflow.
- Low MOQ or sample support.
- Compliance documentation.
- Local service or dropship fulfillment.

## Procurement Likelihood

Judge whether the company is likely to buy from the user's type of supplier:

- High: already imports, sells custom sourced products, has premium/custom project pages, has supplier/vendor language, carries categories similar to the user's product.
- Medium: sells relevant products but appears catalog/local-distributor driven.
- Low: mostly sells local services, apparel decoration, retail, or small one-off orders.
- Unknown: evidence insufficient.

## Entry Angle

Choose one specific angle:

- Product gap: customer sells adjacent categories but lacks the user's product type.
- Premium upgrade: customer sells commodity versions; user can offer better material/packaging.
- Special project: customer needs custom, seasonal, event, or recognition kits.
- Private label/OEM: customer has a brand or repeatable product line.
- Distributor support: customer can resell the user's product to existing accounts.
- Market insight: customer is not immediate buyer but useful for learning category expectations.

## Output Template

```markdown
## Customer Intelligence Profile

### Basic Information
- Company:
- Website:
- Country/region:
- Address/service area:
- Contact page:
- Generic email/phone:
- Named contacts:

### Social And Web Presence
| Channel | URL | Evidence / Notes |
|---|---|---|

### Recent Signals
| Signal | Date/recency | Source | Why it matters |
|---|---|---|---|

### Customer Profile
- Customer type:
- Served industries:
- Geographic coverage:
- Decision chain:
- Buying behavior:

### Supply-Chain Position
- Position:
- Likely sourcing model:
- Supplier implications:
- Fit with user's MOQ/lead time:

### Business Model
- Revenue model:
- Margin drivers:
- What they likely value:

### Procurement Likelihood
- Likelihood: High / Medium / Low / Unknown
- Evidence:
- Constraints:

### Buying Trigger And Switching Hypothesis
- Trigger strength:
- Recent or structural trigger:
- Supplier-switching hypothesis:
- Switching blockers:

### Entry Angle
- Best angle:
- Product/service hook:
- Reason this customer may care:
- Open questions:
```

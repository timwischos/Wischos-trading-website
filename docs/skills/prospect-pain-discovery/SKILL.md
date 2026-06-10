---
name: prospect-pain-discovery
description: Systematic 30-minute pain point discovery workflow for B2B promotional product distributors and gifting agencies in AU/NZ/SG/UAE/HK/UK/CH/SA. Trigger when the user names a specific prospect company and asks "what's their pain" / "what should I lead with" / "how do I open this conversation" / "research [company name]" / "give me an angle for [company]" / "find a hook for [prospect]". Produces a standardised pain hypothesis and first-DM hook ready to plug into the wischos-email-voice Skill. Use AFTER the distributor-screening Skill has scored a prospect ≥ 5 (no point researching pain for a rejected prospect). Do NOT use for end-corporate buyers (HR, procurement at non-promo companies), warm inbound leads, or factories/competitors.
---

# Prospect Pain Discovery — Wischos Gift

A standardised 30-minute workflow for discovering what a specific promotional distributor needs help with — so first-touch outreach can lead with a relevant, specific hook instead of a generic "we have 8 sets" pitch.

## When to use this skill

Trigger when the user:
- Names a specific prospect company and asks for a research angle
- Asks "what should I lead with for [company]?"
- Asks "how should I open this conversation with [company]?"
- Asks for a "hook" or "angle" for cold outreach
- Has a list of priority prospects and needs to research each before approach

Do NOT use for:
- End-corporate buyers (banks, law firms, HR procurement) — different sales cycle
- Existing warm leads who already sent an enquiry — use email-voice Scenario B instead
- Direct enterprise gifting requests — no pain discovery needed, just quote
- Factories / competitors / non-distributor companies

## Pipeline position

This Skill is the middle stage of a 3-Skill pipeline:

```
distributor-screening (score ≥ 5)
        ↓
prospect-pain-discovery (THIS SKILL)
        ↓
wischos-email-voice (first DM with the hook)
```

Do not run this Skill before `distributor-screening` has confirmed the prospect is worth researching. The 30 minutes spent here are wasted on a wrong-fit company.

## Philosophy

Three rules govern this Skill:

1. **Observe more than infer.** Most "pain points" sales people invent are projections. This workflow forces you to cite a specific observable signal for every hypothesis.
2. **Confidence matters more than completeness.** A high-confidence hook on one observed signal beats a low-confidence hook stitched together from 5 weak signals.
3. **30 minutes is the cap.** If you can't find a hook in 30 min, the company is either (a) too quiet online, in which case approach with generic Scenario C, or (b) wrong-fit, in which case revisit screening.

---

## The 30-Minute Workflow

Run these 6 stages in order. Each is timeboxed to 5 minutes. Do not overrun any one stage.

### Stage 1 — LinkedIn post scan (5 min)

**Goal:** Find 1-2 specific posts from the Founder/Director in the last 6 months that hint at pain or aspiration.

**Steps:**
1. Open the company's LinkedIn page → People → click into the Founder / MD / Director (the one identified during screening)
2. Scroll their personal feed for posts in last 6 months
3. Look for one of these two patterns:

| Pattern | Signal | Examples |
|---|---|---|
| **Complaint-type** | Pain in process / supplier / industry | "Tired of suppliers who..." / "Why is it so hard to find..." / "Quality control is harder than people think..." / "Frustrating week chasing samples..." |
| **Aspiration-type** | Direction they're trying to grow | "Excited to launch..." / "We want to do more X" / "Looking for collaborators on..." / "Building toward..." |

**Output for this stage:**
- Quote: "[exact text or paraphrase]"
- Date: [post date]
- Pattern: complaint / aspiration
- Why it matters: 1 sentence

If no Founder/Director posts visible:
- Check company page posts (often less personal but still useful)
- If still nothing → mark stage as "low signal" and continue

---

### Stage 2 — Job postings scan (5 min)

**Goal:** Read current hiring as a window into team gaps.

**Steps:**
1. LinkedIn company page → Jobs tab
2. Alternative: google `"[company name]" hiring site:seek.com.au` (or country-specific job board)
3. Read each open role's title + 3-line responsibility summary

**Decoder table:**

| Open role | Pain interpretation | Wischos hook potential |
|---|---|---|
| Sourcing Manager / Procurement Officer | Currently bottlenecked on supplier research | ⭐⭐⭐ Direct fit — position Wischos as "ready supplier, no search needed" |
| QC Specialist / Quality Inspector | Past quality issues with current suppliers | ⭐⭐⭐ Lead with "封样 + bulk-against-sample" guarantee |
| New Business Development | Looking for differentiated products to pitch | ⭐⭐ Lead with "metal hero piece for VIP briefs" |
| Operations Manager | Scaling pains, internal flow chaos | ⭐⭐ Lead with "one-contact, end-to-end" model |
| Sustainability / ESG Lead | Sustainability is a new client demand | ⭐ Lead with metal durability + material certs |
| Senior Designer | Doing more custom work | ⭐⭐ Lead with bespoke metal capability |
| Account Manager (multiple roles) | Client load growing | ⭐ Tangential — note but don't lead with it |
| Warehouse / Logistics | Stock-heavy model expanding | ❌ Probably wrong-fit — verify against screening |

**Output for this stage:**
- Roles seen: [list]
- Strongest pain inference: [one role + interpretation]
- Hook strength: ⭐ / ⭐⭐ / ⭐⭐⭐

If no jobs visible: note "no current hiring visible" and continue — absence of signal is also information.

---

### Stage 3 — Website missing-pages audit (5 min)

**Goal:** Identify what should be on their website but isn't — gaps reveal capability holes.

**Steps:**
1. Open homepage
2. Open main navigation
3. Look for absence of these 5 page types:

| Missing page type | Pain interpretation | Hook potential |
|---|---|---|
| No "Custom" / "Bespoke" / "Tailored" page | They don't do real custom work — all catalog | ⭐⭐⭐ Position Wischos as their OEM custom partner |
| No "Case Studies" / "Recent Projects" | Either too new to have them OR don't want to highlight | ⭐ Use carefully — could be either |
| No metal-specific category in navigation | Metal is a gap in their offer | ⭐⭐⭐ Direct fit |
| No "Sustainability" / "Materials" / "Provenance" page | Clients have started asking but they can't answer | ⭐⭐ Lead with FTA Cert + material verification |
| No "Lead Time" / "How We Work" / "Sourcing" page | They can't predict their own lead times = supplier instability | ⭐⭐ Lead with verified 25-35 day production |

**Also check homepage for:**
- "Currently out of stock" or "back in 2 weeks" labels → supply chain issues
- "MOQ 500" on most products → working with bulk-only suppliers
- "Made to order" with no MOQ stated → they don't actually do custom
- Stock photos vs real product photos → quality of supplier relationships

**Output for this stage:**
- Missing pages observed: [list]
- Strongest gap: [which one + interpretation]
- Hook strength: ⭐ / ⭐⭐ / ⭐⭐⭐

---

### Stage 4 — Client logos & brief type inference (5 min)

**Goal:** Reverse-engineer what kinds of briefs they actually get, by looking at who their clients are.

**Steps:**
1. Look for "Clients" / "Trusted by" / "Brands we work with" section on homepage or About page
2. Identify 3-5 named clients
3. For each, google `"[client name] anniversary" / "campaign" / "launch" / "award"` (last 6 months)
4. Map the brief type:

| Client industry | Likely brief types they generate |
|---|---|
| Banking / Finance | VIP client gifts, year-end appreciation, milestone (10y/20y) recognition |
| Tech / SaaS | Onboarding kits, dev conference swag, customer success gifts |
| Mining / Construction | Field team utility, contractor appreciation, safety milestones |
| Real Estate | Closing gifts, broker recognition, open-home giveaways |
| Government / Council | Procurement-led tenders, ceremonial, citizen recognition |
| Healthcare / Pharma | Conference giveaways, employee wellness, compliance-aware (no food) |
| Universities / NGO | Donor recognition, alumni gifts, fundraiser sponsor gifts |
| Professional Services (Law / Consulting) | Partner gifts, year-end client appreciation, anniversary |

**Output for this stage:**
- Clients seen: [3-5 names]
- Inferred brief types: [list 2-3]
- Wischos SKU/set match: [which WGS- sets fit]
- Hook strength: ⭐ / ⭐⭐ / ⭐⭐⭐

If no client logos: skip this stage, note "no client signals available"

---

### Stage 5 — Reviews pain mining (5 min)

**Goal:** Read what their clients complain about — those complaints often trace back to supplier problems.

**Steps:**
1. Google: `"[company name]" reviews` or `site:google.com [company name] reviews`
2. Check Google Reviews, Trustpilot, productreview.com.au (AU), or industry-specific sites
3. **Focus only on 1-3 star reviews** (5-star reviews carry no information)
4. Look for these patterns:

| Repeated complaint | Pain interpretation | Wischos hook |
|---|---|---|
| "Took too long" / "Late delivery" | Supplier lead times unpredictable | "Verified 25-35 day production, locked at sample approval" |
| "Different from sample" / "Sample didn't match bulk" | No封样制度 with current supplier | "Final sample sign-off before bulk — every order" |
| "Plating peeled" / "Logo faded" / "Color faded" | Surface finish QC issues | "Salt-spray test on PVD/plating available on request" |
| "Customer service unresponsive" / "Hard to reach" | Their team is overloaded OR offshore CS layer | "Direct WeChat / email line, 24h response, no ticketing system" |
| "MOQ too high" | Supplier MOQ inflexibility | "MOQ 50-100 sets — true small-batch capability" |
| "Pushy sales" / "Felt rushed" | Internal sales pressure to close | (don't use — culture problem, not supplier problem) |
| "Got cheaper elsewhere" | Margin compression | (don't use — they want lower price, not what you offer) |

**Output for this stage:**
- Reviews found: [number, average star, time range]
- Pain patterns: [list 1-3]
- Hook strength: ⭐ / ⭐⭐ / ⭐⭐⭐

If no reviews: "no review signal" — common for smaller B2B, not a red flag.

---

### Stage 6 — Synthesis (5 min)

**Goal:** Convert observations into 1 pain hypothesis + 1 first-DM hook.

**Steps:**
1. Look at the 5 stages' outputs
2. Find the strongest signal (highest ⭐ rating)
3. Match to one of the 5 pain personas (next section)
4. Write a 3-sentence hypothesis
5. Generate a hook line for first DM

This is the output stage — see "Output Template" further down.

---

## The 5 Distributor Pain Personas

Most AU/NZ/SG/UAE mid-tier distributors fall into one of these 5 patterns. Match the prospect to the closest fit.

### Persona 1: "Big clients, weak wow-factor inventory"

**Signals that match:**
- Client logos include named corporates (Fortune 500 / ASX 100 / industry leaders)
- But catalog/website shows commodity drinkware, basic pens, T-shirts
- Posts about premium ambitions but no premium products visible

**Their pain:** Their best clients ask for "something special" and they have nothing to show.

**Wischos hook:** "Custom metal hero piece for executive / milestone briefs — fits between your catalog drinkware and a full custom development project."

---

### Persona 2: "Claims custom, but MOQ kills it"

**Signals that match:**
- Website says "bespoke / tailored / custom" prominently
- But product pages show MOQ 250+ / 500+
- Or they have a "Custom" page that's actually just "your logo on our SKU"

**Their pain:** Real custom requests come in but their suppliers can't do low-MOQ true bespoke. They have to refuse or upsell to MOQ they can't sell.

**Wischos hook:** "MOQ 50-100 sets — true small-batch metal customisation, not 'logo-on-stock'. Tooling fees apply for fully bespoke shapes."

---

### Persona 3: "Sample doesn't match bulk"

**Signals that match:**
- Google Reviews mention "different from sample"
- They have a heavy "QC" / "Quality" page (overcompensating)
- Or they hired a QC specialist recently
- Or they post about "factory visits" frequently (compensating for bad supplier control)

**Their pain:** They've been burned by suppliers shipping bulk that doesn't match approved samples. Each project carries that risk anxiety.

**Wischos hook:** "Final sample signed off before bulk — every order. Photo + dimension verification at line-off. Bulk-against-sample is the contract."

---

### Persona 4: "Stuck in low-margin price tier"

**Signals that match:**
- Catalog mostly USD 5-15 / piece equivalents
- Client logos suggest premium clients but products don't match
- Recent posts about "margin pressure" or "premium market"
- New BD hire to "open new client segments"

**Their pain:** They built their business at low margins. Now they want to move up-market but their supplier base doesn't carry up-market products.

**Wischos hook:** "USD 25-50 per-set tier with materials clients can feel — brass, titanium, anodised aluminium. Same MOQ as your current sets, double the perceived value."

---

### Persona 5: "Just landed a brief, no supplier matched yet"

**Signals that match:**
- Recent LinkedIn post: "Exciting upcoming campaign" / "Big project we'll share soon"
- New hire announcement for "BD" or "Strategic Account"
- They announced a new big-name client win in last 30 days
- Visible scramble in their posting cadence (uptick)

**Their pain:** They've won the work but don't have the supplier sorted. Time-sensitive.

**Wischos hook:** "Saw the [client win / campaign mention]. If any of it is metal-led, we're available for sample-stage briefing this week — capability sheet attached."

→ This is the highest-conversion persona but rarest signal. When you see it, **move fast** (within 48 hours of the post).

---

## Standard Output Template

Every pain discovery run produces this exact format. Consistency makes batch-runs comparable.

```
============================================================
PAIN DISCOVERY: [Company Name]
Date: [YYYY-MM-DD]
Decision-maker researched: [name + title]
============================================================

🔍 SIGNALS OBSERVED (5 min each stage)

  Stage 1 — LinkedIn posts:
    [1-2 specific posts/observations OR "low signal"]
  
  Stage 2 — Job postings:
    [roles seen OR "no current hiring visible"]
    Strongest pain inference: [role + interpretation OR none]
  
  Stage 3 — Website missing pages:
    [observed gaps OR "comprehensive site, no gaps"]
  
  Stage 4 — Client logos & briefs:
    Clients seen: [3-5 names OR "no client logos shown"]
    Inferred brief types: [list]
  
  Stage 5 — Reviews:
    [review findings OR "no review signal"]


🎯 PAIN HYPOTHESIS

  Persona match: [1-5: name]
  Confidence: [H / M / L]
  
  3-sentence hypothesis:
    [Sentence 1: what observable signal tells you their situation]
    [Sentence 2: what their actual pain probably is]
    [Sentence 3: why Wischos's offer fits this pain]


💬 SUGGESTED FIRST-DM HOOK

  [Plug into Scenario C template from wischos-email-voice Skill]
  
  Hook opening (1 line, specific reference):
    "Saw [specific observation from Stage 1-5]..."
  
  Fit line (1 line, Wischos value):
    "Where we'd be useful: [specific match to their pain]..."
  
  [Continue with standard Scenario C structure from email-voice Skill]


⚠️ RISKS / UNCERTAINTIES

  - [What could invalidate this hypothesis]
  - [What we'd need to confirm in their first reply]


📊 CONFIDENCE SCORE

  Overall: [H / M / L]
  
  Justification (1 line):
    [Why this confidence level — what evidence base supports it]
```

---

## First-DM Hook Formulas (by persona)

Plug-and-play opening lines for the first DM, calibrated to each persona. Always followed by Scenario C body from wischos-email-voice Skill.

### Persona 1 — Big clients, weak wow-factor

```
Hook: "Saw [Client Name X] in your client list — gifting at that 
       tier usually has a 'hero piece' need that catalog drinkware 
       can't fill."

Fit:  "Where we'd be useful: USD 25-50 per-set metal sets that 
       sit between your existing range and a fully custom build."
```

### Persona 2 — Claims custom, MOQ kills it

```
Hook: "Read your 'Custom' page — most overseas suppliers cap that 
       at 500+ MOQ, which often breaks small-team briefs."

Fit:  "Where we'd be useful: MOQ 50-100 sets for true small-batch 
       custom metal work, not stock-with-logo."
```

### Persona 3 — Sample doesn't match bulk

```
Hook: "Saw [QC hire / quality-focused post / review pattern] — 
       sample-to-bulk consistency is usually the QC headache."

Fit:  "Where we'd be useful: final sample signed off before bulk, 
       photo + dimension verification at line-off, every order."
```

### Persona 4 — Stuck in low-margin tier

```
Hook: "Your client list suggests room for a USD 25-50 per-set tier 
       that lives above your current range."

Fit:  "Where we'd be useful: same MOQ as your current sets, but 
       brass / titanium / anodised aluminium materials clients 
       can actually feel."
```

### Persona 5 — Just landed a brief

```
Hook: "Saw [client win / campaign post] — congratulations. If any 
       of that is metal-led, we're available for sample-stage 
       briefing this week."

Fit:  "Capability sheet attached if useful in the brief-setting 
       conversation."
```

### Default (low signal / mixed)

When you can't find a strong persona match, fall back to the generic Scenario C from wischos-email-voice Skill, **without** a specific hook. Better no hook than a wrong hook.

---

## Pre-Send Checklist

Before sending the first DM with a hook, verify:

```
□ Hook references a SPECIFIC observation (not generic flattery)
□ Hook is verifiable (the post / page / hire actually exists)
□ Hypothesis confidence is H or M (do not send L-confidence hooks)
□ Wischos fit is supported by actual SKU / capability (not aspirational)
□ Hook respects wischos-email-voice Skill rules (no push, no beg)
□ Total DM is ≤ 100 words
□ Capability Sheet attached
□ Sign-off matches voice ("Best regards, John" — no exclamation)
□ MOQ 100 economic check passed for any product mentioned in the hook
  (see wischos-email-voice Skill → "Product Claim Validation" section)
```

If any box fails → rework before sending.

**Critical:** The MOQ 100 check is non-negotiable. A hook that mentions a custom-shape die-cast piece or a new-mold drinkware item at implied MOQ 100 will damage the relationship when the quote walks back to MOQ 300/500. Always cross-reference the product claim against the MOQ baseline table in wischos-email-voice Skill before sending.

---

## Edge cases

### Q: The prospect has almost no online signal

Common for boutique / niche distributors who are quiet online.

→ Don't fake signal. Run Scenario C from email-voice without a hook. Note in Tracker "low signal — default opening used."

### Q: Multiple personas match equally

Pick the persona with the **strongest single signal**, not the one with the most signals. One strong observation beats five weak ones.

### Q: Founder posts a lot but it's all motivational fluff (no business signal)

Check the company page posts instead. If those are also empty of business signal, this is a "personal brand" Director — they'll engage on relationship, not on specific pain. Default to Scenario C with a personal touch ("Saw your post on [topic]" without a hard hook).

### Q: The prospect's website is excellent and reveals nothing missing

This is actually a green flag — they're a well-run operation. Treat as Persona 1 ("big clients, weak wow-factor") and lead with hero piece angle. Strong operations often hide hero-piece gaps.

### Q: Reviews are all 1-2 stars and damning

Verify the company is still operating (check LinkedIn last post date, employee count). If yes, this is either (a) recent operational meltdown — wait 60 days and revisit, or (b) niche dispute that's not representative — proceed but acknowledge their position is delicate. Adjust voice to be even more deferential.

### Q: You can't find the Founder/Director on LinkedIn

Re-run distributor-screening. A genuinely Argos-type prospect always has a visible decision-maker. If hidden → they're not Argos-type → reclassify.

---

## Anti-pattern checklist

❌ Don't:
- Invent a pain that has no observable signal
- Lead with "we noticed you might need..." (presumptuous)
- Quote a post older than 6 months (stale)
- Use a hook that requires Wischos to make a claim it can't back up
- Send the same hook to multiple companies (defeats the purpose)
- Spend > 30 min per prospect (diminishing returns)
- Run this Skill on a screening-failed prospect (waste)

✅ Do:
- Quote real observations with specifics (date, page, post)
- Match hooks to one of the 5 personas (or default to Scenario C)
- Cap research at 30 min and ship the DM
- Log the hook used in the Tracker so you can measure hook effectiveness
- Review hooks weekly — which converted, which didn't, refine personas

---

## Batch-mode operation

When researching 5-10 prospects at once (typical weekly outreach batch):

1. Run all stages 1-2 (LinkedIn + jobs) for ALL prospects first — these are the fastest
2. Then all stages 3-4 (website + clients) for ALL prospects
3. Then all stages 5 (reviews) for ALL prospects
4. Finally synthesize stage 6 outputs one at a time

This batching is faster than running 30 min per prospect end-to-end, because you stay in one "research mode" rather than switching contexts.

Total time for 10 prospects in batch mode: ~3-4 hours (vs 5 hours if done one-by-one).

---

## Integration with other Skills

| Skill | Relationship |
|---|---|
| `distributor-screening` | UPSTREAM — must score prospect ≥ 5 before this Skill runs |
| `wischos-email-voice` | DOWNSTREAM — provides the Scenario C template the hook plugs into |
| (Future) `lookalike-mining` | PARALLEL — finds new prospects to feed back into the screening Skill |
| (Future) `quote-cover-letter` | DOWNSTREAM — used when first DM converts to a quote request |

---

## Output format when applying this skill

Always produce the Standard Output Template (above). Do not vary the structure. Consistency is the value — comparison across prospects depends on it.

Keep findings concise; this Skill operates at SOHO scale and the user needs to read 5-10 outputs per week without fatigue.

---

## Revision history

| Date | Change |
|---|---|
| 2026-06-05 | v1.0 created — 6-stage workflow, 5 personas, hook formulas |

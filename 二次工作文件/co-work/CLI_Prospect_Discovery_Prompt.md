# CLI Prospect Discovery Prompt — Wischos Gift

**Version:** v2.0 (LinkedIn-enhanced)
**Created:** 2026-06-08
**Purpose:** Bulk prospect discovery via 42 targeted Google searches (LinkedIn + web), filtered against Wischos ICP, output to XLSX.
**Estimated runtime:** 30-45 minutes
**Expected output:** XLSX with ~10-20 new high-quality prospects (not in existing 38-list)

---

## How to use this file

### Option 1: Full run (recommended after first test)

In CLI, say:
> "按 `二次工作文件/co-work/CLI_Prospect_Discovery_Prompt.md` 跑 prospect discovery"

CLI reads this file and executes the full procedure.

### Option 2: Test run first (recommended for first use)

In CLI, say:
> "按 `二次工作文件/co-work/CLI_Prospect_Discovery_Prompt.md` 但只跑 BATCH 1 前 10 query 试水"

You'll see results in 5 minutes. Decide if quality justifies full run.

### Option 3: Custom variant

Copy sections of this prompt into your own custom instructions for CLI.

---

## CLI EXECUTION PROMPT (paste into CLI below)

```
TASK: Prospect Discovery v2.0 for Wischos Gift (LinkedIn + Web)

==============================================================
CONTEXT
==============================================================

You are helping John (Wischos Gift) find new B2B distributor 
prospects to add to his outbound pipeline.

Wischos Gift = China-based B2B sourcing partner for small-mid 
promotional product distributors. Niche: metal-only corporate 
gift sets (brass, titanium, stainless, aluminium). MOQ 50-100. 
Primary markets: AU, NZ, SG, UAE.

==============================================================
STEP 0: Read Reference Skills First
==============================================================

Read these in order:

1. docs/skills/distributor-screening/SKILL.md
   → for Tier 0 keyword scan + ICP definition
   
2. docs/skills/distributor-screening/Argos-Type-Customer-Persona.md
   → for Argos-Likeness scoring criteria

3. 二次工作文件/co-work/Wischos_Prospect_List_2026-05-31.md
   → existing 38 prospects (to deduplicate against)

==============================================================
STEP 1: Run WebSearch Queries (Batch in 4 groups)
==============================================================

Run the queries in batches of 10-13 (rest 30s between batches 
to avoid rate limit). Collect top 10 results per query.

BATCH 1 — LinkedIn Company Pages (13 queries):

site:au.linkedin.com/company "promotional products"
site:au.linkedin.com/company "corporate gifts" Sydney OR Melbourne
site:au.linkedin.com/company "branded merchandise"
site:au.linkedin.com/company "corporate gifting" Brisbane OR Perth
site:nz.linkedin.com/company "promotional products"
site:nz.linkedin.com/company "corporate gifts" Auckland OR Wellington
site:nz.linkedin.com/company "branded merchandise" sustainable OR Toitu
site:sg.linkedin.com/company "corporate gifts"
site:sg.linkedin.com/company "branded merchandise"
site:sg.linkedin.com/company "premium gifts"
site:linkedin.com/company "corporate gifts" Dubai
site:linkedin.com/company "branded merchandise" UAE
site:linkedin.com/company "promotional products" Abu Dhabi OR Dubai

BATCH 2 — LinkedIn Decision-Makers (11 queries):

site:au.linkedin.com/in "Managing Director" "promotional products"
site:au.linkedin.com/in "Founder" "corporate gifts"
site:au.linkedin.com/in "Director" "branded merchandise"
site:au.linkedin.com/in "Owner" "corporate gifting"
site:nz.linkedin.com/in "Managing Director" "promotional products"
site:nz.linkedin.com/in "Founder" "corporate gifts"
site:nz.linkedin.com/in "Director" "branded merchandise"
site:sg.linkedin.com/in "Founder" "corporate gifts"
site:sg.linkedin.com/in "Director" "branded merchandise"
site:linkedin.com/in "Founder" "corporate gifts" Dubai
site:linkedin.com/in "Managing Director" "branded merchandise" UAE

BATCH 3 — Company Websites (11 queries):

site:.com.au "promotional products" "managing director" -alibaba
site:.com.au "corporate gifts" founder boutique premium
site:.com.au "branded merchandise" curated -wholesale
site:.com.au "sourced overseas" OR "imported" corporate gifts
site:.co.nz "promotional products" director boutique
site:.co.nz "corporate gifts" "founder" premium OR sustainable
site:.co.nz "global sourcing" OR "offshore" gift OR merchandise
site:.sg "corporate gifts" "founder" OR "director" premium
site:.com.sg "branded merchandise" curated owner-led
site:.ae "corporate gifts" premium boutique
site:.ae "branded merchandise" "founder" OR "director"

BATCH 4 — Lookalike + Certifications (7 queries):

related:argospromotionalproducts.co.nz
related:bluesharkmerchandising.com.au
"Toitu" certified "promotional" OR "corporate gifts"
"B Corp" "branded merchandise" Australia OR "New Zealand"
"APPA member" boutique OR premium owner-led
related:thepromolab.co.nz
related:thepromolab.com.au

==============================================================
STEP 2: Extract & Deduplicate
==============================================================

For each search result, extract:
{
  company_name: string,
  url: string,
  type: "linkedin_company" | "linkedin_person" | "website" | "other",
  country: "AU" | "NZ" | "SG" | "UAE" | "other",
  snippet: string,
  source_queries: list of query indices that returned this result
}

Deduplicate by URL. If a person LinkedIn profile and their 
company appear separately, group them together by inferring 
company from person profile.

==============================================================
STEP 3: Filter Non-Prospects (Drop Immediately)
==============================================================

Drop these:
- Articles, blogs, listicles, "top 10 lists"
- Chinese supplier pages (alibaba.com, made-in-china.com, etc.)
- ZoomInfo / Datanyze / 3rd-party data company pages
- US-only operations
- B2C gift hampers (food / wine / chocolate / flowers focus)
- "Catalog reseller" signal: claims "10000+ products" or 
  "factory direct"
- Job posting pages
- Dictionary / wiki pages
- Existing entries in 38-list (mark as "Already Known", do 
  not drop — include in output for completeness)

==============================================================
STEP 4: Tier 0 Keyword Scan
==============================================================

For each surviving prospect, run Tier 0 keyword scan from 
distributor-screening Skill. Mark:
- Pass: no Tier 0 hard-kill keywords
- Maybe: 1 weak signal
- Drop: 2+ hard-kill keywords

==============================================================
STEP 5: Argos-Likeness Preliminary Score
==============================================================

For Tier 0 survivors, assign preliminary Argos-Likeness score 
(0-10) based on search snippet signals:

+2 if: owner / founder / director title visible
+2 if: small team or boutique signal in snippet
+2 if: premium / curated / bespoke language
+1 if: sustainable / niche positioning
+1 if: located in Wischos primary markets (AU / NZ / SG / UAE)
+1 if: B2B / corporate clients mentioned
+1 if: founded 5+ years ago

Mark all scores as "PRELIMINARY (snippet-only)" since full 
verification requires deeper research per the Skill funnel.

==============================================================
STEP 6: Output XLSX
==============================================================

Save to: 二次工作文件/co-work/Wischos_Prospect_Discovery_[YYYY-MM-DD].xlsx

Sheet 1: "All Findings"
Columns: 
| Rank | Company | URL | Country | Type | Snippet | 
| Tier 0 Status | Argos Score | In 38-list? | Source Queries | 
| Recommended Action | Hook Hypothesis |

Sheet 2: "Top 20 New Finds" (filter: not in 38-list, 
sort by Argos Score desc)
Same columns, only top 20 new candidates

Sheet 3: "Query Performance" 
Columns: | Query # | Query | Results Returned | New Finds | 
| Pass Rate |

Sheet 4: "Geographic Distribution"
Count of finds per country, broken down by Tier 0 status

==============================================================
STEP 7: Return Summary
==============================================================

After XLSX saved, report:

1. Total raw results: [number]
2. Unique companies after dedup: [number]
3. Surviving Tier 0: [number]
4. New finds (not in 38-list): [number]
5. Top 10 highest-scoring new finds with one-line reason each
6. Geographic distribution
7. Patterns observed (e.g., "AU finds dominant, UAE 
   underrepresented")
8. Recommended next steps:
   - Which 5-8 to approach first
   - Any verification needed before approach
   - Best query patterns to repeat in future runs
   - Worst query patterns to retire

==============================================================
CONSTRAINTS
==============================================================

- Be HONEST about preliminary nature of scores (snippet-only data)
- Mark anything that needs human verification clearly
- Don't fabricate snippets if WebSearch returns sparse data
- If a query returns 0 useful results, log it (helps tune 
  future queries)
- Stay within Wischos's voice: no "amazing leads" hyperbole, 
  just data
- Total runtime should be under 60 minutes
- If WebSearch rate-limits, wait 60s and retry; if persistent 
  failure, save partial progress and report what was completed
```

---

## What to Expect

### Realistic numbers

| Metric | Expected |
|---|---|
| Total WebSearch calls | 42 |
| Raw results returned | ~350-400 |
| Unique companies after dedup | ~150-220 |
| Surviving non-prospect filter | ~80-120 |
| Surviving Tier 0 keyword scan | ~40-60 |
| New finds (not in 38-list) | ~10-20 |
| High-quality (Argos Score ≥ 6) new finds | **~8-15** |

### Quality caveats

1. **Snippet-only data** — Argos-Likeness scores are preliminary. Full verification still requires manual deep dive per the screening Skill.

2. **LinkedIn snippet limits** — LinkedIn returns minimal preview text via Google. You'll see names + titles + companies but not full About pages. Plan to click through.

3. **Some queries return 0 useful results** — `related:` queries are unreliable. Industry certification queries (`Toitu`, `B Corp`) often return certificate body pages, not member companies.

4. **Geographic skew** — AU usually has the most indexed results, UAE the least. Don't over-interpret AU dominance as "best market" — it's index bias.

---

## How to use the output XLSX

### Workflow after CLI run

```
1. Open Sheet 2 ("Top 20 New Finds")
   → This is the immediate action list

2. For each Top 10 candidate:
   → Click the URL → verify the company is real and current
   → Check LinkedIn for decision-maker
   → Score their Argos-Likeness manually (full criteria)

3. Pick 5-8 to approach this/next week
   → Run distributor-screening Skill Tier 1-3 on each
   → Verified survivors → send LinkedIn connection request

4. Update Sheet 1 with manual scores and approach status
   → This becomes your tracking record

5. Review Sheet 3 ("Query Performance")
   → Note which query patterns produced highest-quality finds
   → Reuse winning patterns in next discovery run
   → Retire patterns with 0 finds
```

### When to re-run discovery

| Trigger | When |
|---|---|
| First 5-8 approached prospects responded / didn't | After 3-4 weeks |
| Tom / Andrew progressed to a deal | After 2-3 weeks (energy permitting) |
| Existing approach pool exhausted | When new finds < 3 remaining unpursued |
| Quarter-based cadence | Every 3 months minimum |

### When NOT to re-run

- Within 2 weeks of last run (same results, wasted compute)
- Before exhausting current new finds (don't pile up unused prospects)
- When you have > 5 active conversations (focus on closing first)

---

## Revision History

| Date | Version | Change |
|---|---|---|
| 2026-06-08 | v2.0 | Initial creation with LinkedIn enhancement (42 queries) |

---

## Related Files

| File | Purpose |
|---|---|
| `docs/skills/distributor-screening/SKILL.md` | Tier 0-3 funnel for screening |
| `docs/skills/distributor-screening/Argos-Type-Customer-Persona.md` | ICP definition |
| `docs/skills/prospect-pain-discovery/SKILL.md` | Used after prospect identified, before first DM |
| `docs/skills/wischos-email-voice/SKILL.md` | Voice for first contact |
| `二次工作文件/co-work/Wischos_Prospect_List_2026-05-31.md` | Existing 38-list (dedup source) |
| `二次工作文件/co-work/Wischos_LinkedIn_Search_Tracker.csv` | (Future) Manual LinkedIn search log |

---

## Notes for John

- **First time running this?** Use Option 2 (test run with BATCH 1 first). Build trust before committing to full 45-min run.
- **Want to customize for a specific country?** Edit the BATCH sections — remove queries from countries you don't care about right now.
- **Concerned about CLI cost?** This whole run uses ~42 WebSearch calls and ~5-10 read/write file ops. Modest.
- **Worried about result quality?** Review Sheet 3 after first run — the data will tell you which queries to keep / drop for next time. The procedure self-improves.

---

End of CLI Prospect Discovery Prompt v2.0

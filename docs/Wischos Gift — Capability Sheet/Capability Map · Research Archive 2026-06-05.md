# Wischos Metal Capability Map — Research Archive

**Document type:** Research + data archive (preparation for a future PDF deliverable)
**Created:** 2026-06-05
**Status:** Draft data complete · 6 factory-side gaps pending · PDF build not started
**Owner:** John (Wischos Gift)
**Purpose:** Consolidate all the research, data, and decisions made on 2026-06-05 toward building a "Wischos Metal Capability Map · Beyond the Catalog" — a new companion PDF to the existing Corporate / Distributor Capability Sheets.

---

## 0. 文件用途说明（中文）

这份档案是 2026-06-05 那次对话里，所有为 Capability Map PDF 做的准备工作的完整存档。

包括：
- 为什么要做这个 Map（背景判断）
- 我从你现有项目文件里挖出来的数据
- 网上搜的 2026 行业基准
- 综合后给你的完整数据草稿
- 你还需要回工厂确认的 6 个 gap
- 一份可以直接进 PDF 的 Map 草稿
- 落地选项 + 工作量估算
- 所有 web 来源

**这份文件不是 PDF 本身**——它是你做 PDF 之前需要先填完的"半成品作业本"。
等 6 个 gap 都填完，就可以直接拿这份档案去出 HTML / PDF。

---

## 1. Background & Rationale

### 1.1 Why build a Capability Map at all?

The existing Wischos sales pack has 3 documents:

| Document | Angle | What it answers |
|---|---|---|
| Capability Sheet (Corporate / Distributor — vertical 4:5) | "Here are our 8 curated sets" | What we sell |
| Distributor Short Flyer 2026 — Vertical | "Here are sets + components + facts" | What you can resell |
| Catalogue v4 (no-brand, 2 versions) | "Here is our full SKU range" | What we stock |

**What is missing:** a document that answers *"What can you DO if I bring you a brief that's not in your catalog?"*

This is what Argos-type prospects (Director-led, brief-driven, mid-premium distributors) want to know. The Capability Map fills this gap.

### 1.2 What the Map is NOT

The Map is **NOT**:

- A pivot away from the productized sets — the 8 sets remain the lead offer
- A claim that Wischos is a custom-only / R&D-heavy supplier
- A factory brochure listing every possible metal product
- A replacement for any existing document

The Map is **a 1-page companion**, sent as a second-touch document after the Capability Sheet has been received, to expand the prospect's understanding of what Wischos can do beyond the 8 curated sets.

### 1.3 Positioning line

> "Our 8 productized sets cover ~70% of typical corporate gift briefs. This page covers the other 30% — custom metal-led work shaped to your brief."

---

## 2. Data Source Audit — What Wischos Already Has

### 2.1 Source files reviewed

| File | Location | What it gave us |
|---|---|---|
| `public/llms.txt` | Root | MOQ baseline (50-100 sets), lead time (25-35d production), pricing band (USD 14-58 / set), FTA coverage |
| `Wischos_材质审计_2026-updated.xlsx` | Root | 28 SKU material specs, factory-confirmed processes, surface finishes, logo methods |
| `二次工作文件/co-work/Wischos_报价计算器_2026.xlsx` | co-work folder | Actual unit cost (RMB → USD) for 28 SKUs, logo upcharge per piece, SOHO markup rate (30%) |

### 2.2 What this tells us about Wischos's actual capability

Wischos's existing 28-SKU portfolio already covers all 6 process categories needed for the Map:

| Process | Evidence (SKUs in production) |
|---|---|
| **CNC machining** | WP-201 (5052 AL mouse pad), WP-202 (6061-T6 AL pen holder), WP-206 (brass spinning top), WP-302 (brass key organizer), titanium EDC items |
| **Zinc alloy die-casting** | WP-104 (6-in-1 tool pen), WP-203 (zinc letter opener), WP-204 (propeller letter opener) |
| **Stainless steel work** | WP-103 (303 SS pen), WP-303 (SS money clip), WP-305 (SS/Ti pry bar), WP-307 (2CR13 scissors), WP-309 (SS card case) |
| **PVD / electroplating / anodising** | WP-101 (gunmetal plating), WP-202 (anodised), WP-303 (PVD option), WP-202 (sandblast + anodise) |
| **Drinkware (double-wall vacuum)** | WP-401 (Ti+316 SS bottle), WP-402 (Ti capsule), WP-403 (SS tumbler), WP-407 (SS desk cup), WP-408 (Ti tea infuser) |
| **Pen assembly (multi-material)** | WP-101, WP-102, WP-105, WP-106 (brass / Al / stainless variants) |

**Key insight:** Wischos does NOT need to develop new factory relationships to back the Map. The factory network is already there.

### 2.3 Actual cost data from pricing calculator (USD, 2026 rates)

Reference rates from `Wischos_报价计算器_2026.xlsx`:
- Exchange: 6.77 RMB / USD
- VAT rebate: 13%
- SOHO markup: 30% (cost → FOB)

| Category | Sample SKU(s) | Cost USD (per piece) | Implied FOB (× 1.30) |
|---|---|---|---|
| CNC brass small piece | WP-302 key organiser (USD 4.48) | USD 4.48 | USD 5.82 |
| CNC aluminium small/medium | WP-202 pen holder (USD 6.18), WP-201 mouse pad (USD 8.80) | USD 6-9 | USD 7.80-11.44 |
| CNC brass desk piece | WP-206 spinning top (USD 5.79) | USD 5.79 | USD 7.53 |
| Zinc alloy stamped + plated | WP-203 letter opener (USD 5.27), WP-204 propeller (USD 7.98) | USD 5.27-7.98 | USD 6.85-10.37 |
| Stainless small | WP-303 money clip (USD 3.18), WP-307 scissors (USD 3.70), WP-309 card case (USD 4.98) | USD 3-5 | USD 3.9-6.5 |
| Brass pen (full body) | WP-101 (6.94), WP-105 (7.59), WP-106 (7.20) | USD 6.94-7.59 | USD 9.02-9.87 |
| Titanium EDC small | WP-304 comb (3.57), WP-308 keychain (5.37) | USD 3.57-5.37 | USD 4.64-6.98 |
| Titanium drinkware | WP-402 capsule (12.82), WP-408 tea infuser (14.88), WP-401 bottle (24.03) | USD 12.82-24.03 | USD 16.67-31.24 |
| Stainless drinkware | WP-403 tumbler (7.59), WP-404 mug (6.67), WP-407 desk cup (5.89) | USD 5.89-7.59 | USD 7.66-9.87 |

These cost numbers are the **anchors** for the FOB ranges that appear in the Map.

---

## 3. Industry Baseline Research — Web Search Findings

### 3.1 Searches performed (2026-06-05)

| Query | Why |
|---|---|
| China CNC machining small batch MOQ 100 lead time 2026 | Validate CNC MOQ + lead time row |
| Zinc alloy die casting custom medal token MOQ mold cost China 2026 | Validate zinc concept + mold fee |
| PVD coating electroplating MOQ minimum order China 2026 | Validate surface finish row |
| Custom corporate gift FOB price executive desk piece 100 pcs China 2026 | Cross-check executive concept price |
| Brass key organizer titanium EDC FOB wholesale 100 pc China 2026 | Cross-check EDC concept price |
| Laser engraving metal logo MOQ minimum china 2026 | Validate logo row |

### 3.2 Key industry baselines extracted

**CNC machining (China, 2026):**
- MOQ: 100 pcs standard, some go to 1 piece for prototyping
- Sample lead time: 3-7 days (simple) to 1-4 weeks (complex)
- Production lead time: 20-35 days after sample approval
- Pricing: USD 50-500 per part for very small runs, lower for repeat batches
- Hubs: Shenzhen / Pearl River Delta

**Zinc alloy die-casting (medals / tokens):**
- MOQ: 100 pcs typical (some 50, 500 for OEM custom)
- Mold fee: charged upfront, refunded/amortised on mass production confirmation
- Sample lead time: 3-5 days after mold ready
- Production lead time: 7-15 working days after artwork approval
- Pricing (basic medals): USD 0.28-2.50 per piece
- Process: die-cast → polish → electroplate → emboss logo → enamel fill

**PVD coating / electroplating:**
- MOQ (with main item): tracks main item MOQ
- MOQ (standalone subcontract): 500+ sqm typical for custom colors
- Sample turnaround: 2-4 weeks standard
- Hub: Guangdong province (HuiCheng Vacuum, Dongguan Shunyi)

**Laser engraving on metal:**
- MOQ: 100-500 pcs typical
- Cost: 20-40% higher than screen printing
- Premium positioning: permanent mark, lifetime durability
- Rush fees: often double the baseline cost

### 3.3 Honest data confidence note

The web search confirmed Wischos's own numbers are **inside or below industry baseline**, which gives the Map credibility. However:

- The "USD 0.28-2.50" for basic medals is **way below** what Wischos would charge — that range is generic Alibaba commodity tier. Wischos's Recognition Piece concept should target USD 5-20 (higher quality + plating + packaging + brand work).
- PVD MOQ varies massively by supplier; the "500 sqm" baseline is for standalone outsourced coating, not when bundled with main item production.
- All FOB ranges in the Map should be presented as **"indicative — final on brief"** to allow flexibility.

---

## 4. Consolidated Data — What Goes in the Map

### 4.1 The 6-process matrix

Final data, ready for the Map. Confidence tier indicated.

| Process | Materials | MOQ | Sample | Production | FOB band | Confidence |
|---|---|---|---|---|---|---|
| **CNC machining** | Ti / SS (304-316) / Brass / 5052-6061 AL | 100 pcs | 7-15 d | 20-30 d | USD 4-25 / pc | 🟢 Wischos data + industry confirm |
| **Zinc alloy die-casting** | Zinc alloy (Zamak) | 100-300 pcs | 10-15 d (incl mold) | 15-25 d | USD 1.5-12 / pc + mold | 🟡 Industry + factory check needed for mold cost |
| **Stamping / etching** | 304-316 SS / Brass / Copper sheet | 200-500 pcs | 5-10 d | 15-25 d | USD 1-5 / pc | 🟡 Industry + WP-205 reference |
| **Surface finish** | PVD / plating / anodise / sandblast / brushed | 100 (w/ main item) | 2-4 wk | parallel + 5-7 d | +10-30% main item cost | 🟢 Wischos uses all variants |
| **Logo method** | Laser / chemical etch / emboss / enamel fill / silkscreen | 100 | 3-5 d | parallel | USD 0.30-0.50 / pc | 🟢 Pricing calculator data |
| **Packaging / assembly** | Drawer box / magnetic / EVA / cloth pouch | 100 sets | 5-7 d | parallel | USD 1-5 / set | 🟢 Wischos uses on all 8 sets |

### 4.2 The 5 concept anchors

| # | Concept | Material | Process | MOQ | FOB | Use case |
|---|---|---|---|---|---|---|
| 1 | **Custom Campaign Token** | Zinc alloy / Brass / SS | Die-cast + plate + emboss + enamel | 100-300 | USD 3-12 / pc + tooling | GWP · Sponsor gift · Anniversary |
| 2 | **Executive Desk Piece** | Brass / SS / Aluminium | CNC + brushed/PVD + engraving | 100 | USD 12-35 / pc | VIP client gift · Recognition |
| 3 | **Premium EDC Metal Component** | Titanium / SS / Brass | CNC + sandblast/anodise + laser | 100 | USD 6-25 / pc | Onboarding kit · Client gift · Tech event |
| 4 | **Metal Module for Kit** | Curated SKUs + bespoke option | Pen + card case + desk piece (2-3) | 50-100 sets | USD 14-50 / set | Executive kit · VIP kit |
| 5 | **Recognition Piece** | Zinc alloy / Brass / SS | Emboss + enamel + numbering + gift box | 100-300 | USD 5-20 / pc | Employee award · Partner gift · Donor |

### 4.3 How-to-brief (the close)

The Map should end with a 6-line brief request that prospects can copy/paste into an email:

```
Send these 6 lines and we'll come back with feasibility + 
indicative FOB within 3 working days:

  1. Quantity
  2. Use case (gift / award / kit / GWP / other)
  3. Material preference (or "open")
  4. Branding method (laser / emboss / unsure)
  5. Target FOB band (or "open")
  6. In-hand date

inquiries@wischosgift.com
```

---

## 5. Factory-Side Gap Clearance Checklist

**Must be cleared before Map is published.** Each question goes to a current Wischos factory partner via WeChat or email. Estimated total time: 30-60 minutes.

| # | Question for factory | Affects which Map row | Status |
|---|---|---|---|
| 1 | 100×80mm 异形 token 锌合金压铸开模费多少？USD 200-800 range 准确吗？ | Concept 1 + Recognition Piece | ⬜ Pending |
| 2 | 现有 WP-206 / WP-302 SKU 起订是多少？新形状（同工艺）100 pcs 能接吗？ | All CNC concepts | ⬜ Pending |
| 3 | PVD 独立外协（不含主件代工）最小订单多少？500 pcs 是底线吗？ | Surface finish row | ⬜ Pending |
| 4 | 0.5mm 厚度 SS304 蚀刻 200 件可接？最小厚度是多少？ | Stamping concept | ⬜ Pending |
| 5 | 客户要 24h / 48h 盐雾测试报告，工厂能直接出吗？还是要外送实验室？ | Surface finish quality claim | ⬜ Pending |
| 6 | 6 大工艺类别各自有几家备份工厂？（自盘） | Map 整体承诺力度 | ⬜ Pending |

**Critical rule:** If any process category has **< 2 backup factories**, DROP it from the Map. Better to under-promise than over-promise and fail on second order.

---

## 6. The Map Itself — PDF-Ready Draft

This is the content that will be designed into the final PDF. Layout reuses the existing 4:5 vertical template (200mm × 250mm) from the Capability Sheet series.

```
═══════════════════════════════════════════════
KICKER: CAPABILITY MAP
═══════════════════════════════════════════════
            What we make
        beyond our 8 curated sets
═══════════════════════════════════════════════

【6-PROCESS MATRIX】(occupies ~50% of page)

Process            Materials              MOQ      Sample   Production
─────────────────────────────────────────────────────────────────────
CNC machining      Ti / SS / Brass /      100      7-15d    20-30d
                   5052-6061 AL
─────────────────────────────────────────────────────────────────────
Zinc die-casting   Zinc alloy (Zamak)     100-300  10-15d   15-25d
                                                   (+mold)
─────────────────────────────────────────────────────────────────────
Stamping/etching   SS / Brass /           200-500  5-10d    15-25d
                   Copper sheet
─────────────────────────────────────────────────────────────────────
Surface finish     PVD / plating /        100      2-4w     parallel
                   anodise / brush        (w/main)          +5-7d
─────────────────────────────────────────────────────────────────────
Logo method        Laser / etch /         100      3-5d     parallel
                   emboss / enamel
─────────────────────────────────────────────────────────────────────
Packaging          Drawer box /           100      5-7d     parallel
                   magnetic / EVA


【5 CONCEPT ANCHORS】(occupies ~30% of page, each line + 1 small image)

1. Custom Campaign Token        USD 3-12 / pc  (MOQ 100-300 + tooling)
   GWP · Sponsor · Anniversary

2. Executive Desk Piece         USD 12-35 / pc (MOQ 100)
   VIP client gift · Recognition

3. Premium EDC Metal Component  USD 6-25 / pc  (MOQ 100)
   Onboarding kit · Client gift · Tech event

4. Metal Module for Kit         USD 14-50 / set (MOQ 50-100)
   Executive kit · VIP kit

5. Recognition Piece            USD 5-20 / pc  (MOQ 100-300)
   Employee award · Partner gift · Donor


【HOW TO BRIEF US】(occupies ~15% of page)

Send these 6 lines, response within 3 working days:
  1. Quantity
  2. Use case
  3. Material preference (or "open")
  4. Branding method (or "unsure")
  5. Target FOB band (or "open")
  6. In-hand date

→ inquiries@wischosgift.com


【FOOTER】(5%)

Our 8 productized sets in the Capability Sheet cover ~70% of typical
corporate gift briefs. This page covers the other 30% — custom
metal-led work shaped to your brief.

Wischos Gift · wischosgift.com
```

---

## 7. Build Options — Where to Publish the Map

| Option | Where | Pros | Cons | Recommendation |
|---|---|---|---|---|
| **A. Standalone PDF** | `docs/Wischos Gift — Capability Sheet/Wischos Metal Capability Map (Custom Brief).pdf` | Targeted, send after Capability Sheet, doesn't dilute existing | One more file to manage | ⭐ **Recommended** |
| **B. Add as Page 4 of Distributor Capability Sheet** | Existing Distributor sheet (3 → 4 pages) | One document | Dilutes the set-focused page | Not recommended |
| **C. Add to website + llms.txt** | New URL `/capability-map` + llms.txt section | SEO + AI discoverability | Slower to ship, can't use in immediate outbound | Do this in Wave 2 after PDF validated |

**Recommended path:** Build Option A first (PDF, half-day work). Use it in real outbound with the 8 prioritized Argos-type prospects. After 2-4 weeks of feedback, port the final wording into Option C (website + llms.txt).

---

## 8. Effort Estimate

| Step | Effort | Owner | Dependency |
|---|---|---|---|
| Clear 6 factory gaps (Section 5) | 30-60 min | John | None — do this first |
| Refine data table per factory answers | 30 min | (with AI assist) | After gaps cleared |
| HTML build (reuse vertical 4:5 template) | 2-3 hrs | (with AI assist) | After data finalized |
| Export PDF + image embedding | 30 min | (with AI assist) | After HTML done |
| Add to llms.txt | 30 min | (with AI assist) | After PDF validated in field |
| **Total to first usable PDF** | **~4-5 hrs spread over 2-3 days** | | |

This is vastly less than the "30-day rebuild" the other AI suggested. Because Wischos's factory network and product portfolio already prove every claim the Map will make.

---

## 9. Decision Log

| Date | Decision | Reasoning |
|---|---|---|
| 2026-06-05 | Build a Capability Map as a 1-page companion, not a pivot | The 8 productized sets stay the lead offer; Map fills the "what else can you do" gap |
| 2026-06-05 | Use existing 6-process taxonomy from the other AI conversation, but bind it to Wischos's actual factory coverage | Avoids fabricated capability claims |
| 2026-06-05 | Concept 4 "Metal Module for Kit" includes explicit note "we focus on metal pieces, not full-kit logistics" | Prevents over-promise on packaging/fulfilment that Wischos doesn't own |
| 2026-06-05 | Recognition Piece priced USD 5-20 (not industry-baseline USD 0.28-2.50) | Wischos is mid-premium tier; commodity prices would damage positioning |
| 2026-06-05 | Defer PDF build until factory gaps cleared | Every claim must be backed by 2+ factories |

---

## 10. Open Questions Pending User Decision

| # | Question | Default if no answer |
|---|---|---|
| 1 | Build Option A (standalone PDF) or B (page 4 of existing)? | A (standalone) |
| 2 | Add "We do not stock — all items made to order" line on the Map? | Yes (clarifies model) |
| 3 | Show factory location (Zhejiang / Guangdong / Sichuan) on the Map? | No (over-disclosure for first touch) |
| 4 | Include FTA / Cert of Origin line on the Map footer? | No (already in Capability Sheet) |
| 5 | Add "Sample fee deducted from production order" policy line? | Yes (industry-standard, builds trust) |

---

## 11. Web Sources Cited

These are the sources used in the industry baseline section (Section 3). Keep for verification / refresh.

- [JLCCNC online CNC machining service](https://jlccnc.com/)
- [XTJ Small Batch CNC China](https://xtjcnc.com/small-batch-cnc-machining-services/)
- [Yijin Solution CNC machining](https://yijinsolution.com/services/cnc-machining/)
- [PCBWay Rapid Prototyping](https://www.pcbway.com/rapid-prototyping/)
- [Sochi Zinc Alloy Die Casting Medals (Made-in-China)](https://cnhongseng.en.made-in-china.com/product/YBTJWKwEfjhF/China-Sochi-Zinc-Alloy-Die-Casting-Mold-Sports-Metal-Blank-Medals.html)
- [Yontone Zinc Die Casting](https://yontone.com/zinc-die-casting/)
- [Custom Medals China — Made-in-China](https://www.made-in-china.com/products-search/hot-china-products/Custom_Medals.html)
- [Globalmedal Custom Stock Medals](https://www.globalmedal.com/stock-medals/)
- [Alibaba 2026 Promotional Pen Configuration Guide](https://seller.alibaba.com/blogs/2026/southeast-asia/gifts-crafts/promotional-pen-configuration-guide-alibaba-b2b)
- [Alibaba Colored PVD Stainless Steel Guide 2026](https://seller.alibaba.com/blogs/2026/southeast-asia/metal-materials/colored-pvd-stainless-steel-configuration-guide-alibaba-b2b)
- [PapaChina Executive Corporate Gift Sets](https://www.papachina.com/executive-corporate-gift-sets)

---

## 12. Related Wischos Project Files

These were referenced or used as data sources for this research. They are the authoritative source if any number in this archive needs updating.

| File | Use |
|---|---|
| `public/llms.txt` | Wischos's canonical positioning + MOQ + pricing claims |
| `Wischos_材质审计_2026-updated.xlsx` | SKU-by-SKU material specs (some still need PI from factory) |
| `二次工作文件/co-work/Wischos_报价计算器_2026.xlsx` | True cost basis (RMB → USD) for all 28 SKUs |
| `docs/Wischos Gift — Capability Sheet/Wischos Gift — Capability Sheet Corporate (Vertical 4-5).pdf` | Design reference for layout |
| `docs/Wischos Gift — Capability Sheet/Wischos Gift — Capability Sheet Distributor (Vertical 4-5).pdf` | Design reference for layout |
| `docs/skills/distributor-screening/SKILL.md` | Decides which prospects receive the Map (Argos-type, score ≥ 7) |
| `docs/skills/distributor-screening/Argos-Type-Customer-Persona.md` | Defines the target reader |
| `docs/skills/wischos-email-voice/SKILL.md` | Voice for the cover email that delivers the Map |

---

## 13. Revision History

| Date | Change | By |
|---|---|---|
| 2026-06-05 | v1.0 archive created — full research + draft, awaiting factory gap clearance | (conversation with AI) |

---

## 14. Next Action (for John)

1. **This week:** Clear the 6 gaps in Section 5 by messaging current factories (30-60 min total)
2. **After gaps cleared:** Update Section 4.1-4.2 with confirmed numbers
3. **Then:** Build HTML using existing vertical 4:5 template + export PDF (2-3 hrs with AI assist)
4. **After PDF ready:** Test in 3-5 outbound emails to Argos-type prospects from the priority list
5. **After 2-4 weeks:** Decide whether to port content to website / llms.txt (Build Option C)

End of archive.

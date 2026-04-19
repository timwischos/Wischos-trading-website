# Wischos SOHO Workstation — Design Spec
**Date:** 2026-04-19  
**Status:** Approved  
**Target builder:** Claude Design (UI prototype) → Claude Code (Supabase wiring)

---

## 1. Overview

A personal work management app for a one-person B2B metal gift trading business. Covers the full daily workflow: task tracking, content production, Google Ads management, product sourcing, customer development, and weekly review.

**Not a public product.** Private tool for internal use only.

---

## 2. Architecture

```
Local HTML file (UI + prompt generation)
        ↕  Supabase JS SDK
Supabase (data layer — new tables, separate from website DB or same project with isolated tables)
```

- No Claude API calls. All AI assistance via copy-paste bridge: App formats structured prompts, user copies and pastes into Claude CLI.
- No backend server. HTML file + Supabase JS SDK only.
- Data persists in Supabase, not localStorage (localStorage is unreliable for work data).
- API key storage: not applicable (no API calls).

---

## 3. Global Date System

Every table includes:
- `date` — `YYYY-MM-DD`, used for calendar queries and day-based filtering
- `created_at` — auto timestamp, used for ordering

This allows cross-table queries by date for the calendar view.

---

## 4. Tabs

### Tab 1 — 今日任务 (Daily Tasks)

**Purpose:** Start each workday with a clear picture of what to do and track module completion.

**Layout:**
- Top: Monthly calendar view with dot indicators per day
  - Green dot = all modules completed
  - Yellow dot = partial completion
  - Grey = no record
  - Click any past date → read-only historical view of that day showing: completed modules, 今日重点 note, number of content items published, number of outreach messages sent, number of sourcing products added
  - Default = today
- Middle: "今日重点" — one-line free text field, most important thing today
- Main: 6 module cards, each containing:
  - Module name + suggested duration
  - Task list (1–3 items, manually entered)
  - Completion checkboxes
  - Notes field (temporary, not stored)
- Bottom: Unfinished items banner from previous day — "Yesterday had X incomplete items. Move to today?"

**Reminder logic:**
- Local HTML phase: On page load, check previous day's incomplete items and show banner
- Vercel phase: Vercel Cron Job + Resend email at 9am daily, same check

**Data tables:**
- `daily_tasks` — `id, date, module_name, task_text, completed, created_at`

---

### Tab 2 — 内容工厂 (Content Factory)

**Purpose:** Research → topic selection → drafting → 4-platform distribution, all in one flow.

**Layout (3 sections top to bottom):**

**Research Notes**
- List of notes, each with: title, content, source URL, tag (行业数据 / 竞品 / 买家语言 / 市场趋势)
- Can mark a note as "converted to topic"

**Topics & Drafts**
- Each topic is a card: title, target platforms, status (构思中 / 草稿中 / 待发布 / 已发布), linked research notes
- Open a topic → expand draft editor
- "复制给 Claude" button → generates prompt with draft + instruction to rewrite for LinkedIn / Facebook / Instagram / Twitter, user pastes into CLI

**Publish Records**
- Table: title, publish date, status per platform (已发 / 待发 / 跳过)
- Weekly view default

**Data tables:**
- `research_notes` — `id, title, content, source_url, tag, converted, date, created_at`
- `content_drafts` — `id, title, status, draft_text, note_ids, date, created_at`
- `publish_records` — `id, draft_id, platform, status, publish_date, created_at`

---

### Tab 3 — Ads 数据 (Google Ads)

**Purpose:** Record weekly ad performance and track keyword status.

**Layout (2 sections):**

**Data Entry & Prompt Generation**
- Form fields: per ad group — clicks, impressions, spend, CPC, conversions
- "复制给 Claude" button → assembles full context prompt including: all entered data + campaign background (Australia + Canada, $20/day, B2B gift customisation, current ad group statuses) → user pastes into CLI for deep analysis

**Keyword Status Tracker**
- Table: keyword, ad group, status (投放中 / 已暂停 / 待建 / 否定词), notes
- Status togglable inline
- Negative keywords grouped separately

**Data tables:**
- `ads_snapshots` — `id, date, ad_group, clicks, impressions, spend, cpc, conversions, created_at`
- `keywords` — `id, keyword, ad_group, status, notes, created_at`

---

### Tab 4 — 选品库 (Product Sourcing)

**Purpose:** Track metal gift products through discovery → evaluation → tracking pipeline.

**Layout:** 3 sub-tabs toggled with small tab bar

**Discovery**
Quick capture form: product name, category (笔 / 桌面 / EDC / 饮品 / 其他), source URL, cover image URL, B2B potential (高 / 中 / 低), notes

**Evaluation**
Promoted from Discovery. Full fields: factory MOQ, reference cost price, estimated FOB, target customer (采购经理 / HR / 其他), material, customisation method (激光蚀刻 / 丝印 / 其他), differentiation vs existing 25 SKUs
"复制给 Claude" → generates evaluation report prompt

**Tracking**
Products decided to pursue. Status: 待询价 / 已询价 / 样品中 / 已上线 / 搁置. Supplier contact info, follow-up notes.

**Data tables:**
- `sourcing_products` — `id, name, category, source_url, image_url, b2b_potential, stage, moq, cost_price, fob_estimate, target_customer, material, customisation, differentiation, supplier_contact, status, notes, date, created_at`

---

### Tab 5 — 客户开发 (Customer Development)

**Purpose:** Manage prospect research, outreach CRM, and communication history for LinkedIn-first B2B outreach.

**Layout:** 3 sub-tabs

**联系人 CRM**
Prospect list with: name, company, title, country, LinkedIn URL, channel (LinkedIn — active; Cold Email — reserved field, inactive), outreach status (未联系 / 已发消息 / 已回复 / 跟进中 / 死档), last contact date, tag (采购经理 / HR / 经销商 / 其他)
Filterable by status.

**客户调查**
Per-prospect research page (linked to CRM record): company size, industry, recent purchase signals, pain point hypothesis, recommended gift set, conversation entry point
"复制给 Claude" → generates outreach message draft prompt

**外展记录**
Per-prospect timeline of interactions: date, channel, message summary, response received, next action
Read-only timeline view.

**Data tables:**
- `prospects` — `id, name, company, title, country, linkedin_url, channel, status, last_contact_date, tag, created_at`
- `prospect_research` — `id, prospect_id, company_size, industry, signals, pain_points, recommended_set, entry_point, created_at`
- `outreach_logs` — `id, prospect_id, date, channel, message_summary, response, next_action, created_at`

---

### Tab 6 — 周报 (Weekly Review)

**Purpose:** Aggregate the week's data at a glance, then generate a deep-review prompt for Claude CLI.

**Layout (2 sections):**

**Weekly Summary Panel**
Auto-pulled from all tables for current week (Mon–Sun):
- Tasks: modules completed / total
- Content: posts published, platforms covered, posts pending
- Ads: total spend, clicks, inquiries (manual input)
- Sourcing: new discoveries, products evaluated
- Prospects: new contacts added, outreach sent, replies received

**Prompt Generation**
"复制给 Claude" button → assembles full weekly summary + weekly goal (manual text field) into a structured weekly review prompt. User pastes into CLI for analysis.

No new tables needed — all data queried from existing tables by date range.

---

## 5. Copy-Paste Bridge — Prompt Format Standard

Every "复制给 Claude" button generates a prompt in this structure:

```
## 背景
[Fixed context about the business — auto-inserted]

## 本次任务
[What type of analysis is being requested]

## 数据
[Structured data from the current module]

## 我的问题
[Specific question or instruction]
```

Background context is stored as a config block in the HTML and auto-prepended to every prompt.

---

## 6. Supabase Setup

- Use existing free Supabase account
- **Recommendation: new Supabase project** (free tier allows 2 projects). Keeps workstation data fully separate from website data, no risk of table name collision, easier to manage permissions independently.
- If free tier is already at limit, use same project with table prefix `ws_` (e.g. `ws_daily_tasks`)
- Row Level Security: single user private tool — use anon key with open policies, or service role key stored directly in the HTML config block. Security risk is acceptable since this file is never shared or deployed publicly.

---

## 7. Implementation Path

1. **Claude Design** — Input this spec, generate UI prototype for all 6 tabs, export as HTML
2. **New project directory** — Create separate folder, move spec and HTML export there
3. **Claude Code** — Wire Supabase JS SDK, implement CRUD for all tables, implement copy-paste prompt generation per module, implement calendar cross-table queries

---

## 8. Out of Scope

- Mobile responsiveness (desktop-only tool)
- Multi-user / team features
- Push notifications (deferred to Vercel phase)
- Claude API integration (all AI via copy-paste bridge)
- Cold email tooling (channel field reserved, not built)
- Automated data import from Google Ads API

---
name: dual-customer-analysis
description: Runs dual parallel customer analysis for Wischos Gift Trading leads. Spawns two background agents — one using the Chinese 8-step 一轮客户调查流程, one using the English 4-framework export-customer-development system — then shows bilingual CN/EN comparison and writes a merged customer profile MD file. Use when the user provides a customer name, company, and/or LinkedIn snippet and asks to analyze a lead, research a customer, or build a customer profile.
argument-hint: "<name, company, LinkedIn snippet>"
---

# Dual Customer Analysis

## Quick Start

User provides: contact name + company + any LinkedIn/web info they have.
You run: two parallel agents → compare → merge → save file.

## Workflow

### Step 0 — Triage (run before anything else)

**三问首筛 — 按顺序问，命中即停：**

1. 是否明确卖 promotional products / corporate gifts / awards / recognition / branded merchandise？
   → **No = 直接放弃，不继续。**
2. 是否有证据显示会采购或转售非服装、非印刷类实物礼品？
   → No = 放弃。
3. 联系人是否是 owner / buyer / sourcing / procurement / senior operator，且可触达？
   → No = 降级备查。

三问里只要问题1是No，立即终止，不深挖。

---

**淘汰条件（命中任一 → 放弃或备查）：**

| 淘汰条件 | 处理 |
|---|---|
| 找不到官网/公司页/可验证业务资料，只剩LinkedIn个人页 | 放弃或低优先级备查 |
| 主营 print only / apparel only / local decoration，无明确 promotional products | 放弃 |
| 没有公开邮箱，LinkedIn也非高价值决策人 | 放弃 |
| 主营 local quick-turn / rush order / 小批量本地服务 | 放弃或备查 |
| 明确 Canadian-made / local-made / handmade / artisan only | 放弃 |
| 主要做非金属类：服装、纸品、印刷、塑料低价品、花束、食品礼篮 | 放弃 |
| 公司规模极小，且无 corporate gifting / promo distributor / awards / recognition 场景 | 放弃 |
| 没有产品目录、客户案例、社媒作品、协会会员、展会记录任一支持 | 放弃 |
| 只服务学校/球队/社区小单，且无 corporate / sponsor / recognition 场景 | 放弃 |
| 大型成熟distributor，员工100+、有自有品牌线、官网明确写"in-house sourcing" | 放弃或仅备查 |

---

**分级（淘汰后分级）：**

| 等级 | 判断 | 动作 |
|---|---|---|
| A | 明确 promo distributor / corporate gifting / awards，有决策人和联系方式 | 深档 + 外展 → 继续Step 1 |
| B | 方向匹配，但规模或采购模式需验证 | 建档 + LinkedIn/email 轻触达 → 继续Step 1 |
| B- | 平台/社群/中间层，自身不下单但有买家触达能力 | 给一份flyer，保持联系，不深挖 → 停止，不进入Step 1 |
| C | 有一点交叉，但主业偏 apparel / print / local service | 只发一次LinkedIn，或CRM备查 → 停止 |
| D | 信息少、匹配弱、无官网/邮箱/产品证据 | 直接放弃 → 停止 |
| Reject | local-only / handmade-only / print-only / apparel-only / 非金属无关 | 不建档 → 停止 |

**只有A或B才继续进入Step 1以下的完整分析。**

---

### Step 0.5 — Contact Discovery Gate (required for A/B and useful for B-/C)

Before spawning agents for any A/B lead, actively search for the best reachable contact. Do not rely only on the contact supplied by the user if the role is unclear.

**必须输出联系人优先级矩阵 / Required contact priority matrix:**

| Priority | Contact | Role/title | Evidence strength | Contact route | Use? | Notes |
|---|---|---|---|---|---|---|
| 1 | | owner / director / sourcing / procurement / buyer / senior operator | official / LinkedIn / directory / inferred | LinkedIn / direct email / generic email / phone / form | primary / backup / do not use | |

**Search order:**
1. Official website: Contact / About / Team / footer / source-visible email / form / phone.
2. LinkedIn company employees: owner, founder, director, managing director, procurement, sourcing, buyer, operations, commercial, sales manager.
3. Search queries:
   - `"Company" "owner" OR "founder" OR "director" OR "managing director"`
   - `"Company" "procurement" OR "sourcing" OR "buyer" OR "operations"`
   - `site:linkedin.com/in "Company" "promotional products"`
   - `"Contact name" "Company" email`
   - `site:company-domain "@"`
4. Business directories / registries / domain records / association listings, only as supporting evidence.
5. Email format inference only after at least one real company-domain email is found; mark inferred emails as `待验证 / unverified`.

**Evidence strength labels:**
- **Strong**: official website, official registry, LinkedIn profile clearly tied to company and role.
- **Medium**: reputable directory, association profile, company page employee list, domain WHOIS/registrant.
- **Weak**: sales-intelligence scrape, people-search site, unverified email format, old directory.

**Contact selection rules:**
- Prefer owner / managing director / director / sourcing / procurement over generic info emails.
- If only a generic email or form is available, still list the best named person and use the generic route as the channel.
- If a named person is relevant but role is unclear, write outreach defensively: "I'm not sure if you handle supplier sourcing..."
- If the only reachable contact is customer service and no senior/operator contact is found, downgrade one level unless the company is otherwise very strong.
- For local dealers/resellers, the contact ask should verify whether they handle **planned custom projects beyond standard catalogue items**.

Step 4 comparison must include a short "联系人/Contact route" row. Step 6 merged file must include the contact priority matrix.

---

### Step 1 — Read both framework files (in parallel, before spawning agents)

**Framework 1:**
`/mnt/d/Project/Wischos trading website/临时/通用资料/一轮客户调查流程.md`

**Framework 2 (5 files, all in `/mnt/d/Project/Wischos trading website/agent-skills/export-customer-development/`):**
- `task-router.md`
- `references/customer-intelligence-profile.md`
- `references/customer-analysis.md`
- `references/customer-value-assessment.md`
- `references/account-entry-strategy.md`

### Step 2 — Spawn two background agents in parallel

See [AGENTS.md](AGENTS.md) for full agent prompts.

Both agents receive:
- Full text of their respective framework
- Customer info from user input
- Wischos context (see below)
- Instruction to use WebSearch + WebFetch for real research

When spawning Agent 1, include the Step 0 triage result as `{TRIAGE_RESULT}`. Agent 1 should treat this as a reference point, independently verify it, and explicitly flag any disagreement rather than silently adopting the main-thread tier.

### Step 3 — Wait for both agents to complete

Do not proceed until both task notifications arrive.

### Step 4 — Show bilingual comparison (CN/EN)

Present one fixed-format comparison table. Keep it concise, but do not omit rows:

| 维度 | Agent 1（一轮流程） | Agent 2（英文框架） | 差异/备注 |
|---|---|---|---|
| 供应链位置与角色 | Full chain + customer role | Full chain + customer role | Required; label dealer/distributor/importer/end buyer |
| 联系人/Contact route | Primary + backup + evidence | Primary + backup + evidence | Required; note verified vs inferred |
| 梯队/Tier | | | If conflict, mark difference clearly |
| 产品分析 | Product category map / metal gaps | Product and category fit | Explain which categories match Wischos |
| 商业模式 | Catalogue/project/local/stock/custom/mixed | Business model / buying behavior | Note likely buying pattern |
| 主要切入角度 | | | Use the stronger or merged angle |
| 结构性障碍 | | | Include blockers and downgrade reasons |
| 接触钩子 | | | Pick concrete hook candidates |
| LinkedIn邀请信 | | | State which draft to use or merged draft |
| 框架独特产出 | | | Keep unique evidence, scores, cadence, risks |

For local promotional products dealers/resellers/event merchandise providers that are not confirmed importers, explicitly include the judgment that Wischos is not replacing their daily local catalogue supply chain. Position outreach around planned custom metal gift projects **beyond standard catalogue items**.

### Step 5 — Confirm before merging

Ask user: "确认对比无误后，告诉我是否合并" — wait for explicit confirmation.

### Step 6 — Write merged file

Path: `/mnt/d/Project/Wischos trading website/临时/[Country]/[Company Name]/[Company-Name-Contact-Name].md`

Use the country subdirectory that matches the customer market and existing repo naming, e.g. `澳大利亚`, `加拿大`, `英国`, `UAE`.

- Create subdirectory if it doesn't exist: `mkdir -p`
- Naming: spaces → hyphens (e.g. `The-Trophy-Den-Dan-Favell.md`)
- File structure: see [TEMPLATE.md](TEMPLATE.md)

Merge logic:
- Tier conflict rules:
  - Same tier in both frameworks → adopt directly.
  - One-level difference → choose the lower tier and mark `保守评估，原因：[...]`.
  - Two-level or larger difference → identify the source of disagreement, choose the framework with stronger evidence, and write `评级依据：[框架名] — [核心证据]`.
- Contact conflict rules:
  - Same person → merge all evidence and routes.
  - Different contacts → rank by decision power: Owner/Founder/Managing Director/Director > Procurement/Sourcing/Buyer/Ops > Sales/Account > generic/company route > other.
  - Contact found by only one agent → keep it and mark `仅一框架确认`.
  - Same decision power → Priority 1 goes to the more reachable contact; keep the other as Priority 2.
  - Mark inferred emails, scraped titles, and weak directory contacts as unverified.
- Contacts: include a priority-ranked contact matrix, evidence strength, preferred channel, and fallback route.
- Product/mode analysis: include the product category map, business model tags, typical order pattern, customer industries, and metal-category gaps when available.
- Keep Agent 1's unique insights: product table, local-op compatibility, scale/stability checks, import-platform results, tariff/owner-background angles when present.
- Keep Agent 2's unique outputs: quantitative scores, ranked entry angles, full email draft, value tier, account type, and day cadence.
- Capability Sheet selection:
  - promo distributor / gift agency / awards or recognition company → distributor version.
  - end buyer HR / Marketing / Event / real estate agent → end-buyer version.
  - uncertain → distributor version.
- Outreach: English drafts (LinkedIn invite ≤300 chars + full first email + Day 0/3/5/7/14/30/60/90 cadence where relevant).
- For local dealer/reseller leads, LinkedIn invite and follow-up should normally include "beyond standard catalogue items" or a close equivalent, so Wischos is framed as a special project source rather than another ordinary catalogue supplier.
- CRM notes: Chinese; include `当前阶段`.

---

## Wischos Context (pass to both agents)

```
B2B exporter of custom metal gift sets from China.
Target markets: Australia, EU, UK, Canada, UAE.
MOQ: 100 sets. FOB: $18–$50/set. No stock samples.
Products: metal pens, desk accessories, EDC, drinkware, lapel pins, medals,
  custom-shaped metal pieces, gift sets WGS-001~008.
Factory networks: Yangjiang, Dongguan, Zhongshan, Shenzhen, Yiwu, Wenzhou.
Lead time: 25–35 days. Brand: Wischos Gift. Site: wischosgift.com.
All metal-related gifts are in scope — not limited to current website SKUs.
Mark anything unknown explicitly; do not invent facts.
```

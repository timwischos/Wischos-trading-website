---
name: customer-analysis
description: Single-framework customer analysis for Wischos Gift Trading leads. Runs a three-gate progressive triage, then spawns one background agent using the merged Chinese framework (一轮客户调查流程 with grafted Fit/Value scoring, value tiers, ranked entry angles, and outreach cadence), and writes a Chinese customer profile MD file. Use when the user provides a customer name + country (and optionally website, city, staff names, company intro) and asks to analyze a lead, research a customer, or build a customer profile.
argument-hint: "<customer name + country (optional: website / city / staff / intro)>"
---

# Customer Analysis

<!--
SELF-CONTAINED SKILL. All framework files live in ./frameworks/ inside this directory;
no external absolute paths. The framework files are snapshots (2026-06-05) copied from:
  - 临时/通用资料/一轮客户调查流程.md            → frameworks/01-一轮客户调查流程.md
  - agent-skills/export-customer-development/    → frameworks/02–06
If you update those external sources, re-sync the copies here. Output paths in Step 6
intentionally write back to the Wischos project 临时/ tree.
-->

## Quick Start

User provides: 客户名 + 国家（最小输入），或附带 官网 / 城市 / 员工名 / 公司简介。
You run: 三道闸门分级筛 → 单 agent 中文调研 → 写文件 + 展示结果（全程不停顿确认）。
批量：给一张 xlsx/csv 线索表 → 见下方 Batch Mode（逐行跑 + 汇总总表）。

## Workflow

### Step 0 — Progressive Triage (分级递进筛，run before anything else)

This is a cost gate. It runs in **three sequential gates**: a cheap kill (Gate 1), then deep research only on survivors (Gate 2), then full deep analysis by a single agent only for A/B (Gate 3). Expensive research must NOT run on leads that fail Gate 1.

#### Input handling (情况A / 情况B)

Use whatever the user provides; do not require a fixed set of fields.

| Provided | Behavior |
|---|---|
| Website URL given | Skip website discovery; WebFetch it directly. |
| City / employee names / company intro given | Use for same-name disambiguation and as a head start for framework 2.3 contact discovery. |
| **Minimum: name + country only** | Run the full website-discovery procedure below. |

---

#### Gate 1 — Cheap kill (每条线索都过，仅抓官网首页 + LinkedIn 公司页)

Answers one question only: **"它主要卖什么 + 有没有可验证的网络存在。"** Do not run Owler / customs / catalog / email research here.

**1a. Website discovery (官网发现) — required when no URL was given.**
"搜了没结果才算没有，没搜不算" — only declare "no website" after all steps below return nothing.

1. `WebSearch: "公司全名" + 城市/州` 或 `"公司全名" official website`
2. `WebSearch: "公司全名" promotional products OR corporate gifts`（蹭行业词排除同名公司）
3. 查 LinkedIn 公司页的 **Website** 字段
4. 命中域名 → `WebFetch` 首页确认确属本公司（名称/地区/业务一致）
5. 以上全部无果 → **Reject（无可验证官网）**

**社媒-only 处理（严格）：** 只有 Facebook / Instagram 等社媒页、无独立官网 → 视同无官网 → **Reject**。

**1b. Gate 1 淘汰条件（命中任一 → Reject，不进 Gate 2）：**

| 淘汰条件 | 信息来源 |
|---|---|
| 无可验证官网（含仅社媒） | Gate 1a 官网发现 |
| 主营 print only / apparel only / local decoration，无明确 promotional products | 官网首页/About |
| 明确 Canadian-made / local-made / handmade / artisan only | 官网 About/产品页 |
| 主做非金属类：服装、纸品、印刷、塑料低价品、花束、食品礼篮 | 官网产品分类 |

通过 Gate 1 → 进入 Gate 2。

---

#### Gate 2 — Deep research + grading（仅对 Gate 1 幸存者）

Run framework 1 第二步 research (2.1.1 规模 / 2.2 邮箱 / 2.4 协会 / 2.5 B2B足迹·海关) to evaluate the conditions below, then assign tier.

**Gate 2 淘汰条件（命中 → 放弃或备查）：**

| 淘汰条件 | 信息来源 |
|---|---|
| 主营 local quick-turn / rush order / 小批量本地服务 | 官网措辞 + 2.5 B2B足迹 |
| 公司规模极小，且无 corporate gifting / promo distributor / awards / recognition 场景 | 2.1.1 规模(Owler/LinkedIn) |
| 无产品目录 / 客户案例 / 社媒作品 / 协会会员 / 展会记录 任一支持 | 2.3 案例 + 2.4 协会/展会 |
| 终端纯学校 / 青少年球队 / 社区，无 corporate / executive / recognition 场景 | 2.3 公开客户案例（买家档次不符 executive gift 定位） |
| 大型成熟 distributor、员工100+、有自有品牌线、官网明确 "in-house sourcing" | 2.1.1 规模 + 2.5 B2B足迹 + 官网 |
| 海外办公室存在10年以上（无论员工规模）— 视同已有成熟中国采购链，不以ImportYeti记录少来反驳 | 官网 About/里程碑 + 2.5 B2B足迹 |

> ⚠️ **ImportYeti 局限性（加拿大客户必读）**：ImportYeti 抓取的是**美国**海关数据。加拿大公司进口进入加拿大，海关数据不公开，**ImportYeti 记录少 ≠ 进口量小**。对加拿大客户，ImportYeti 只能用于：①确认有无对美国子公司/美国客户的发货记录；②作为"有"的正向证据，不能作为"无/少"的反向依据。若无 ImportYeti 记录，必须通过官网/LinkedIn/行业媒体判断其采购模式。

> ⚠️ **规模小不是淘汰条件**：小公司（2-10人）只要通过 ICP（promo distributor + 有金属品类），不得因规模小而降级或淘汰。小公司=决策快、无采购委员会、更依赖外部供应商。淘汰条件是"规模极小 **且** 无 corporate/recognition/promo 场景"，两个条件必须同时成立。

**分级（淘汰后分级）：**

| 等级 | 判断 | 动作 |
|---|---|---|
| A | 明确 promo distributor / corporate gifting / awards（公司质量层面） | 深档 + 外展 → Gate 3 |
| B | 方向匹配，但规模或采购模式需验证 | 建档 + LinkedIn/email 轻触达 → Gate 3 |
| B- | 平台/社群/中间层，自身不下单但有买家触达能力 | 给一份flyer，保持联系 → 停止 |
| C | 有一点交叉，但主业偏 apparel / print / local service | 只发一次LinkedIn，或CRM备查 → 停止 |
| D | 信息少、匹配弱、无产品证据 | 直接放弃 → 停止 |

> Gate 2 只按**公司质量**分级，不涉及可触达性。联系人发现、以及"搜尽无可达决策人则降一档"由框架 2.3 在深度分析阶段统一处理（方案A，一遍不重复）。

---

#### Gate 3 — 只有 A / B 才进入 Step 1 以下的完整深度分析。

---

### Step 0.5 — （已下沉到框架 2.3）

联系人发现已统一到框架 2.3「联系人发现与决策人确认」，由 agent 在深度分析阶段执行一次（方案A：不在主线程重复）。该步包含：能力诚实声明、查找顺序（官网 / LinkedIn / 定向搜索 / people-search 摘要 / 邮箱七层）、证据强度、三轴优先级排序，并输出联系人优先级矩阵。主线程不再单独做联系人发现。

---

### Step 1 — 读取单一融合中文框架

本技能已融合为**单套中文框架**。读取：
- `./frameworks/01-一轮客户调查流程.md` —— 已并入框架2 的量化评分（Fit/Value 0–100）、价值分层、3 个排序切入角度、Day 节奏、FOB 估价。

> `./frameworks/02–06`（英文原始四框架）保留为参考，**正常流程不需读取**；仅在需要核对原始英文定义时查阅。

### Step 2 — 派 1 个后台 agent

See [AGENTS.md](AGENTS.md) for the agent prompt.

agent 接收：
- 框架01 全文
- 用户提供的客户信息
- Step 0 分级结果 `{TRIAGE_RESULT}`（agent 当参考点，独立验证，分歧明确标出）
- Wischos context（见下）
- 指令：用 WebSearch + WebFetch 真实调研；**分析结果全程中文输出**（给客户的外展文案除外，见 Step 6）

### Step 3 — 等待 agent 完成

agent 任务通知到达后再继续。

### Step 4 — 展示调查结果（中文）

按框架01 的输出结构呈现一份中文结果，至少包含：
- **采购背景档案（速览，放最前）**：核心业务方向 / 主要产品线 / 潜在采购需求 / 供应链可能痛点 / 最佳切入角度
- 供应链**当前位置**（不含 Wischos，标客户落点）
- 联系人优先级矩阵（含证据强度、verified/inferred）
- Fit Score / Value Score（0–100）+ 价值梯队 + 账户类型
- 产品四问 + 痛点诊断
- 三个排序切入角度 + 供应商切换假设
- 接触钩子、LinkedIn 邀请信、外展节奏

对未确认为进口商的本地 promo dealer/reseller/活动礼品商，明确写明 Wischos **不替代其日常本地目录供应链**，外展定位在 planned custom metal gift projects **beyond standard catalogue items**。

### Step 5 — 直接写文件（不停顿确认）

**不设人工确认闸门。** 调研完成 → 直接写文件 → 把结果展示给用户。一气呵成，不中途停下等"是否写入"。（除非缺必需信息无法继续，那是阻断，不是确认。）

### Step 6 — 写文件

Path: `/mnt/d/Project/Wischos trading website/临时/[Country]/[Company Name]/[Company-Name-Contact-Name].md`

Use the country subdirectory that matches the customer market and existing repo naming, e.g. `澳大利亚`, `加拿大`, `英国`, `UAE`.

- Create subdirectory if it doesn't exist: `mkdir -p`
- Naming: spaces → hyphens (e.g. `The-Trophy-Den-Dan-Favell.md`)
- File structure: see [TEMPLATE.md](TEMPLATE.md)

写入要点（单框架，无双 agent 冲突裁决）：
- **采购背景档案（速览）放档案最前**：核心业务方向 / 主要产品线 / 潜在采购需求 / 供应链可能痛点 / 中国供应商最佳切入角度（采购顾问视角、只基于证据）。
- **联系人**：优先级矩阵 + 证据强度 + 首选渠道 + 备用路径；推断邮箱、抓取职称、弱目录联系人一律标 `unverified`。
- **产品/模式**：产品品类地图、产品四问、痛点诊断、商业模式标签、典型订单模式、金属品类空白。
- **供应链**：客户当前位置，不含 Wischos。
- **评分**：Fit/Value 0–100 + 价值梯队（Tier 1–4）+ 账户类型。
- **切入**：3 个排序角度（含 Hook 句、产品配对、风险）+ 供应商切换假设。
- **Capability Sheet 选择**：promo distributor / gift agency / awards → 分销商版；终端 HR / Marketing / Event / 地产 → 企业终端版；不确定 → 分销商版。
- **外展文案（英文，因客户在 AU/UK/Canada/EU/UAE）**：LinkedIn invite ≤300 chars + 首封邮件 + Day 0/3/5/7/14/30/60/90 节奏。本地 dealer/reseller 的邀请信与跟进含 "beyond standard catalogue items" 或等价表述。
- **CRM 备注**：中文，含 `当前阶段`。

---

## Batch Mode（批量模式）

当用户给的是一张线索表（xlsx/csv）而非单个客户时，对**每一行**跑完整流程，产出"每家一份档案 + 一张汇总总表"。

**全程无人值守：不做开跑确认、不 per-lead 暂停。** 唯一会停的是"缺必需列(公司名/国家)无法继续"这种阻断,其余一律跑到底,最后给汇总表统一审。

### B1. 读表 + 列映射（列名无关）
- 读取表，第一行作表头（用 xlsx 能力读 xlsx，csv 直接读）。
- 按表头**模糊匹配**认列（中英、大小写都认）：
  - **必需**：公司名（company / name / 公司）、国家（country / 国家）
  - **可选**：城市（city）、地址（address）、网站（website / url / 官网）、描述（description / notes / 简介）
- 缺必需列 → 停下问用户；可选列缺 → 跳过（"有就用，没有就算"，对接 Step 0 输入处理）。

### B2. 分阶段跑闸门（成本优先：先便宜后贵）
1. 对**所有行**先跑 **Gate 1**（便宜杀：官网发现 + "卖什么"淘汰）。被刷掉的只在汇总表记一行（Reject + 原因），不再深挖。
2. 对 Gate 1 幸存者跑 **Gate 2**（公司质量分级）。C/D 记汇总行，不出详档。
3. 只有 **A/B** 进入深度分析。
> 这样贵的调研只花在通过初筛的线索上，成本随合格数增长，不随表的总行数增长。

### B3. 并行深度分析（子 agent）
- A/B 线索**分批用子 agent 并行**（建议每批 3–5 个，避免过载/超额）。每个子 agent 跑框架 01 全套，返回该公司的中文档案。
- 每个子 agent 一完成就：**写该公司 MD 档案 → 往汇总表追加一行 → 丢弃全文**（主线程只留汇总行，不囤全文，防止上下文爆掉）。
- 一批跑完再起下一批，直到全表处理完。

### B4. 输出
- **每家一个 MD 档案**：`临时/[国家]/[公司名]/[公司-联系人].md`（走 TEMPLATE）。
- **一张汇总总表**：`临时/_批量汇总_[日期].xlsx`，列：公司 / 国家 / 网站 / 闸门结果(A·B·C·D·Reject) / Fit / Value / 价值梯队 / 首选联系人 / 首选切入角度 / 当前阶段 / 原因或备注。

### B5. 稳健性
- **边跑边落盘**：每条结果立即写文件，中途失败不丢已完成的。
- 单条失败 → 汇总表标"失败 + 原因"，继续下一条，**不中断整批**。
- 跑完汇报：总行数 / A·B·C·D·Reject 各几条 / 出了几份详档 / 失败几条。

---

## Wischos Context (pass to the agent)

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

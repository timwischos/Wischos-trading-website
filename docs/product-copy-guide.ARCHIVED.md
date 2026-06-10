# Wischos Gift — Product Copy Style Guide

> 使用方法：你提供中文产品信息，我先核实关键数据，再按此文件格式写出英文文案。

---

## 一、品牌语气总则

**写什么：** 材料、功能、机制、数字、使用场景。  
**不写什么：** "premium"、"high-quality"、"perfect gift"、"ideal for"——这些是空话。  
**立场：** 买家是B2B采购方，不是消费者。文案服务他们的业务目标，不是感动他们。  
**句式：** 短。主动语态。能省则省。

---

## 二、单品文案（DB 格式）

用于 Supabase `products` 表，展示在产品详情页。

### 输出完整性检查

每次输出单品文案，以下三块**必须全部包含**，缺一不可：

| 块 | 字段 | 常见遗漏原因 |
|----|------|------------|
| **Specifications** | `specifications` — label/value 规格表 | 容易只写 tagline 规格行而跳过完整规格表 |
| **Dimensions 行** | `specifications` 内必须有独立 Dimensions 条目（长×宽×高，含单位） | 最常遗漏——Specifications 块存在但 Dimensions 行缺失不算通过 |
| **Frequently Asked Questions** | `faqs` — 2–4条问答 | 容易在写完 highlights 后忘记 |
| **Expert Notes** | `expertNotes` — 2–3条深度注释 | 单品页为可选字段，但 Wischos 标准是必写 |

输出顺序：name → tagline → description → highlights → materials → **specifications → faqs → expertNotes**

---

### 字段清单

```
name             — 产品名称
tagline          — 规格行（展示在名称下方）
description      — 主文案段落
highlights       — 亮点列表（3–5条）
materials        — 材料数组
specifications   — 规格表（label/value）
customizationOptions — 可定制项
faqs             — 常见问题（2–4条）
expertNotes      — 专家注释（可选，2–3条）
```

---

### `name` — 产品名

**格式：** `[形容词/等级] [材料] [产品类型]`  
**规则：** Title Case（每个词首字母大写）。不用 "Custom"、"Branded"、"Personalized" 开头。

```
Brass Crown Bolt-Action Pen           ✓
Executive Zinc Alloy Letter Opener    ✓
Industrial Brass Key Organizer        ✓
Custom Premium Metal Pen              ✗（空洞形容词）
```

**等级词参考：**
- Executive / Precision / Industrial / Tactical / Professional / EDC

---

### `tagline` — 规格行

**格式：** `材料  |  关键规格  |  差异化特征`  
**规则：** 纯事实，用竖线分隔，不超过10个词，无动词。

```
Brass · Aluminum · Steel  |  G2 refill  |  28g
316 Steel  |  Pressurized cartridge  |  Glass breaker
Solid brass  |  Tungsten carbide tip  |  3+ min spin
Aircraft aluminum  |  Dual-sided surface
```

---

### `description` — 主文案段落

**字数：** 60–100词  
**结构：** 先说这是什么 → 材料/机制 → 使用场景 → 品牌展示价值  
**规则：** 不用 "perfect"、"beautiful"、"stunning"。数字优于形容词。

**中文输入示例：**
> 黄铜圆珠笔，旋转出芯，实心黄铜，重28g，G2墨芯，可激光刻字

**英文输出示例：**
```
A solid brass bolt-action pen with a knurled grip barrel and crown
actuator. At 28g, it carries desk-weight without feeling heavy in a
jacket pocket. Uses standard G2 refills — available anywhere. The
brass surface develops a natural patina with handling, turning the
brand mark into a record of use rather than a decoration.
```

---

### `highlights` — 亮点列表

**格式：** 每条以名词短语开头，不用句号，不重复 description 的内容  
**数量：** 3–5条

```
✓  Solid brass construction — develops natural patina with handling
✓  Crown bolt-action mechanism — audible click, one-handed operation
✓  G2 refill compatible — available globally, never discontinued
✓  Laser engraving on barrel and crown cap
✗  Premium quality materials (空话)
✗  Perfect for any professional (消费者语气)
```

---

### `specifications` — 规格表

提供以下数据，我填入 `{label, value}` 格式：

```
Material / Weight / Dimensions / Tip / Refill type / Surface finish
Engraving area / MOQ / Lead time / Packaging
```

---

### `customizationOptions` — 可定制项

列出可做的事，一句话每条：

```
Laser engraving on barrel (logo, text, or serial numbers)
Anodized color: natural / black / gunmetal / rose gold
Custom packaging box with hot foil stamping
```

---

### `faqs` — 常见问题

**格式：** 问句 + 1–3句答案，站在买家角度提问  
**数量：** 2–4条

**常见问题类型：**
- 材料安全性（无铅、食品级等）
- 刻字效果（深度、颜色）
- MOQ 和起订
- 交货周期
- 与套件的搭配关系

**示例：**
```json
{
  "q": "Can the engraving include a full company logo?",
  "a": "Yes. We accept vector files (AI, EPS, SVG). Logo is laser-engraved directly into the brass — not printed. The depth is 0.1–0.2mm, permanent and resistant to wear."
}
```

---

### `expertNotes` — 专家注释（可选）

与套件格式相同，见第三节。单品页面通常 2–3条，聚焦材料或机制细节。

---

## 三、套件文案（giftSets.ts 格式）

用于 `src/content/giftSets.ts`，展示在套件详情页。

### 字段清单

```
name            — 套件名
tagline         — 短语（4–8词）
heroCopy        — 主文案段落（100–150词）
sellingPoints   — 3个卖点（title + body）
targetBuyer     — 目标买家描述
packaging       — 包装方式
cta             — 行动召唤短语
fob             — 价格区间
expertNotes     — 5条专家注释（title + body）
```

---

### `name` — 套件名

**格式：** "The [名词]" 或 "The [形容词 + 名词]"  
**规则：** 不描述内容物，描述使用场景或情感。

```
The Desk Starter      ✓
The Morning Ritual    ✓
The First Day         ✓
The 3-Piece Metal Set ✗（太literal）
```

---

### `tagline` — 套件标语

**格式：** 4–8词，句号结尾或无标点，平行结构  
**规则：** 可以是陈述、也可以是口号式短语

```
Three tools. Every desk.
Titanium and brass. Nothing else.
Built for the field. Sharp enough for the office.
Everything you need. Day one.
```

---

### `heroCopy` — 主文案段落

**字数：** 100–150词  
**结构：** 第一句说选品逻辑或核心主张 → 逐一描述每件单品的功能 → 总结套件整体价值  
**规则：**
- 每件产品至少一句话，说清楚它**做什么**
- 材料名词要具体（brass、titanium、stainless 316，不写"metal"）
- 以套件整体收尾，不以单品收尾

**中文输入示例：**
> 三件全铝：无墨钢笔（可刻字）、铝合金信封刀、金属书签。都能打logo。进入门槛低的礼品套件。

**英文输出示例：**
```
Three aluminium desk tools that cover the basics: an inkless pen
that never needs a refill, a letter opener that handles every piece
of physical correspondence, and a precision-cut metal bookmark
engraved with your brand or a chosen company value — visible
standing in a book on the desk throughout the working day. All
three are machined aluminium, laser-engraved, and built to stay
on the desk rather than disappear into a drawer.
```

---

### `sellingPoints` — 3个卖点

**结构：** `title`（观察/结论，8词以内）+ `body`（为什么对B2B买家重要，40–70词）  
**规则：** title 是结论，不是功能描述；body 解释商业价值，不重复 title

```
title: Inkless Pen — No Refills, No Waste
body: The inkless tip writes up to 20,000m on most surfaces without
ink cartridges or refills. For companies that include sustainability
commitments in their procurement brief, it delivers a tangible
material story without requiring any explanation.
```

**三个卖点应覆盖：**
1. 最重要的单品功能亮点
2. 材料一致性 / 套件整体感
3. 目标场景下的差异化价值

---

### `targetBuyer` — 目标买家

**格式：** 逗号分隔的行业/角色，英文简洁表达

```
SME corporate gifting, sustainability-conscious procurement, conference welcome packs, academic institutions
Executive gifting, finance sector, premium client retention gifts, high-value HR onboarding programs
```

---

### `packaging` — 包装

固定格式，从以下选：
```
Corrugated Packaging Box + EVA Foam Insert
Magnetic Closure Box + EVA Foam Insert + Soft-Touch Lamination
Tin Box + EVA Foam Insert
Wooden Box + EVA Foam Insert
```

---

### `cta` — 行动召唤

**格式：** 3–8词，陈述或命令式，不用感叹号  
**规则：** 呼应套件核心主张

```
Three aluminium tools. One consistent brand mark.
Turn day one into a brand moment.
Field-ready tools, brand-ready finish.
The set for the professional who packs intentionally.
```

---

### `fob` — 价格区间

格式：`$XX–XX`（FOB价，不含运费）

---

### `expertNotes` — 5条专家注释

**数量：** 固定5条  
**格式：** `title`（Why … / How … / 名词短语）+ `body`（60–100词）

**必须覆盖的5个角度：**

| # | 角度 | 示例 title |
|---|------|------------|
| 1 | 选品逻辑（为什么这几件搭在一起） | Why [产品] for [场景] |
| 2 | 材料深度解析 | Why [材料] ages better than any finish |
| 3 | 包装工程（材料、工艺、成本细节） | EVA Foam Insert Engineering |
| 4 | 包装工艺选择（如热压、烫金） | Logo on Packaging: [方法] |
| 5 | 升级选项（premium alternative） | Alternative: [升级方案] |

**body 写法：**
- 专业但不堆术语
- 给出具体数字：克重、密度、成本加价（$X–X/unit）
- 站在"采购顾问"视角，不是推销视角

---

## 四、写文案前的数据核实流程

在把任何数字或材料声明写进文案之前，我会先搜索核实。以下是核实规则。

### 必须核实的字段

| 字段类型 | 风险 | 核实搜索示例 |
|----------|------|-------------|
| 材料纯度（"纯钛" vs "钛合金"） | 供应商常混用，写错会误导买家 | `pure titanium vs titanium alloy pen difference` |
| 性能数字（写字距离、旋转时长等） | 数据来源可能是厂家宣传而非测试 | `inkless pen writing distance 20000m source` |
| 机制名称（bolt-action、bolt-click） | 中文描述可能对应错误英文术语 | `bolt action pen mechanism how it works` |
| 材料等级（316 stainless、G2 refill） | 规格不同品质差异大 | `316 stainless steel pen vs 304` |
| 食品安全声明（titanium no metallic taste） | 需有依据才能写进文案 | `titanium water bottle food safe taste neutral` |
| 特殊功能（RFID blocking、glass breaker） | 需确认原理是否成立 | `aluminum RFID blocking wallet how it works` |

### 不需要核实的内容

- 文案风格和用词选择（这是创作判断）
- 目标买家场景（这是市场定位，你决定）
- 包装方案和升级建议（基于已有套件经验）
- tagline 和 cta（纯语言创作）

### 核实后的处理规则

- **数据被确认**：直接写进文案，标注数据来源依据（如"manufacturer spec"或"industry standard"）
- **数据存疑**：软化表达，用"up to"、"typically"、"depending on surface"等缓冲词
- **数据无法核实**：告知你，删除该声明，不写无法支撑的内容
- **数据被推翻**：告知你具体差异，等你确认后再写

### 示例

你提供：`无墨笔，可写20000米`

我搜索：`inkless pen writing distance claim 20000m`

核实后发现这是厂家标称值，在特定纸张上测试。文案写法：
```
The inkless tip writes up to 20,000m on most paper surfaces
```
而不是：
```
Writes 20,000m  ✗（过于绝对）
```

---

## 五、我需要你提供的中文信息

> **⚠️ 写单品文案前必须先做：** 读取该产品对应的图片信息文件（路径格式：`public/products/WP-XXX-*/`），从文件中直接提取尺寸数据，不依赖用户手填。若文件中无尺寸，先告知用户，等确认后再写文案。

### 单品：
```
产品名称（中文）：
材料：
重量 / 尺寸：（从产品图片信息文件读取，不手填）
核心功能 / 机制：
刻字方式：
差异化特点（和同类产品比）：
搭配哪些套件（可选）：
```

### 套件：
```
套件名想法（中文或关键词）：
包含单品（SKU + 名称）：
目标买家场景：
价格区间（FOB）：
包装形式：
套件主卖点（你想强调什么）：
```

提供以上信息后，我按本文件格式直接输出可以粘贴进代码的英文文案。

---

*Last updated: 2026-04-24*

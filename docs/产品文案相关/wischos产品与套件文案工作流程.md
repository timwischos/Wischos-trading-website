# Wischos 产品与套件文案工作流程

适用范围：当用户要求撰写、改写或上线 Wischos 单品文案、套件文案时，默认执行本流程。除非用户明确要求跳过，不需要每次重新确认。

---

## 固定流程

1. **读取写作原则**
   - 必读：`docs/产品文案相关/wischos产品文案写作原则.md`
   - 目的：确认语气、防御性表达限制、包装表述、SEO/GEO 输出规范、中英文输出方式。

2. **读取现有正式文案结构**
   - 套件：读取 `src/content/giftSets.ts` 中已上线套件，确认字段、板块、语气、sourcingNotes 格式。
   - 单品：读取现有产品 DB 脚本、产品内容稿或相关正式页面结构，确认字段、板块、命名、规格表达。
   - 目的：先跟随项目当前格式，不重新发明文案结构。

3. **读取产品图片信息文件，提取尺寸**
   - 路径格式：`public/products/WP-XXX-*/`（或对应套件图片目录）
   - **必须从文件中直接提取尺寸数据**，不依赖用户手填。
   - 若文件中无尺寸，先告知用户，等确认后再写文案。

4. **核实产品或套件基础信息**
   - 对照 SKU、产品名、材质、组件、包装、FOB 区间、目标买家。
   - 有冲突时先指出冲突，并基于用户最近确认的信息写稿。
   - 不自行编造规格、成本、交期、MOQ 或无法核实的强声明。

5. **起草英文主稿**
   - 优先英文，因为上线内容以英文为准。
   - 遵守 Wischos 写作原则：陈述事实，不做辩护；减少抽象营销词；用 B2B 采购视角；包装字段与包装说明一致。
   - 套件文案按字段输出：name、tagline、definition、heroCopy、sellingPoints、components、targetBuyer、packaging、cta、fob、sourcingNotes。
   - 单品文案按字段输出：name、metaDescription、quickAnswer、tagline、description、highlights、materials、specifications、customizationOptions、comparisonTable、faqs、sourcingNotes、keyInsight、seoKeywords。

6. **输出完整性检查（单品必须全部通过）**

   | 检查项 | 说明 |
   |--------|------|
   | specifications 字段存在 | 不能只写 tagline 规格行 |
   | **specifications 内有 Dimensions 行** | 长×宽×高，含单位，从产品图片文件读取——此行缺失不算通过 |
   | faqs 存在 | 2–4条，买家视角问答 |
   | sourcingNotes 存在 | 单品1–3条，套件固定5条 |

7. **输出中文直译稿**
   - 中文用于核查英文含义，不自由改写。
   - 行业术语保留英文原文，如 EVA、FOB、custom metal corporate gift set。

8. **调用 SEO skill 审核**
   - 使用 `aaron-seo-geo:seo-content-writer` 相关检查标准审查关键词覆盖、搜索意图、标题/描述、结构完整性和过度优化风险。
   - 根据审核结果修正文案。

9. **调用 GEO skill 审核**
   - 使用 `aaron-seo-geo:geo-content-optimizer` 相关检查标准审查 AI 可引用性、定义句、实体清晰度、事实可核查性、FAQ/notes 可解析性。
   - 根据审核结果修正文案。

10. **最后呈现给用户**
    - 先给最终文案草稿。
    - 再简短列出 SEO/GEO 审核后做过的关键调整。
    - 如果仍有未确认信息，只列为"待确认"，不阻塞可评审草稿。

---

## 单品字段格式规范

### 字段清单（完整）

```
name                 — 产品名称
metaDescription      — SEO 描述（155字符以内）
quickAnswer          — AI/GEO 一句话答案
tagline              — 规格行（展示在名称下方）
description          — 主文案段落
highlights           — 亮点列表（3–5条）
materials            — 材料数组
specifications       — 规格表（label/value），必须含 Dimensions 行
customizationOptions — 可定制项
comparisonTable      — 对比表（可选）
faqs                 — 常见问题（2–4条）
sourcingNotes        — 采购顾问注释（1–3条）
keyInsight           — 核心洞察（1句）
seoKeywords          — SEO 关键词数组
```

---

### `name` — 产品名

**格式：** `[形容词/等级] [材料] [产品类型]`
**规则：** Title Case。不用 "Custom"、"Branded"、"Personalized" 开头。

```
Brass Crown Bolt-Action Pen           ✓
Executive Zinc Alloy Letter Opener    ✓
Custom Premium Metal Pen              ✗（空洞形容词）
```

**等级词参考：** Executive / Precision / Industrial / Tactical / Professional / EDC

---

### `tagline` — 规格行

**格式：** `材料  |  关键规格  |  差异化特征`
**规则：** 纯事实，竖线分隔，不超过10个词，无动词。

```
Brass · Aluminum · Steel  |  G2 refill  |  28g
316 Steel  |  Pressurized cartridge  |  Glass breaker
Solid brass  |  Tungsten carbide tip  |  3+ min spin
```

---

### `description` — 主文案段落

**字数：** 60–100词
**结构：** 先说这是什么 → 材料/机制 → 使用场景 → 品牌展示价值
**规则：** 不用 "perfect"、"beautiful"、"stunning"。数字优于形容词。

---

### `highlights` — 亮点列表

**格式：** 每条以名词短语开头，不用句号，不重复 description 内容
**数量：** 3–5条

```
✓  Solid brass construction — develops natural patina with handling
✓  Crown bolt-action mechanism — audible click, one-handed operation
✗  Premium quality materials（空话）
✗  Perfect for any professional（消费者语气）
```

---

### `specifications` — 规格表

提供以下数据，填入 `{label, value}` 格式：

```
Material / Weight / Dimensions（必填，长×宽×高+单位）/ Tip / Refill type
Surface finish / Engraving area / MOQ / Lead time / Packaging
```

**⚠️ Dimensions 行为强制字段。从产品图片信息文件读取，不手填，无数据则停止写稿。**

---

### `customizationOptions` — 可定制项

一句话每条：

```
Laser engraving on barrel (logo, text, or serial numbers)
Anodized color: natural / black / gunmetal / rose gold
Custom packaging box with hot foil stamping
```

---

### `faqs` — 常见问题

**格式：** 问句 + 1–3句答案，站在买家角度提问
**数量：** 2–4条
**常见问题类型：** 材料安全性、刻字效果、MOQ、交货周期、与套件搭配关系

```json
{
  "q": "Can the engraving include a full company logo?",
  "a": "Yes. We accept vector files (AI, EPS, SVG). Logo is laser-engraved directly into the brass — not printed. The depth is 0.1–0.2mm, permanent and resistant to wear."
}
```

---

### `sourcingNotes` — 采购顾问注释（单品）

- 1–3条，只有确实有不同角度时才增加
- 从"行内采购人"视角写，不从"销售员"视角写
- 不重复 highlights 已说的内容
- 只写客户可见的采购判断和产品解释，不写内部写稿建议

---

## 套件字段格式规范

### 字段清单（完整）

```
name            — 套件名
tagline         — 短语（4–8词）
definition      — 一句话定义
heroCopy        — 主文案段落（100–150词）
sellingPoints   — 3个卖点（title + body）
components      — 组件列表
targetBuyer     — 目标买家描述
packaging       — 包装方式
cta             — 行动召唤短语
fob             — 价格区间
sourcingNotes   — 5条采购顾问注释（title + body）
```

---

### `name` — 套件名

**格式：** "The [名词]" 或 "The [形容词 + 名词]"
**规则：** 不描述内容物，描述使用场景或情感。

```
The Desk Starter      ✓
The Morning Ritual    ✓
The 3-Piece Metal Set ✗（太 literal）
```

---

### `tagline` — 套件标语

**格式：** 4–8词，句号结尾或无标点，平行结构

```
Three tools. Every desk.
Titanium and brass. Nothing else.
Built for the field. Sharp enough for the office.
```

---

### `heroCopy` — 主文案段落

**字数：** 100–150词
**结构：** 第一句说选品逻辑 → 逐一描述每件单品功能 → 总结套件整体价值
**规则：**
- 每件产品至少一句话，说清楚它做什么
- 材料名词具体（brass、titanium、stainless 316，不写"metal"）
- 以套件整体收尾，不以单品收尾

---

### `sellingPoints` — 3个卖点

**结构：** `title`（观察/结论，8词以内）+ `body`（40–70词，商业价值）
**规则：** title 是结论不是功能描述；body 解释商业价值不重复 title

**三个卖点应覆盖：**
1. 最重要的单品功能亮点
2. 材料一致性 / 套件整体感
3. 目标场景下的差异化价值

---

### `packaging` — 包装

从以下选：
```
Corrugated Packaging Box + EVA Foam Insert
Magnetic Closure Box + EVA Foam Insert + Soft-Touch Lamination
Drawer Rigid Gift Box + EVA Foam Insert
Rigid Lid Gift Box + EVA Foam Insert
Tin Box + EVA Foam Insert
Wooden Box + EVA Foam Insert
```

---

### `cta` — 行动召唤

**格式：** 3–8词，陈述或命令式，不用感叹号，呼应套件核心主张

```
Three aluminium tools. One consistent brand mark.
Turn day one into a brand moment.
```

---

### `fob` — 价格区间

格式：`$XX–XX`（FOB价，不含运费）

---

### `sourcingNotes` — 5条套件采购注释

**数量：** 固定5条
**格式：** `title`（Why … / How … / 名词短语）+ `body`（60–100词）

**必须覆盖的5个角度：**

| # | 角度 | 示例 title |
|---|------|------------|
| 1 | 选品逻辑 | Why [产品] for [场景] |
| 2 | 材料深度解析 | Why [材料] ages better than any finish |
| 3 | 包装工程（材料、工艺细节） | EVA Foam Insert Engineering |
| 4 | 包装工艺选择（烫金、丝印等） | Logo on Packaging: [方法] |
| 5 | 升级选项 | Alternative: [升级方案] |

---

## 数据核实规则

### 必须核实的字段

| 字段类型 | 风险 | 核实方式 |
|----------|------|---------|
| 材料纯度（"纯钛" vs "钛合金"） | 供应商常混用 | 搜索核实 |
| 性能数字（写字距离、旋转时长等） | 可能是厂家宣传值 | 搜索 + 缓冲词 |
| 机制名称（bolt-action、bolt-click） | 中文描述可能对应错误英文术语 | 搜索核实 |
| 材料等级（316 stainless、G2 refill） | 规格不同品质差异大 | 搜索核实 |
| 食品安全声明 | 需有依据才写进文案 | 搜索核实 |
| 特殊功能（RFID blocking、glass breaker） | 需确认原理成立 | 搜索核实 |

### 核实后处理规则

- **数据确认**：直接写入文案
- **数据存疑**：用缓冲词：up to / typically / depending on surface
- **无法核实**：告知用户，删除该声明
- **数据被推翻**：告知具体差异，等用户确认后再写

---

## 中文输入模板

### 单品

> **写稿前必须先做：** 读取该产品对应的图片信息文件（路径：`public/products/WP-XXX-*/`），直接提取尺寸数据。若文件无尺寸，先告知用户，等确认后再写。

```
产品名称（中文）：
材料：
重量 / 尺寸：（从产品图片信息文件读取，不手填）
核心功能 / 机制：
刻字方式：
差异化特点（和同类产品比）：
搭配哪些套件（可选）：
```

### 套件

```
套件名想法（中文或关键词）：
包含单品（SKU + 名称）：
目标买家场景：
价格区间（FOB）：
包装形式：
套件主卖点（你想强调什么）：
```

---

## 默认质量检查

- 删除防御性表达：`not filler`、`not decorative`、`not just`、`rather than` 类辩护句。
- 标准包装和 sourcingNotes 中的包装描述必须一致。
- 木盒、软触覆膜、内页印刷等只在确认为标准包装时写入 packaging 字段；否则放入 upgrade options。
- 不写成本数字、交期承诺、无法核实的最高级或市场唯一性。
- CTA 引导询价，不使用零售购买语言。
- 中英文版本以英文为主，中文为直译核查稿。
- 客户可见字段（description、highlights、faqs、sourcingNotes、keyInsight、comparisonTable）禁止出现内部写稿语言。

---

*最后更新：2026-05-28*

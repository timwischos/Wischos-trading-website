# Wischos 产品文案写作原则

适用范围：套件（giftSets.ts）和单品（products DB）的所有文案字段，包括 tagline、heroCopy、sellingPoints、expertNotes/sourcingNotes、description、highlights、faqs。

对标品牌：Ugmonk、Bellroy for Business、Shinola B2B、Moleskine Business

---

## 一、整体定位

- 目标读者是 **B2B 采购决策者**，不是消费者
- 引导询价，不引导下单
- CTA 用 "Send an Inquiry" / "Submit Inquiry"，不用 "Buy now" / "Shop now" / "Add to cart"

---

## 二、语气和风格

### 1. 陈述事实，不做辩护

只说是什么，不解释"为什么不是另一种"。

❌ "Two materials chosen for their specific roles, not for visual uniformity."
✅ "Brass for the pen and letter opener. Anodised aluminium for the stand."

### 2. 不写防御性语句

❌ "This isn't decorative."
❌ "reads as intentional, not mixed."
❌ "reads as considered, not inconsistent."
✅ 直接描述物理事实或功能

**例外：帮买家建立手感或使用预期的对比表述可以保留。**

这类表述不是辩护，而是在给买家建立物理认知——重量、尺寸、触感等维度需要参照物才有意义。

✅ "28g hand weight — heavier than standard office pens without becoming oversized"（建立重量预期）
✅ "noticeably heavier than standard aluminium desk pens, which typically run 20–30g"（给出数据参照）
❌ "reads as considered, not inconsistent."（为设计决策辩护，无物理事实）
❌ "without becoming a gimmick"（防御性否定）

判断标准：这句话是在描述买家会感受到什么，还是在解释为什么产品不差？前者可留，后者删。

### 3. 买家视角优先（you / your team）

用 "your" 直接对话买家，避免 "the recipient" 第三人称漂移。

❌ "makes the brand visible when no one is using it"
✅ "your logo visible every time someone swipes in"

### 4. Tagline 要有画面感，不是列举

有行为、有场景、有留白——参考："Carry less. Do more."

❌ "Two metals. Three objects. One desk worth noticing."（列举）
✅ 一句话里有动作或场景

### 5. 句式节奏——短句陈述，长句解释

- 短句用于事实陈述和冲击感
- 长句只用于技术/工艺说明
- 不用一个冗长复合句说一件简单的事

❌ "Each piece has a distinct mechanical interaction and a daily function behind it that keeps your brand in contact more often."
✅ "The pen writes. The letter opener opens. The stand holds."

### 6. Selling Point 标题是具体陈述，不是营销口号

标题应是一个具体功能或事实发现，不做对比式抽象概括。

❌ "Built to Be Used, Not Just Handled"
✅ "Bolt-Action Pen — Clicks and Writes Daily"

### 7. "We" 的使用边界

- 产品描述：以产品/物品为主语，不用"we"
- CTA / 询盘引导：可以用（"reach out and we'll advise"）
- Sourcing Notes：有限使用（"our catalog"可以，"we believe"不可以）

---

## 三、内容结构规则

### 8. Sourcing Notes 是行业背书，不是卖点复读

- 不重复 sellingPoints 已说过的内容
- 应带出：行业数据、采购行为观察、材质工艺技术细节、使用场景
- 从"行内采购人"视角写，不从"销售员"视角写
- 只写**客户可见**的采购判断和产品解释，不写内部写稿建议、审核结论、选图要求或页面策略
- 有内容才写，不硬凑条数；单品 Sourcing Notes 可以是 1–3 条，只有确实有不同角度时才增加

客户可见字段包括：`description`、`highlights`、`faqs`、`sourcingNotes`、`keyInsight`、`comparisonTable`、`quickAnswer`、`metaDescription`。

这些字段里禁止出现写给内部团队的话：

❌ "the copy should make the hand weight clear"
❌ "the copy should stay within that use case"
❌ "Positioning it as an executive boardroom item would fight the product signals"
❌ "The strongest visual context is..."
❌ "Product images should show..."
❌ "页面应..." / "文案应..." / "不这样写..."

改法：把内部判断改成客户可见事实。

❌ "The copy should keep capacity tied to compact daily use."
✅ "Capacity is best discussed around compact daily use because cash and card thickness vary by market."

❌ "The product page should not claim full titanium construction."
✅ "The inner liner and removable infuser are pure titanium; the exterior is a titanium-gold finish."

❌ "Product images should stay in office scenes."
✅ 删除。图片要求属于内部资产 brief，不进入产品文案。

套件 Sourcing Notes 标准结构（5条）：
- Note 1–2：选品逻辑、材质或功能的行业背景
- Note 3：标准包装实际构成（对应 packaging 字段）
- Note 4：盒面 logo 工艺选项
- Note 5：升级选项（不含成本数字）

### 9. 包装描述必须与 packaging 字段一致

对照套件的 `packaging` 字段写对应盒型：
- Magnetic Rigid Gift Box → 描述磁扣盒
- Drawer Rigid Gift Box → 描述抽屉盒
- Rigid Lid Gift Box → 描述天地盖盒

不能出现实际不使用的包装类型（如锡罐、牛皮纸箱）。

### 10. 不写成本或价格数字

❌ "adds $4–7/unit"
❌ "adds approximately $1.50–2.50/unit at MOQ 100"
✅ "available on request" 或只说有这个选项

### 11. 不写夸张或无法核实的声明

❌ "the highest-tier set in the lineup"（自我定位，不由自己说）
❌ "immediately signals" / "dramatically elevates"（夸张副词）
❌ "aerospace-grade aluminum"（过度营销词，改用 "anodised aluminium alloy"）

### 12. 不直接说 "unisex" 或 "not gender-specific"

改为描述功能的普遍适用性：

❌ "not gender-specific — and none of them assume the recipient sits at a desk"
✅ "keys, cards, and a comb are daily-carry items for any professional in any environment"

### 13. FAQ 只回答买家问题，不承载内部策略

FAQ 会进入页面和 FAQ schema，必须像客户直接提问后的回答。

FAQ 禁止写：
- 文案该怎么写
- 产品应该如何定位
- 图片应该怎么拍
- 哪些话术要避免
- 内部合规提醒的原话

❌ Q: "Is this mainly a visual product?"
   A: "The copy should focus on material, double-wall structure, and gift-set role."

✅ Q: "Is this mainly a visual product?"
   A: "It is compact titanium drinkware with a distinct shape. The main value is the pure titanium body, double-wall structure, and gift-set presentation role."

❌ Q: "Is this suitable for formal desk gifting?"
   A: "It should be used in the right gift context."

✅ Q: "Is this suitable for formal desk gifting?"
   A: "It fits travel kits, EDC sets, and wellness packs where personal-care items are appropriate. For formal desk programs, writing tools or desk accessories are usually a cleaner fit."

### 14. 上线前必须扫内部口吻

每次写入 DB 或生成上线脚本前，必须扫描客户可见字段，确认没有内部写稿语言。

重点禁止词：

```text
copy should
product page should
should limit
should present
should show
Positioning it as
fight the product signals
decorative claim
claim control
claim accurate
keep the claim
keep those use cases
visual context
lifestyle imagery
Product images should
文案应
页面应
不这样写
英文页面
```

如果这些词出现在 `faqs`、`sourcingNotes`、`keyInsight`、`description`、`highlights`、`comparisonTable` 中，默认判为需要改写，除非它确实是在内部文档而不是客户可见内容。

---

## 四、SEO 关键词规则

- Tagline / Hero Copy：自然植入 `custom metal corporate gift`
- 正文：用 `corporate`，不用 `promotional`
- 产品页：加 `engraved`
- 不堆砌：每个字段关键词最多出现一次

---

## 五、数据核实原则

- 写有具体数字的功能描述前，核实来源（如"writes up to 20,000m"）
- 数据存疑时用缓冲词：up to / typically / depending on surface
- 不自行编造规格数据

---

## 六、中英文输出规范

- 中文为**直译**，以英文为准
- 目的：让用户通过中文直译来核查英文表达是否准确
- 行业术语保留英文原文（如 EVA、CNC、FOB、gsm）

---

## 七、禁止的 C 端语言

| 禁止写法 | 原因 |
|---|---|
| "Start your sample order today" | 像零售下单 |
| "Most samples ship within 7 business days" | 过度承诺时效 |
| "We respond within X business day(s)" | 过度承诺响应 |
| "You may also like" | 电商推荐语言 |
| "Premium" 用于营销标题 | 空洞形容词 |
| 价格锚点（如 "FOB from $38"）出现在正文 | B2B买家习惯询价前不知价格 |

---

*最后更新：2026-05-02*

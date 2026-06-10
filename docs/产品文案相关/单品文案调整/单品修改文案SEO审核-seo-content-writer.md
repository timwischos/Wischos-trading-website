# 单品修改文案 SEO 审核（seo-content-writer）

审核日期：2026-04-29  
使用技能：`seo-content-writer`  
审核对象：`docs/2019-4-29 单品文案修改.md` 中所有单品修改内容，包括：
- 5 个完整 DB 文案重写稿：WP-205、WP-102、WP-101、WP-304、WP-207
- 剩余全部单品的 tagline 和改写方向清单

说明：本轮没有连接外部 SEO 工具或 Search Console，审核依据为技能的 SEO 写作检查项、CORE-EEAT 约束、项目内买家搜索意图研究和当前产品页实现方式。

---

## 一、总评

这份单品修改文案的方向是正确的。它已经把旧文案中最影响 B2B 信任的几类问题压下去了：

- 过度销售语气减少
- `promotional` 式低价礼品语义减少
- 材料、结构、工艺、使用场景更清楚
- FAQ 更接近采购问题
- Sourcing Notes 更像产品/采购解释，而不是销售补刀

但从 `seo-content-writer` 的标准看，它还没有完全达到“可直接上线的 SEO 产品页文案”标准。主要缺口集中在 6 个地方：

1. 产品页 meta description 当前使用 `tagline`，所以 tagline 不能只当规格行看。
2. 5 个完整重写稿缺少 `seoKeywords`。
3. 多数 description 没有稳定放入核心检索词：`custom`、`engraved`、`corporate gift`、`branded`。
4. FAQ 有采购价值，但还不够“snippet-friendly”。
5. 部分数字、材料和功能声明需要证据确认。
6. 剩余单品只有改写方向，还不是可审核的完整 SEO 文案。

---

## 二、关键技术发现

当前产品详情页的 head 逻辑在：

`src/routes/{-$locale}/products/$productId.tsx`

当前实现：

```text
title = product.name + " | Corporate Gift"
meta description = product.tagline
Product JSON-LD description = product.description
FAQPage JSON-LD = product.faqs
```

这意味着：

- `tagline` 不只是页面副标题，也直接变成搜索结果描述。
- 如果 tagline 只是 `Material | Size | Feature`，meta description 会偏硬，缺少点击理由。
- `description` 会进入 Product JSON-LD，对 AI/搜索引擎理解产品很重要。
- `faqs` 会进入 FAQPage JSON-LD，所以 FAQ 问答必须直接、准确、可独立引用。

结论：单品文案上线前，建议增加独立 `metaDescription` 字段，或修改产品页 head 逻辑，不要继续把 `tagline` 直接当 meta description。

---

## 三、CORE-EEAT 审核

| 项目 | 结果 | 说明 |
|---|---|---|
| Intent Alignment | Pass | 目标读者已从消费者转为 B2B 采购方。 |
| Direct Answer | Warn | 产品是什么通常在第一句说清楚，但“适合买什么场景”有些产品放得偏后。 |
| Audience Targeting | Pass | 多数稿件明确面向 conference、onboarding、client gifting、desk sets 等采购场景。 |
| Heading / Field Structure | Pass | 5 个完整稿结构完整，符合 DB 字段顺序。 |
| Information Density | Pass | 大部分句子具体，不再靠形容词撑文案。 |
| Query Coverage | Warn | FAQ 覆盖采购问题，但缺少部分高频搜索问句。 |
| Data Precision | Warn | 有具体数字和功能声明，但不是每条都能看到来源。 |
| Evidence-Claim Mapping | Warn | 技术声明需要供应商规格或产品实测支持。 |
| FAQ Snippet Fit | Warn | FAQ 有价值，但部分答案超过最佳摘要形态或没有直接回答开头。 |
| Internal Link Fit | Warn | 文案没有规划产品与套件、博客之间的内链锚点。 |

---

## 四、必须修正项

### 1. 不要让 tagline 独自承担 meta description

严重度：高

当前新 tagline 的方向是规格行，例如：

```text
Brass / aluminium / stainless steel | G2 refill | 28g bolt-action pen
```

这适合产品页视觉展示，但作为 meta description 太短、太硬，缺少搜索点击理由。

建议新增产品页 meta 规则：

```text
[Product name] for custom corporate gifting. [Material/function]. Supports logo engraving and branded packaging for bulk business orders.
```

示例：

```text
Brass Crown Bolt-Action Pen for custom corporate gifting, with G2 refill compatibility, mixed-metal construction, and logo engraving options.
```

---

### 2. 补 `seoKeywords`

严重度：高

5 个完整重写稿都缺少 `seoKeywords`。现有 DB schema 已有这个字段，产品页内容也已有 SEO keywords 的历史使用习惯。

建议每个产品使用 8-12 个关键词，结构如下：

```text
- [core product term]
- custom [product] with logo
- engraved [material/product]
- corporate [product] gift
- branded [product]
- [use case] gift
- [material] [product] bulk order
```

不要加入：

```text
- promotional metal pen
- cheap corporate gift
- luxury gadget
- cool toy
```

---

### 3. Description 要更早放入核心搜索词

严重度：高

技能要求主关键词进入前 100 词。产品页对应到这里，就是 description 第一段或第二段必须自然出现核心检索词。

建议每个完整稿至少自然出现一次：

```text
custom engraved
corporate gift
branded
bulk order
company logo
```

不要堆砌。每个字段一次即可。

---

### 4. FAQ 要按可摘录答案重写

严重度：中高

FAQ 会进入 FAQPage JSON-LD，所以每个答案建议保持：

- 第一句直接回答
- 总长度 40-60 词左右
- 不用空泛营销语
- 避免“看情况”开头，必要时第二句再加条件

建议每个产品至少有 1 个搜索型 FAQ：

```text
Q: Can this product be ordered with a custom company logo?
Q: Is this product suitable for corporate gift sets?
Q: What branding method works best on this product?
Q: Can this product be used for onboarding or conference gifts?
```

---

### 5. 核实具体数字和功能声明

严重度：中

需要上线前确认的内容：

- WP-205：`Approx. 20g`
- WP-102：`Up to 20,000m writing life`
- WP-101：`28g`
- WP-207：`Custom magnetic strength by production spec`
- 剩余单品表格中的尺寸、重量、容量、材质牌号、卡片数量、钢材型号等

处理原则：

- 有供应商规格或实测数据：保留
- 只是估算：使用 `approx.`、`up to`、`depending on production spec`
- 不确定：先不进上线文案

---

## 五、5 个完整重写稿逐项审核

### WP-205 Precision Custom Metal Bookmark

SEO 状态：较好，但需要补关键词和 meta。

优点：

- 主词 `custom metal bookmark` 已出现在开头。
- `laser engraving`、`chemical etching`、`custom profile cutting` 是明确长尾词。
- FAQ 覆盖 logo、工艺、材料、形状，适合 FAQPage。
- 场景词有 `conference gifts`、`onboarding kits`、`branded desk sets`。

问题：

- `cost target` 不适合进入 highlight，会削弱高质量定位。
- `Standard Weight: Approx. 20g` 需要核实。
- 缺少 `seoKeywords`。
- 没有单独 meta description。

建议补充关键词：

```text
custom metal bookmark
engraved metal bookmark
corporate bookmark gift
branded bookmark with logo
laser engraved bookmark
chemical etched metal bookmark
custom brass bookmark
stainless steel bookmark bulk order
conference gift bookmark
onboarding kit bookmark
```

建议 meta description：

```text
Custom metal bookmark for corporate gifting, with brass, stainless steel, or zinc alloy options and laser engraving or chemical etching for logos.
```

---

### WP-102 Executive Dual-Head Metal Pen

SEO 状态：中等，搜索入口偏弱。

优点：

- 产品差异点清楚：rollerball + inkless tip。
- 已避免把产品写成 ESG 概念。
- FAQ 对 inkless tip 的解释有摘要价值。

问题：

- `Metal body` 太泛，材料实体不够具体。
- 第一段缺少 `custom engraved metal pen` 或 `corporate gift`。
- `lower-consumable` 不是自然搜索语言。
- `Up to 20,000m` 需要来源确认。
- 缺少 `seoKeywords`。

建议改 description 第二段：

```text
The metal body gives the pen more stability in hand than standard plastic office pens, while the dual-head format reduces desk clutter in meeting rooms, onboarding kits, and conference packs. It works as a custom engraved metal pen for corporate gift programs where buyers want one writing tool with both a conventional refill and an inkless secondary tip.
```

建议补充关键词：

```text
dual head metal pen
inkless rollerball pen
custom engraved metal pen
corporate pen gift
branded pen with logo
conference gift pen
employee onboarding pen
inkless pen corporate gift
metal office pen bulk order
```

---

### WP-101 Brass Crown Bolt-Action Pen

SEO 状态：较好，适合作为主力单品页。

优点：

- `bolt-action pen`、`G2 refill`、`laser engraving`、`brass / aluminium / stainless steel` 都是强实体词。
- FAQ 对替芯、logo 位置、机制、颜色选择都实用。
- 和 WGS-002 / WGS-005 的套件语境一致。

问题：

- Description 没有直接出现 `engraved`。
- `corporate gift` 只在 notes 里出现，不够靠前。
- 缺少 `seoKeywords`。
- 当前 tagline 如果作为 meta description，点击吸引力不足。

建议改 description 第二段：

```text
Suitable for conference gifts, branded desk sets, and client gifting where the buyer wants a custom engraved bolt-action pen with a visible mechanical feature and refill compatibility that can be maintained locally.
```

建议补充关键词：

```text
brass bolt action pen
custom bolt action pen
engraved bolt action pen
corporate pen gift
G2 refill metal pen
brass aluminium pen
branded desk pen
conference gift pen
client gift pen
custom logo metal pen
```

---

### WP-304 Titanium Anti-Static EDC Comb

SEO 状态：中等偏弱，需要稳定关键词承接。

优点：

- 产品身份已收稳为 comb first, opener second。
- `titanium`、`anti-static comb`、`bottle opener` 是清楚实体。
- FAQ 主动澄清产品用途，有利于减少错配流量。

问题：

- 搜索词会分散在 `hair comb`、`beard comb`、`EDC comb`、`bottle opener` 之间。
- Description 缺少 `custom logo`、`corporate gift`。
- 没有回答“是否适合 corporate gift sets”。
- 若目标是 B2B 礼品，`grooming item` 需要谨慎，避免过强私人护理语境。

建议新增或替换 FAQ：

```text
Q: Is this suitable for corporate gift sets?
A: Yes. The flat titanium format works in EDC sets, welcome kits, and compact branded carry programs. The comb remains the primary function, while the bottle opener adds secondary utility without increasing the product footprint.
```

建议补充关键词：

```text
titanium EDC comb
anti static titanium comb
custom engraved titanium comb
branded EDC comb
titanium comb bottle opener
corporate EDC gift
custom logo titanium comb
pocket comb corporate gift
EDC gift set accessory
```

---

### WP-207 Carbon Fiber Magnetic Fidget Stick

SEO 状态：中等偏弱，但定位修正是正确的。

优点：

- 已避开 C 端玩具语气。
- `carbon fiber`、`magnetic joints`、`kinetic desk object` 有差异化。
- FAQ 主动处理 “toy” 误解。

问题：

- `fidget` 本身会带来 C 端和玩具流量。
- `kinetic desk object` 准确，但自然搜索量可能有限。
- Description 缺少 `custom logo desk gift` 或 `corporate gift`。
- `Custom magnetic strength` 可能是生产承诺，需确认后再上线。

建议改 description 第二段：

```text
Suitable as a custom logo desk gift for engineering teams, design studios, and conference programs where the buyer wants a small kinetic object rather than a conventional writing or drinkware item.
```

建议补充关键词：

```text
carbon fiber fidget stick
magnetic fidget stick
kinetic desk object
custom logo desk gift
engineering team corporate gift
design studio desk gift
branded magnetic desk object
carbon fiber desk accessory
conference desk gift
```

---

## 六、剩余单品调整清单审核

剩余单品目前只有 tagline 和改写方向，因此只能审核“方向”，不能审核最终 SEO 成品。

### 方向通过的产品

这些产品的新 tagline 方向清楚，后续扩展成完整 DB 文案即可：

- WP-103 Tactical Stainless Steel Pen with Glass Breaker
- WP-104 6-in-1 Precision Metal Tool Pen
- WP-201 Professional Aluminum Mouse Pad
- WP-202 Precision Aluminum Pen Holder
- WP-204 Propeller Spinning Letter Opener
- WP-208 Precision Folding Aluminium Device Stand
- WP-301 RFID Aluminum Wallet & Badge Holder
- WP-302 Industrial Brass Key Organizer
- WP-303 Industrial Stainless Steel Money Clip
- WP-305 Industrial Mini EDC Pry Bar
- WP-307 EDC Folding Metal Scissors
- WP-308 Titanium EDC Carabiner with Bottle Opener
- WP-401 Pure Titanium Vacuum Insulated Bottle
- WP-402 Pure Titanium Capsule Bottle
- WP-407 Double-Wall Stainless Steel Desk Cup

### 需要额外注意的产品

#### WP-203 Executive Zinc Alloy Letter Opener

问题：`Executive` 仍可能偏营销等级词，但可以接受。上线时 description 要靠工艺和场景支撑，不要继续写 `premium`。

建议 SEO 主词：

```text
engraved letter opener
zinc alloy letter opener
corporate desk gift
custom logo letter opener
```

#### WP-206 Precision Kinetic Brass Spinning Top

问题：`kinetic` 是好词，但搜索需求可能窄。不要写健康、专注、心理收益，避免无证据声明。

建议 SEO 主词：

```text
brass spinning top
engraved brass desk object
kinetic desk gift
corporate desk accessory
```

#### Weighted Vacuum Insulated Office Tumbler

问题：命名没有 SKU，后续落库前应统一 ID / SKU / 产品名。否则 SEO 和 catalog 管理会混乱。

建议 SEO 主词：

```text
custom stainless steel tumbler
office tumbler corporate gift
branded insulated tumbler
full wrap print tumbler
```

#### Bamboo-Groove Stainless Steel Mug

问题：文档里也指出场景需先定。SEO 不能同时打 `desk mug` 和 `outdoor mug` 两套意图。

建议先决定主意图：

```text
outdoor corporate mug
field team stainless steel mug
branded stainless steel mug
```

#### Ice-Crystal Pure Titanium Egg Cup

问题：命名视觉感较强，容易像 C 端礼品。若继续保留，必须用材料、双层结构、容量、饮用场景支撑。

建议 SEO 主词：

```text
pure titanium cup
double wall titanium cup
small titanium drink cup
custom titanium cup
```

#### Executive Zinc Alloy Nail Clipper with Keychain

问题：产品天然偏个人护理，B2B 搜索意图弱。需要明确它是否适合 EDC kit / travel kit / employee wellness kit。

建议 SEO 主词：

```text
keychain nail clipper
custom logo grooming tool
corporate travel kit accessory
branded keychain tool
```

---

## 七、统一 SEO 模板

后续每个单品完整落库时，建议按这个模板检查。

### Product Title / Name

```text
[Material or qualifier] [product type]
```

要求：
- 不用 `Custom` 开头
- 不用 `Premium` 填空
- 产品类型必须明确

### Tagline

```text
[Material] | [key spec] | [functional differentiator]
```

要求：
- 适合页面副标题
- 但如果仍被用作 meta description，需要另写 meta

### Description

第一段：

```text
What it is + material/structure + main function
```

第二段：

```text
Corporate gifting use case + logo/branding method + buyer reason
```

### SEO Keywords

```text
[core product]
custom [product] with logo
engraved [product]
corporate [product] gift
branded [product]
[use case] gift
[material] [product] bulk order
```

### FAQ

至少覆盖：

```text
Can this product be ordered with a custom company logo?
What branding method works best on this product?
Is this product suitable for [onboarding/conference/client gift/desk set]?
What material or finish should buyers choose?
```

### Sourcing Notes

至少覆盖：

```text
Material logic
Mechanism or process logic
Where it fits in B2B gifting
```

---

## 八、上线前阻塞项

这些事项解决前，不建议直接把新文案批量写回数据库：

1. 决定产品页是否新增独立 meta description。
2. 给 5 个完整重写稿补 `seoKeywords`。
3. 核实所有具体数字、材料牌号、容量、重量、卡片数量、钢材型号。
4. 把 FAQ 答案压成更适合 FAQPage JSON-LD 的直接答案。
5. 给剩余单品补完整 DB 字段后再做第二轮审核。

---

## 九、Handoff Summary

### Content Deliverable

完成了对所有单品修改文案的 SEO 审核。5 个完整重写稿已逐项审查，剩余单品的 tagline 与改写方向已按 SEO 风险分组。

### Approved Angles

- 继续采用 B2B 采购语气。
- 主文案以材料、结构、工艺、使用场景为主。
- 产品页应优先使用 `custom / engraved / corporate gift / branded / bulk order` 等自然高意图词。
- 不建议恢复 `promotional`、`cheap`、`perfect gift`、`premium` 等旧风格词。

### Missing Evidence

- 部分重量、尺寸、容量、材质牌号和功能寿命需要供应商规格或实测数据确认。
- WP-207 的磁力可定制声明需要生产端确认。

### Publish Blockers

- 缺少 `seoKeywords`。
- 产品页 meta description 当前直接使用 tagline。
- 剩余单品还不是完整 DB 文案，只能作为方向通过，不能视为最终可上线文案。

### Recommended Next Step

先改产品页 meta 逻辑或补独立 meta 字段，再给 5 个完整重写稿补 `seoKeywords` 和 snippet-friendly FAQ。

---

## 十、WP-106 补充 SEO 审核（2026-04-30）

审核对象：`docs/单品文案调整/单品文案修改稿-seo+geo.md` 中 `WP-106 Solid Brass Ballpoint Pen`

使用技能：`seo-content-writer`

审核状态：`PASS_WITH_CONCERNS`

说明：本次为 WP-106 单品补充审核，没有连接外部 SEO 工具、Search Console 或关键词数据库。判断依据为 `seo-content-writer` 写作检查项、当前产品页字段结构、`docs/wischos产品文案写作原则.md`，以及 WP-106 原始搜集数据。

### SEO 结论

WP-106 当前稿已经具备可进入后续页面测试的 SEO 基础。核心词 `solid brass ballpoint pen` 出现在产品名、meta、quickAnswer、description 和 seoKeywords 中；`custom`、`engraved`、`corporate gifting`、`laser logo engraving` 等 B2B 高意图词也自然出现，没有明显关键词堆砌。

### 优点

- 产品名 `Solid Brass Ballpoint Pen` 比原先 `Solid Brass Clip Ballpoint` 更符合搜索习惯。
- `metaDescription` 清楚覆盖核心产品词、材质、笔夹、表面、笔芯和 logo 工艺。
- `quickAnswer` 是可摘录定义句，适合产品页首段和 AI 摘要。
- description 前 100 词能说明产品是什么、用于什么场景、核心规格是什么。
- FAQ 覆盖 logo、finish、refill、weight 四个采购问题，适合 FAQPage JSON-LD。
- `seoKeywords` 覆盖核心词、custom/engraved 词、corporate gift 词和 bulk order 词。
- Sourcing Notes 标题为陈述式，没有使用 `Why X` 说服式标题。

### 需要关注的问题

1. **规格数据仍需核实**

   原始搜集数据中长度存在 `56mm` 与脚本文案 `156mm` 的冲突，重量也有 `48g / 58g` 差异。当前稿使用 `Approx. 156mm` 和 `Approx. 50g; source data ranges 48g-58g` 是合理的上线前缓冲写法，但最终写入数据库前仍需样品或供应商规格确认。

2. **refill 格式不能写死**

   当前写法只说 `0.5mm black ballpoint refill, exact replacement format to confirm`，这是正确处理。不要在未核实前写成 G2、Parker 或 universal refill。

3. **metaDescription 可以上线，但略长**

   当前 meta：

   ```text
   Custom solid brass ballpoint pen for corporate gifting, with cylindrical metal clip, polished or matte finish options, 0.5mm black refill and laser logo engraving.
   ```

   内容完整。若后续需要更紧凑，可压缩为：

   ```text
   Custom solid brass ballpoint pen for corporate gifting, with cylindrical clip, polished or matte finish, 0.5mm refill and laser logo engraving.
   ```

4. **可增加一个更直接的购买场景 FAQ**

   当前 FAQ 已可用。若后续页面有空间，可补一条：

   ```text
   Q: What corporate gift programs does this pen fit?
   A: It fits executive desk sets, conference writing instruments, client gifts, and onboarding kits where the buyer wants a custom engraved brass pen with visible material weight and formal desk use.
   ```

### SEO 自检

| 项目 | 状态 | 说明 |
|---|---|---|
| Primary keyword in product name | Pass | `Solid Brass Ballpoint Pen` 清楚。 |
| Meta description | Pass | 覆盖材质、用途、工艺和 B2B 场景。 |
| First 100 words | Pass | 产品定义、重量、clip、refill 都出现较早。 |
| Search intent | Pass | 面向 corporate gifting、desk writing、meetings、signatures。 |
| Keyword stuffing | Pass | 关键词自然，没有重复堆叠。 |
| FAQ snippet fit | Pass | 问题具体，答案直接。 |
| Data precision | Warn | 长度和重量仍需样品/供应商规格确认。 |
| Evidence mapping | Warn | 原始数据来自供应商页面和图片参数，但最终规格未实测。 |

### 推荐处理

WP-106 当前 SEO 文案可以保留在修改稿中。上线前重点不是重写，而是核实规格数据，并决定产品页是否读取独立 `metaDescription` 字段。

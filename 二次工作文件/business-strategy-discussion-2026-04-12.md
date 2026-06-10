# 套件选品与文案更新记录
_讨论日期：2026-04-09_

---

## 一、品牌方向确认

### 目标定位
- **参照品牌**：Craighill 的 B2B 版本
- **核心逻辑**：做金属礼品的小众赛道，不追求品类宽度，追求选品逻辑的严密性
- **文案调性**：B2B 专业感，但不是通货 swag；不像 Craighill 那么 D2C；不用过多采购行话

### 文案禁用语（已在全站清除）
| 禁用 | 原因 |
|------|------|
| "ESG-aligned product story that resonates with sustainability-conscious procurement teams" | 太刻意，像在替买家写采购报告 |
| "Broader targeting, fewer returns" | 内部选品逻辑，不是给买家看的 |
| "A sharp first impression at a practical MOQ" | MOQ 进 CTA 破坏质感 |
| "Photographed together, they read as a single designed system" | catalog 摄影行话 |
| "Maximizes ROI on packaging spend" | 财务术语 |
| "Differentiated Sector Gifting" | 框架术语，非产品语言 |
| "first bulk order clients" | 内部分类，不是客户描述 |

---

## 二、选品原则重新理解

原 UIS+C 框架在此次讨论中修正了执行方式：

**不要求每件单品同时满足所有原则**，而是：
- 三件套中每件可以各自主打一个原则（一件主 U、一件主 I、一件主 S）
- **套件层面**的组合逻辑合理即可，单品之间逻辑不过分牵强就成立
- 这是 Craighill 的真实逻辑——他们也卖陀螺，不用解释你为什么需要它

**C（Cohesive）存在两种合法形式：**
1. **场景统一**：同一个时间/地点/动作下都会用到（WGS-006 入职第一天、WGS-003 口袋随身）
2. **体验统一**：组合逻辑是触感/材质体验的一致性（WGS-002 全黄铜机械触感）

---

## 三、套件变动汇总

### WGS-001 The Desk Starter

**选品变动：**
| 位置 | 原产品 | 新产品 | 状态 |
|------|--------|--------|------|
| 组件1 | WP-102 Inkless Pen | WP-102 Inkless Pen | 不变 |
| 组件2 | WP-203 Letter Opener（铝合金） | WP-203 Letter Opener（铝合金，保留） | 不变 |
| 组件3 | WP-205 Metal Bookmark | 手机支架（新品，未采购） | **⏳ 待处理** |

**⚠️ 待处理：**
- 手机支架需要采购、入库、分配 SKU
- 分配 SKU 后更新 `src/content/giftSets.ts` 第三个 component 条目（当前仍是 WP-205 占位）
- 同时需要拍摄套件图（cover/hover/detail × 3），上传 Cloudinary

**关于铝合金开信刀：**
- WP-203 为铝合金 → 保留，维持全铝叙事（全套三件均为铝，材质最统一）
- 曾考虑换入"中国古剑样式黄铜开信刀" → **否决**
  - 原因1：破坏全铝材质统一性
  - 原因2：中国古剑造型对西方/澳洲 B2B 买家可能读作文化工艺品而非专业桌面工具

**文案更新（已完成）：**
- tagline：`Three tools. Every desk.`（移除 "No excuses"）
- heroCopy：重写为"三件铝合金桌面工具"，明确写出手机支架而非书签
- SP1：`Inkless Pen — No Refills, No Waste`，移除 ESG/procurement 行话
- SP2：`All-Aluminium Material Consistency`
- SP3：`Laser Engraving Across All Three Pieces`
- cta：`Three aluminium tools. One consistent brand mark.`（移除 MOQ）
- targetBuyer：移除"first bulk order clients"

---

### WGS-002 The Mechanical Desk

**选品：不变**（Bolt-Action Pen + Propeller Letter Opener + Brass Spinning Top）

**定位策略调整（核心）：**
- 停止假装这是"实用工具套件"
- 诚实定位为"高频触碰的品牌载体"——桌面陀螺不是工具，但被拿起的频率比笔更高
- 主打 I（Interesting）原则，U 原则退居二线
- 目标客群从"tech companies, engineering firms"改为"设计工作室、创意机构、建筑事务所、咨询公司"

**文案更新（已完成）：**
- tagline：`Three reasons your brand stays in someone's hands.`
- heroCopy：开宗明义"Not every corporate gift needs to be a tool. Some need to be picked up."
- SP1：`Built to Be Handled`（直接讲互动频率 > 实用性）
- SP2：`Solid Brass, Living Surface`（包浆=时间叙事）
- SP3：`The Desk That Starts Conversations`（具体场景：访客拿起→提问）
- expertNote1：重写为"Why tactile objects outperform practical ones"，用"interaction frequency"翻转 U 原则质疑
- cta：`Three objects. Every conversation.`
- targetBuyer：Design studios, creative agencies, architecture firms, consulting companies, innovation teams, executive thank-you gifts

---

### WGS-003 The Pocket Three

**选品：不变**

**文案更新（已完成）：**
- SP3 标题：`Works for Any Recipient`（从"Gender-Neutral Utility"改）
- SP3 正文：移除"Broader targeting, fewer returns"，改为说实际场景
- expertNote 标题：`No recipient sorting required`，移除 procurement 语气

---

### WGS-004 The Field EDC

**选品：不变**

**文案更新（已完成）：**
- SP3 标题：`The Right Set for the Right Industry`（从"Differentiated Sector Gifting"改）

---

### WGS-005 The Morning Ritual → 待重组

**选品历史：**
| 版本 | 组件1 | 组件2 | 组件3 | 问题 |
|------|-------|-------|-------|------|
| 原版 | WP-304 钛梳子 | WP-402 钛flask | WP-101 黄铜笔 | 梳子送礼有轻微尴尬感 |
| 中间版 | WP-405 钛饮杯 | WP-402 钛flask | WP-101 黄铜笔 | 两个饮水容器重复 |
| **建议新版** | **WP-207 碳纤维指尖陀螺** | **WP-402 钛flask** | **WP-101 黄铜笔** | **⏳ 待确认** |

**新版逻辑：**
- 三种顶级材料：钛（flask）+ 黄铜（笔）+ 碳纤维（陀螺）
- 不依赖"晨间"叙事，直接以材质为主题
- WP-207 目前未进任何套件，零采购成本
- 套件名考虑从"The Morning Ritual"改为材质主题命名（如"Carbon, Brass & Titanium"）
- 男女皆宜，无兼容性问题

**⚠️ 待处理：**
- [ ] 确认新版选品方向（WP-207 + WP-402 + WP-101）
- [ ] 确认套件名和文案方向
- [ ] 更新 `giftSets.ts` 组件、名称、tagline、heroCopy、sellingPoints
- [ ] 套件图需重拍（现有图含梳子），上传 Cloudinary 覆盖同名文件

---

### WGS-006 The First Day

**选品：不变**

**文案更新（已完成）：**
- SP3：移除"Photographed together, they read as a single designed system"
- expertNote"Desk Tray Box"：移除"maximizes ROI on packaging spend"

---

## 四、新产品建议（讨论结论）

### 明确需要采购
| 产品 | 用途 | 优先级 |
|------|------|--------|
| **铝/黄铜手机支架** | 填 WGS-001 第三位空缺；2026 桌面最高频使用物品；公模充足，深圳/东莞均有 | **P0** |

### 否决的建议（及原因）
| 产品 | 否决原因 |
|------|---------|
| 黄铜杯垫 | 杯垫本质不适合金属（刮桌面、噪音、不吸水）；木/竹/软木体验更好 |
| 铝理线器 | 2026 桌面线材已少；金属版夹伤线材；刚需已大幅减弱 |
| 开瓶器 | 与酒壶同样的酒精关联问题；企业采购场景不适合 |
| 登山扣 | 安全装备需品牌信任；企业礼品场景不符；户外用户应找专业品牌 |
| 金属吸管 | 你的杯具均为小容量（≤150ml），20cm 吸管比杯子还高，无法入礼盒 |
| 黄铜卷尺 | 1688 上无质量达标的公模，通货居多 |
| 钛/钢超薄卡包 | WP-301 已在 WGS-006 覆盖该品类 |

---

## 五、图片更新操作指南

### Cloudinary 图片架构
- 所有图片路径通过 `src/lib/cloudinary.ts` 的 `cloudinaryUrl()` 转换为完整 URL
- 路径即标识符：`/products/XXX/XXX.avif` → Cloudinary URL
- Supabase `products` 表存的是路径字符串，不是图片本身

### 更新图片的安全操作顺序

**方式A（推荐）：同名覆盖**
1. 在 Cloudinary 上传新图，保持原文件名和路径不变
2. 代码和数据库无需任何改动
3. 等待 CDN 缓存刷新（通常几分钟）

**方式B：改文件名**
1. 上传新图到 Cloudinary（新路径）
2. 更新 `giftSets.ts` 中对应的 `images[]` 路径
3. 如果是产品图（个品页面），还需更新 Supabase `products` 表的 `images` 字段
4. 确认线上显示正常后，再删除旧图

**⚠️ 注意：**
- 不要先删旧图再上传新图（会有短暂 404 窗口）
- seed-products.ts 是初始化脚本，改它不影响线上数据，需要直接 update Supabase

### 需要更新图片的套件
| 套件 | 需要更新的图片 | 说明 |
|------|--------------|------|
| **WGS-001** | cover, hover, detail-1/2/3 全套 | 书签换手机支架，需要重拍整套 |
| **WGS-005** | cover, hover（如含梳子），detail-1 | 梳子换钛饮杯，detail-1 当前是梳子图 |

---

## 六、代码待完成事项

- [x] **WGS-001**：✅ 2026-04-10 确认——手机支架方向放弃，WP-205 书签保留为第三件，通过文案重定位解决
  - heroCopy 改写，移除 "phone stand" 引用
  - SP3 改为 "The Bookmark That Doubles as a Values Marker"
  - 核心逻辑：书签插在桌上书中，laser-engraved 面朝外，全天可见——不需要底座的桌面铭牌
- [x] **WGS-001**：✅ 图片无需更换（第三件本来就是书签）
- [x] **WGS-005**：✅ 2026-04-10 完成——第三件组件确认为 WP-308 钛合金EDC开瓶钥匙扣，全部代码/文档已更新（见下方七）
- [x] **WGS-005**：✅ 2026-04-10 图片已拍摄，上传至 Cloudinary（5张，覆盖旧图含梳子）
- [x] **WP-308**：✅ 2026-04-10 Supabase 入库（`insert-titanium-edc-carabiner.ts` 已执行）
- [x] **WP-308**：✅ 2026-04-10 图片已上传至 Cloudinary（6张：cover/hover/detail-1~3/lifestyle）
  - 注意：文件名格式为 `Titanium-EDC-Carabiner-*.avif`，与 product-info.md 中预设的 `WP-308-*.avif` 不同，已通过 `update-edc-carabiner-images.ts` 修正 DB 路径
- [x] **WP-304 钛梳子**：✅ 确认保留为单品，不下架，不做改动
- [x] **WP-205 书签**：✅ 单品文案更新完成——tagline/highlights/description/expertNotes 全部按 values marker 定位重写，`update-metal-bookmark.ts` 已执行

---

_2026-04-10 本轮全部代码任务完成，已 push 上线。_

---

## 九、每日工作计划建立（2026-04-12）

### 背景
网站已上线，GA4显示流量归零，进入主动开发阶段。需要建立系统化的每日工作框架。

### 每日工作时长
**10小时**（白天8小时 + 晚上2小时）

### 当前阶段有效模块（6个）

| 模块 | 时长 | 性质 |
|------|------|------|
| 行业研究 + 内容选题 | 3h | 核心，高频 |
| 内容创作 | 1.5h | 核心，高频 |
| 内容分发（4平台） | 1.5h | 核心，高频 |
| Google Ads 管理/关键词研究 | 1.5h | 核心，高频 |
| 网站检查 + 竞品快扫 | 0.5h | 支撑，按需 |
| 晚上：读资讯/LinkedIn互动/规划选题 | 2h | 支撑，低频 |

**暂时停用模块（待询盘/订单激活）：**
- 询盘处理、订单履行、财务记录、供应商维护

### 内容平台策略
同时运营4个平台：LinkedIn（主）、Facebook、Instagram、Twitter/X
- 核心逻辑：一篇博客 → AI改写为四平台格式，降低内容制作成本
- LinkedIn发帖不使用调度工具（算法对原生发布更友好）
- Facebook/Instagram 用 Meta Business Suite 统一发布

### 7周研究主题规划

| 周次 | 主题 | 日期 |
|------|------|------|
| 第1周 | 买家决策逻辑 | 04/14–04/18 |
| 第2周 | 礼品套件使用场景 | 04/21–04/25 |
| 第3周 | 金属礼品材质故事 | 04/28–05/02 |
| 第4周 | 竞品内容策略 | 05/05–05/09 |
| ★ 第5周 | Wischos品牌故事（优先） | 05/12–05/16 |
| ★ 第6周 | 产品故事深挖（优先） | 05/19–05/23 |
| 第7周 | 目标市场深挖（欧澳买家） | 05/26–05/30 |

**★ 第5-6周为品牌自述内容，最难被竞品复制，优先级最高。**

### 文章草稿完成情况

**Week 5（品牌故事）× 5篇中英双语草稿：**
1. 为什么创立Wischos / Why I Started Wischos
2. 为什么选金属 / Why Metal
3. "精选价值"究竟意味着什么 / What "Curated Value" Actually Means
4. 一个人管你的订单反而是优势 / Why One Person Handling Your Order Is an Advantage
5. 工厂在哪里比你想的更重要 / Why the Factory Location Matters

**Week 6（产品故事）× 5篇中英双语草稿：**
1. 为什么笔依然是最好的企业礼品 / Why Writing Instruments Still Make the Best Corporate Gifts
2. EDC礼品：日常携带即品牌触点 / The EDC Gift: Everyday Carry as a Brand Touchpoint
3. 放在那里就在工作的礼品 / The Gift That Works While It Sits There
4. 每天两次、天天在用的企业礼品 / The Corporate Gift That Works Twice a Day, Every Day
5. 为什么套件传达的信息比单品更多 / Why a Gift Set Says More Than a Single Item

### Excel规划文件

**文件：** `Wischos_daily_plan_2026.xlsx`（项目根目录）

| Sheet | 内容 |
|-------|------|
| 日程计划 | 2026-04-12 至 06-30每日任务打勾表（8个任务列 + 备注列） |
| 研究主题计划 | 7周研究方向（每周：主题/日期/每日子方向/内容角度） |
| 内容发布记录 | 60行发布追踪表（5平台 × 日期/标题/备注） |
| 文章草稿库 | 10篇W5-W6中英双语草稿（英文+中文完整正文） |

_2026-04-12 每日工作框架建立完成。_

---

## 八、WP-402 flask → bottle 全站重命名（2026-04-10）

### 背景
"Pure Titanium Capsule Flask" 中的 "flask" 在英文 B2B 礼品场景默认指 hip flask（酒壶），与产品实际用途（装水/咖啡）及品牌调性不符。全部改为 "bottle"。

### 已完成的变更

| 文件 | 变更内容 |
|------|---------|
| `src/content/giftSets.ts` | WGS-005 component name、productId、heroCopy、SP1/SP3、expertNote ×2 |
| `src/content/homepage.ts` | WGS-005 tagline（同时修正了旧的 "anti-static comb" 引用 → "EDC carabiner"） |
| `src/routes/index.tsx` | FEATURED_PRODUCT_IDS 中的 productId |
| `src/server/update-expert-notes.ts` | productId key |
| `src/server/update-titanium-capsule-flask.ts` | name、description、highlights、WHERE 条件、console.log |
| `vercel.json` | 新增 301 redirect：`/products/WP-402-pure-titanium-capsule-flask-150ml` → `...bottle...` |
| `src/server/rename-flask-to-bottle.ts` | 新建迁移脚本（已执行） |
| **Supabase DB** | `WP-402` id + name ✅ 已执行；`WP-406`（200ml，已停售）同步更新 |

### 注意
- Cloudinary 图片路径**未改**（路径仍含 flask 字样，但不影响加载，属内部命名）
- SEO keywords 中的 "titanium flask" 词条**保留**（捕获搜索流量用，不是显示文案）

---

## 七、WGS-005 第三件组件讨论（2026-04-10 续）

### 问题背景

上次讨论建议将 WP-207（碳纤维指尖陀螺）替换 WP-405（钛蛋杯）作为 WGS-005 第三件组件，但碳纤维破坏了全金属材质叙事。用户明确要求：**保留金属材质，寻找有趣的金属 EDC**。

### 候选方向评估（已归档）

| 方向 | 产品 | 材质 | 亮点 | 缺点 |
|------|------|------|------|------|
| **A（推荐·材质叙事）** | 钛合金防水密封胶囊盒 | 钛合金 | 与钛壶天然配对；EDC 主流品类；1688 公模充足 | 功能对非 EDC 买家不够直观 |
| **B（推荐·Craighill气质）** | 黄铜机械计数器 | 固体黄铜 | 极度手感；话题性强；Craighill 审美 | 需找真黄铜版公模验货 |
| C | 全金属 EDC 信用卡工具 | 不锈钢/钛 | 经典 EDC 品类 | 品类饱和；与 WGS-003/006 重叠 |
| D | 黄铜折叠尺 | 黄铜 | Craighill 风格极强 | 1688 难找质量靠谱公模 |
| **✅ 最终选定** | **钛合金EDC开瓶钥匙扣（WP-308）** | **钛合金+黄铜锁芯** | **双钛一铜材质叙事；开瓶社交功能；每日随身** | — |

### ✅ 最终结论（2026-04-10 确认）

**WP-308 钛合金 EDC Carabiner with Bottle Opener** 替换梳子（WP-304）。

| 字段 | 内容 |
|------|------|
| 1688 链接 | https://detail.1688.com/offer/867460145919.html |
| 供应商 | 阳江市钛沽工贸有限公司 |
| 规格 | 53mm × 26mm × 5mm｜约11g｜钛合金体+黄铜锁芯 |
| 功能 | 钥匙扣 carabiner + 开瓶器 |
| ≥100件含税价 | ¥20.34（未税¥18） |
| Wischos FOB 估价 | $10–15/pc（定制版） |
| DB ID | `WP-308-titanium-edc-carabiner` |

### 已完成的更新（2026-04-10）

| 文件 | 状态 |
|------|------|
| `src/content/giftSets.ts` — WGS-005 全文案 | ✅ |
| `gift-sets-info.md` — WGS-005 ③ 组件 | ✅ |
| `gift-sets-info-en.md` — WGS-005 ③ 组件 | ✅ |
| `gift-sets-info.xlsx` — WGS-005 行 | ✅ |
| `gift-sets-info-en.xlsx` — WGS-005 行 | ✅ |
| `products/WP-308-Titanium-EDC-Carabiner/product-info.md` | ✅ 新建 |

### 否决产品（本轮）
| 产品 | 否决原因 |
|------|---------|
| WP-207 碳纤维指尖陀螺 | 碳纤维非金属，破坏全金属材质叙事 |
| WP-405 钛蛋杯 | 与 WP-402 钛壶重复，两个饮水容器逻辑冗余 |

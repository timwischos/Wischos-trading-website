# Firecrawl + Customer Analysis Batch Workflow

> 非安装版本。手动引用执行。
> 适用场景：已有一批待排查客户（公司名 + 官网 URL），需要批量调查并生成档案。

---

## 总流程概览

```
所有公司
  │
  ▼
[Phase 1] Firecrawl 批量爬取
  │  爬每家官网 → 提取结构化摘要
  │
  ▼
[Phase 2] Gate 1 淘汰（用 firecrawl 数据判断）
  │  不过：记录原因，不再深挖
  │  通过：进 Gate 2
  │
  ▼
[Phase 3] Gate 2 深度研究（补充 firecrawl 未覆盖的来源）
  │  LinkedIn / Owler / 协会 / 海关 / B2B足迹
  │  分级：A / B / C / D
  │
  ▼
[Phase 4] A/B 出详档，C/D 给判断句
  │
  ▼
[Phase 5] 写 MD 文件 + 汇总表
```

---

## Phase 1 — Firecrawl 爬取

**工具：** `firecrawl scrape <url>` 或 `firecrawl crawl <url>`

**爬取目标页面（每家公司）：**
- 首页（主营 + 定位）
- About / Our Story / Who We Are
- Products / Services / Catalogue / Shop
- Team / Meet the Team / Our People
- Contact / Contact Us
- 近期 Blog / News（如有，取最新1-3篇标题+摘要）
- Awards / Recognition / Clients（如有）

**提取信息（结构化输出）：**

| 字段 | 说明 |
|---|---|
| 主营业务 | 这家公司主要卖什么、服务什么市场 |
| 产品品类 | 关键品类列表，注明是否含金属/礼品套件 |
| 规模信号 | 员工数/成立年份/城市/门店数（官网直接出现的） |
| 联系人 | 官网上可见的名字 + 职位（About/Team页） |
| 客户案例 | 终端客户行业/名字（如有） |
| 协会会员 | APPA/PPAI/等（如官网显示） |
| 关键词信号 | "in-house sourcing" / "local made" / "import" / "custom" 等出现的词 |
| 淘汰信号 | 主做服装/印刷/食品/本地快单等排除项 |

> Firecrawl 已覆盖：官网发现、官网内容、多页面深挖、联系人初步提取。
> 后续 Gate 2 **不重复** WebFetch 官网步骤。

---

## Phase 2 — Gate 1 淘汰（基于 firecrawl 数据）

参照 `customer-analysis/SKILL.md` Gate 1 淘汰条件，用 firecrawl 数据直接判断：

| 淘汰条件 | 判断来源 |
|---|---|
| 无可验证官网（URL无效/404/仅社媒） | Firecrawl 返回结果 |
| 主营 print only / apparel only / local decoration | 首页 + 产品页 |
| 明确 local-made / handmade / artisan only | About 页 |
| 主做非金属类：服装/纸品/印刷/塑料低价品/食品礼篮 | 产品品类 |

**结果：**
- 通过 → 进 Phase 3
- 淘汰 → 汇总表记一行（Reject + 原因），停止

---

## Phase 3 — Gate 2 深度研究

**只对 Gate 1 幸存者执行。**

**补充调研来源（firecrawl 未覆盖）：**

| 来源 | 目的 |
|---|---|
| LinkedIn 公司页 | 员工规模/成立年份/官方介绍 |
| LinkedIn 员工搜索 | 决策人（Owner/Director/Buyer/Marketing/Procurement） |
| Owler / Crunchbase | 营收估计/员工数/竞争对手 |
| APPA/PPAI 会员目录 | 是否认证会员（加分项） |
| 海关/B2B足迹（ImportYeti/Panjiva） | 是否有中国进口记录 |
| WebSearch 行业媒体 | 展会参与/近期新闻 |

**分级标准（Gate 2 输出）：**

| 等级 | 判断 | 后续动作 |
|---|---|---|
| A | 明确 promo distributor / corporate gifting / awards，质量强 | 出详档 |
| B | 方向匹配，规模或采购模式待验证 | 出详档 |
| C | 边缘匹配，主业偏 apparel/print/local | 给判断句，不出详档 |
| D | 信息少/匹配弱/无产品证据 | 直接放弃，一句话说明 |

---

## Phase 4 — 档案生成

### A/B 级：出完整详档

按 `customer-analysis/TEMPLATE.md` 输出，**采购背景档案放最前**：

```
- 核心业务方向
- 主要产品线
- 潜在采购需求（可能性：高/中/低）
- 供应链可能痛点
- 中国供应商最佳切入角度
```

然后依次：供应链位置 → 联系人优先级矩阵 → Fit/Value评分 → 产品四问 + 痛点诊断 → 三个切入角度 → LinkedIn邀请信 + 首条私信 + 首封邮件 → 外展节奏 → CRM备注。

### C/D 级：直接给判断

不建档案，仅输出：

```
**[公司名]** — [C/D]级，不建议主动开发。
原因：[1-2句，说明主营/规模/定位不符的具体原因]
```

---

## Phase 5 — 写文件 + 汇总表

**A/B 档案路径：**
```
/mnt/d/Project/Wischos trading website/临时/[国家]/[公司名]/[公司名-联系人姓名].md
```
国家子目录：`澳大利亚` / `新西兰` / `加拿大` / `英国` / `UAE`

**汇总总表路径：**
```
/mnt/d/Project/Wischos trading website/临时/_批量汇总_[日期].xlsx
```

汇总表列：公司 / 国家 / 官网 / 闸门结果(A/B/C/D/Reject) / Fit / Value / 价值梯队 / 首选联系人 / 首选切入角度 / 当前阶段 / 备注

---

## 批量执行规则

- **边跑边落盘**：每家完成立即写文件，中途失败不丢已完成的
- **先跑所有 Gate 1**（便宜杀），再批量做 Gate 2，再出 A/B 详档
- **A/B 深度分析分批并行**：每批 3-5 家 subagent，一批完成再起下一批
- **C/D 级**：直接在汇总表记一行 + 给判断句，不出详档，不再查
- 单条失败 → 汇总表标"失败+原因"，继续下一条，不中断整批

---

## Firecrawl 跳过说明（给 SKILL.md Gate 步骤的对照）

| customer-analysis SKILL.md 步骤 | 本流程处理 |
|---|---|
| Gate 1a 官网发现（搜索+WebFetch确认） | ✅ 跳过 — firecrawl 已做 |
| Gate 1b 官网首页内容判断 | ✅ 跳过 — firecrawl 已提取 |
| Gate 2 WebFetch 产品/About/Team 页 | ✅ 跳过 — firecrawl 多页已覆盖 |
| Gate 2 LinkedIn 公司页/员工 | ▶ 仍需执行 |
| Gate 2 Owler/规模 | ▶ 仍需执行 |
| Gate 2 协会/展会记录 | ▶ 仍需执行 |
| Gate 2 海关/B2B足迹 | ▶ 仍需执行 |
| 联系人邮箱推断 | ▶ 仍需执行（firecrawl 提供初始联系人，推断邮箱另查） |

---

## Wischos Context

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

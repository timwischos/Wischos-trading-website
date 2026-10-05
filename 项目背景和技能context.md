# Wischos Gift — 项目背景 & 工具能力总览

> 供 agent 快速定向使用。读完可直接执行任务，无需再问背景。

---

## 业务概况

**公司**：Wischos Gift Trading — 中国定制金属礼品套件 B2B 出口商，SOHO 一人公司。  
**目标买家**：澳大利亚、英国、加拿大、EU、UAE 的促销品分销商 / 企业终端采购。  
**产品**：金属礼品套件 WGS-001~009（9套）+ 单品 WP 系列 31 个（笔/桌面/EDC/饮品）。  
**定位**：Curated Value — 套件是起点，一个联系人从选品到交货。  
**MOQ**：100 套（套件）/ 100 件（单品）。**FOB**：$18–50/套。**交期**：25–35 天。  
**无现货样品**；询盘来了再询价（一天内完成）。  
**网站**：https://wischosgift.com（已上线 2026-03-31）  
**邮件**：johnlui@wischosgift.com（署名 John Lui）  
**工厂网络**：Yangjiang、Dongguan、Zhongshan、Shenzhen、Yiwu、Wenzhou。  
**市场优先级**：AU/EU > SG/KR/JP > 东南亚 > 美国（美国关税风险高降优先）。

---

## 客户系统

**路径**：`/mnt/d/Project/Wischos trading website/客户系统/`（已 gitignore）

```
客户系统/
├── 00_主索引/Wischos_客户主索引.xlsx   ← 权威主索引（ID/评级/阶段/来源）
├── 01_正式客户档案/                    ← 已调查建档（AU 300+家，CA 300+家等）
│   ├── 澳大利亚/ 加拿大/ 新西兰/ 英国/ UAE/ 美国/ 欧洲/ 新加坡/ 爱尔兰/ 其他市场/
├── 02_原始名单与批次/                  ← 搜索结果、新候选、批次名单
├── 03_外展跟进/
│   └── 当前跟进总表/
│       ├── AU-NZ-开发进度总表-2026-08-04.xlsx
│       ├── AU-NZ-待接触清单-2026-08-10.md   ← 87家详细状态
│       └── DF034-沉默客户重触达审计-2026-09-18.md
└── 04_排除与暂停/客户淘汰记录.md       ← D/C级判断依据
```

**客户分级**：A（两项≥75优先外展）/ B+/B（主动外展）/ B-（群发）/ C（不主动）/ D（直接跳过）  
**Fit/Value 各 0–100**；Fit = 供应链位置+金属品类空白+地理；Value = 终端质量+目录规模+成长信号。

**D 级硬性排除**：自有中国采购办公室、纯 Decorator、品类完全错位、网站停用。  
**跳过华人创始人客户**（既定策略）。

---

## 客户开发技能库

**路径**：`/mnt/d/Project/Wischos trading website/调整/`

### 1. customer-analysis/SKILL.md
完整客户调查工作流。三道闸门递进筛选 + agent 深度分析 + 中文档案输出。
- Gate 1：便宜kill（官网首页+LinkedIn，判断主营业务）
- Gate 2：公司质量分级（规模/协会/海关/产品证据）
- Gate 3：A/B才进完整深度分析（联系人发现+Fit/Value评分+三切入角+外展文案）
- 输出路径：`临时/[国家]/[公司名]/[公司-联系人].md`
- 支持批量模式（xlsx/csv输入）

### 2. linkedin-invite/SKILL.md
写 LinkedIn 邀请信（≤300字符）+ 通过后首条私信。
- 署名：John Lui
- 强制先搜客户最新动态确认 hook
- 成熟分销商必须含 `both catalogue-style and beyond standard catalogues`

### 3. linkedin-contacts/SKILL.md
纯联系人发现。`site:linkedin.com` 五组关键词枚举 → 判断决策人。
- 支持批量，输出决策人汇总表 + 联系人明细表

### 4. mailbox-customer-followup/SKILL.md
只读 Outlook 邮箱 + 结合客户档案判断状态 + 下一步策略 + 草稿。
- 不自动发送；草稿需用户明确授权

### 5. 开发信写作原则.md
冷邮件规范。痛点→卖点→行动，五步骨架，≤160词，先有调查再写信。
- 写信前必须读客户 MD 档案，firecrawl 验证四个常见误判
- 定位句：`I help build custom metal gift options from China`

### 6. LinkedIn连接后跟进邮件写作原则.md
对方已接受邀请后的首封邮件。≤150词，不重复自我介绍，UISC/Two Ways 选一。

### 7. 群发邮件流程.md
写邮件内容 → 填 Excel → 建草稿 → Outlook 校对 → 手动发送完整流程。

---

## 邮件自动化系统

**路径**：`/mnt/d/Project/Wischos trading website/临时/mail_automation/`

```bash
cd "/mnt/d/Project/Wischos trading website/临时/mail_automation"
source .venv/bin/activate
python scripts/create_drafts_from_excel.py --dry-run   # 预览
python scripts/create_drafts_from_excel.py             # 建草稿
python scripts/send_approved.py --confirm-send         # 发送
python scripts/analyze_mailbox.py                      # 只读扫描邮箱
```

**Excel**：`data/draft_emails.xlsx`  
**关键列**：`to_email` / `subject` / `body_html`（必填）；`approved=yes`（手动打）；`scheduled_send_at`（UTC ISO-8601，可选）  
**工具自动回填**：`status` / `draft_id` / `sent_at`

**重要约束**：
- `scheduledSendDateTime` API 字段**无效**（Exchange 忽略）→ 只能本地 `time.sleep()`
- HTML 只允许：`<p>` `<br>` `<a>` `<strong>` `<em>` `<ul>` `<ol>` `<li>`
- 所有 `<p>` 必须带 Aptos inline style：`style="font-family:Aptos,sans-serif; font-size:11pt; color:#000000; line-height:1.6; margin:0 0 12px 0;"`
- Logo 用 Cloudinary URL，`cid:` 不支持
- token 已缓存 `token_cache.bin`，无需重新登录
- 签名文件：`data/signature.html`

---

## 开发信核心规则（供直接生成邮件时参考）

- **先有调查再写信**：必须读客户档案，无档案先跑 customer-analysis
- **五段结构**：Hook（具体钩子）→ Bridge（连接相关性）→ Recommend（套件/产品例子）→ Intro（`I'm with Wischos Gift in China...`放第四段）→ CTA（软性单一）
- **禁止**：正文含 URL 链接、FOB 价格、MOQ 数字、多个 CTA、第一封附件
- **CTA 范例**：`Worth me sending 2–3 options suited to [场景]?` / `I'll leave the idea with you. If a relevant brief comes up, I'd be glad to help.`
- **署名**：`Thanks, John`（正文末）；完整签名由 `signature.html` 自动附加
- 成熟分销商定位：`beyond standard catalogue items`，不替代其现有供应链

---

## 产品速查（外展配对用）

| 套件 | 名称 | 核心组件 | 场景 |
|---|---|---|---|
| WGS-002 | The Mechanical Desk | 黄铜bolt-action笔/propeller拆信刀/铝折叠支架 | 桌面/文具控 |
| WGS-004 | The Field EDC | 战术钢笔/迷你撬棒/折叠金属剪刀 | EDC/户外/工程 |
| WGS-005 | Morning Ritual | 铜冠bolt-action笔/钛胶囊瓶/钛钥匙链 | VIP/高管 |
| WGS-006 | The First Day | 铝RFID工牌夹/六合一工具笔/铝笔架 | 入职/Onboarding |
| WGS-007 | The Thinking Desk | 黄铜笔/黄铜动力陀螺/不锈钢桌杯 | 桌面/recognition |
| WGS-008 | The Quartet | 黄铜笔/钛茶滤杯/铝折叠支架/不锈钢名片盒 | 四件全金属/高端 |
| WGS-009 | The Meeting Kit | 铝线圈本/黄铜钢珠笔/不锈钢名片夹 | 会议/商务 |

所有套件组件均可镭雕，磁吸礼盒。

---

## 当前外展状态（2026-09-18）

- **AU/NZ**：~65家已发首封邮件待回复（8月集中推进）
- **沉默客户重触达**：DF034黄铜框resin杯垫新产品（WP-212），P1首批8家：Go Above and Beyond / ABC2000 / BrandFactor / Dynamic Gift / Adimage / Better Promo / KP Promotions / Kirra Promotions
- **加拿大**：PPPC 1335家名单，已筛Row 2–740，下次从Row 741继续
- **Good Things Canada**：B级，michael@goodthingspromo.com，Day 0外展待启动

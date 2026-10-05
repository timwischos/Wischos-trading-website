---
name: linkedin-contacts
description: Given a company name, enumerate the company's people from LinkedIn via Google `site:linkedin.com` searches (WebSearch snippets only), collect every role found, and judge the likely decision-maker(s). Lightweight standalone tool — use when you only want contacts + decision-maker judgment for a company, without running the full customer-analysis workflow. Supports batch mode: given a spreadsheet of companies, processes each row and outputs a decision-maker summary sheet plus a full contacts sheet. Backup of the deep LinkedIn-enumeration logic also folded (tiered) into the customer-analysis skill's contact step 2.3.
argument-hint: "<company name (optional: country / domain to disambiguate)>"
---

# LinkedIn Contacts + Decision-Maker Finder

## 用途
给一个公司名 → 用 Google `site:linkedin.com` 把这家公司的人尽量枚举出来 → 收集所有岗位 → 判断决策人。轻量、独立,不跑客户调查那套重流程。

## 输入
- **必需**:公司全名
- **可选**:国家 / 官网域名(用来排除同名公司)

## 能力诚实声明(只做工具真能做到的,不得编造)
- **方法**:WebSearch 跑 `site:linkedin.com` 系列查询,**只取搜索结果的标题/摘要**(通常含"姓名 - 职位 - 公司 · 地区")。
- **做不到**:打开 LinkedIn 个人页本身(登录墙)、读近期动态、拿邮箱。需要真读 profile 的,得另用 Chrome 方案。
- **覆盖不全**:Google 只收录一部分 profile,无法保证"所有"联系人都搜到。
- **同名风险**:公司名通用时会混进别家同名人,需按地区/职位描述剔除。
- **可能过时**:摘要里的职位可能是旧职位。

## 搜索(完整 5 桶枚举,轮换关键词把人捞全)

1. `site:linkedin.com/in "公司名"` —— 裸查兜底,先尽量多捞
2. `site:linkedin.com/in "公司名" "CEO" OR "Founder" OR "Owner" OR "President" OR "Managing Director"`
3. `site:linkedin.com/in "公司名" "Procurement" OR "Sourcing" OR "Buyer" OR "Purchasing" OR "Category Manager"`
4. `site:linkedin.com/in "公司名" "Director" OR "Head of" OR "Operations" OR "General Manager"`
5. `site:linkedin.com/in "公司名" "Marketing" OR "Sales" OR "Account"`

> 单次搜索返回有限,轮换这 5 组关键词才能把不同的人翻出来。若给了国家,可在查询后加地名进一步消歧。

## 抽取与去重
每条结果从标题/摘要提取:**姓名 / 职位 / profile URL / 地区**。按姓名+URL 去重;明显属于别家同名公司的剔除。

## 判断决策人(决策力三档)
- **高**:Owner / Founder / Managing Director / Director / President / CEO
- **中**:采购 / Sourcing / Buyer / Purchasing / Category Manager / Operations / Head of
- **低**:Sales / Account / Marketing / Coordinator / 其他执行岗

> 采购/sourcing 类对"供应商采购"场景是真决策人,排序时与高层并列靠前。职位不明但相关的,标"职责待确认"。

## 输出:联系人表(按决策力排序)

| 排序 | 姓名 | 职位 | 决策力(高/中/低) | profile URL | 地区 | 是否最可能决策人 | 备注 |
|---|---|---|---|---|---|---|---|

最后给一句结论:**最可能的决策人是谁、为什么**;若没搜到清晰决策人,如实说明并列出最接近的候选。

---

## Batch Mode（批量模式）

当用户给的是一张公司表（xlsx/csv）而非单个公司时,对每一行跑上面的流程,输出**两张表**。

### B1. 读表 + 列映射
- 读表,第一行作表头(xlsx 用脚本读,csv 直接读)。
- 按表头模糊匹配:**必需** 公司名(company / name / 公司);**可选** 国家(country)、域名/官网(domain / website),用于消歧。
- 缺公司名列 → 停下问用户(唯一阻断);其余不停。

### B2. 串行逐家处理（主线程,不派子 agent）
- 主线程**一家接一家**按顺序跑:对每家执行上面的"分层 site:linkedin.com 搜索 → 抽取去重 → 判决策人"。
- 轻活,中小表串行即可;表特别大(几百行)再考虑改子 agent 并行。
- **边跑边写**:每家一出结果就追加进下面两张表,单家失败标注"失败 + 原因"后继续,不中断整批。

### B3. 输出两张表
1. **决策人汇总表**（一行一家公司）`linkedin-决策人汇总_[日期].xlsx`：

   | 公司 | 国家 | 最可能决策人 | 职位 | 决策力 | profile URL | 备选1 | 备选2 | 备注/失败原因 |
   |---|---|---|---|---|---|---|---|---|

2. **联系人明细表**（一行一个联系人,搜到的人全列）`linkedin-联系人明细_[日期].xlsx`：

   | 公司 | 姓名 | 职位 | 决策力(高/中/低) | profile URL | 地区 | 是否最可能决策人 | 证据(摘要来源) |
   |---|---|---|---|---|---|---|---|

### B4. 跑完汇报
总公司数 / 找到决策人的几家 / 没找到的几家 / 失败几家。

> 诚实边界同单条:只取搜索摘要、不开 profile、覆盖不全、同名公司需剔除、职位可能过时。

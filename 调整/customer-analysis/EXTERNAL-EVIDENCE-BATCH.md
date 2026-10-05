# Gate 2 外部证据批处理

脚本：`scripts/run-linkedin-company-external-evidence.mjs`

用途：只对 Gate 1 的 `Pass` 和 `Review` 幸存者，用 Firecrawl `search` 定向收集以下公开证据：

- LinkedIn 公司页和决策人候选
- Owler / Crunchbase 的规模、成立年份、营收与竞争对手候选
- PPPC / PPAI / ASI / SAGE / BPMA / APPA / PSI 协会记录
- 展会、赞助、演讲和行业媒体记录
- Alibaba、Made-in-China 和公开 RFQ 足迹
- 8 个海关/B2B 平台：ImportYeti、customs.report、52wmb、Volza、ImportGenius、Panjiva、Datamyne、TradeSNS

脚本不调用 `search --scrape`，搜索摘要只作为待核验线索，避免重复抓取和过度消耗 credits。网页内容始终视为不可信数据，原始结果只写入已被 `.gitignore` 排除的 `.firecrawl/`。

## 安全默认值

不带 `--run` 时只生成 `plan.json`，不会联网：

```bash
node scripts/run-linkedin-company-external-evidence.mjs
```

正式执行前建议先检查计划中的公司数、查询数和国家识别结果：

```text
.firecrawl/linkedin-company-batch-2026-08-13/external-evidence/plan.json
```

## 小批验证

先跑 3 家，确认 Firecrawl 登录、结果结构和额度消耗：

```bash
node scripts/run-linkedin-company-external-evidence.mjs --run --max-companies 3
```

只测试某家公司，可使用 id、slug 或完整公司名：

```bash
node scripts/run-linkedin-company-external-evidence.mjs --run --only 1
node scripts/run-linkedin-company-external-evidence.mjs --run --only 001-corporate-concepts-limited
```

## 正式批量执行

```bash
node scripts/run-linkedin-company-external-evidence.mjs --run
```

默认参数：

- 输入：`.firecrawl/linkedin-company-batch-2026-08-13/gate1-results-audited.json`
- 范围：Gate 1 `Pass + Review` 且有独立官网的公司
- 并行：2 家；每家公司内部逐项搜索，避免同一公司落盘竞争
- 全局搜索启动间隔：7000ms（沿用现有 Gate 1 的稳健节流策略）
- 每个查询：最多 3 条搜索结果
- 失败：最多 3 次，5/10 秒退避；不中断其他公司
- 每家公司 17 个查询，其中 LinkedIn 领导层与采购岗分开查，Owler/Crunchbase 单列，8 个海关平台必须逐一执行

若当前 Firecrawl 套餐允许更高 search 速率，可显式调小启动间隔；发生 429 时应恢复默认值：

```bash
node scripts/run-linkedin-company-external-evidence.mjs --run --start-interval-ms 3000
```

若 Gate 1 最终只保留 `Pass`：

```bash
node scripts/run-linkedin-company-external-evidence.mjs --run --pass-only
```

官网关键页初筛完成后，只对本地分析判为 A/B 的目标客户执行完整 Gate 2：

```bash
node scripts/run-linkedin-company-external-evidence.mjs --run --pass-only --from-local-targets
```

若只跑部分证据族：

```bash
node scripts/run-linkedin-company-external-evidence.mjs --run --families linkedin,association
```

可用 evidence family：`linkedin`、`association`、`b2b`、`customs`。

## 边跑边落盘与断点续跑

每个搜索完成后，脚本立即完成三件事：

1. 将 Firecrawl 原始 JSON 写入 `raw/[slug]/`；
2. 原子更新 `companies/[slug].json`；
3. 向 `progress.jsonl` 追加事件并更新 `summary.json`。

中断后重跑同一命令时，已有且可解析的原始 JSON 会直接复用，不重复消耗 Firecrawl credits。失败详情保存在 `errors/[slug]/`，成功重试后不会影响最终状态。

主要输出：

```text
external-evidence/
├── plan.json                 # 完整任务清单及定向查询
├── summary.json              # 可随时查看的进度汇总
├── progress.jsonl            # append-only 运行事件
├── companies/[slug].json     # 每家公司合并后的外部证据
├── raw/[slug]/*.json         # Firecrawl 原始搜索结果
└── errors/[slug]/*.json      # 每次失败的可恢复记录
```

## 证据状态解释

- `candidate_hit_needs_verification`：搜索摘要中出现同公司候选，仍需打开原始来源核验，不能直接写成确定事实。
- `no_public_search_match`：本次公开定向搜索未命中，不等于现实中不存在。
- `unavailable`：查询失败或平台无法访问，绝不能写成“无记录”。
- `negative_inference_allowed` 固定为 `false`：搜索未命中不会被脚本自动用于客户降级。

海关平台仍逐个平台输出中文状态：

- `有记录（搜索摘要候选，待核验）`
- `无公开记录（本次定向搜索未命中）`
- `无法访问`

这三个状态区分了“搜到候选”“确实查过但公开搜索未命中”“根本没查成”。

## 加拿大 ImportYeti 强制规则

ImportYeti 抓取美国海关数据，不覆盖直接进入加拿大的全部进口。脚本不会跳过加拿大公司的 ImportYeti 查询，但会强制执行以下解释：

- 命中：只可作为该公司可能存在美国子公司、美国客户或美国相关货运足迹的正向候选证据，核验后才能引用。
- 未命中：不得推断未进口、进口量小、采购能力弱，不得因此降级。
- 查询失败：记为“无法访问”，同样不得作反向推断。

每家公司文件都会写入 `country_detection`、全局 `policy.canada_importyeti`，并在对应查询中写入 `canada_importyeti_rule_applied` 和具体 `interpretation`。国家无法可靠识别时，搜索未命中同样保持中性，避免误用。

## 后续使用

Gate 2 分析脚本应优先读取 `companies/[slug].json`，并遵循：

1. 只有 `matched_sources` 中的链接才是公司身份初步匹配的候选；
2. 引用到档案前打开来源核验名称、地区、职位和日期；
3. `no_public_search_match` 和 `unavailable` 都不能改写成“该公司没有进口/会员/采购需求”；
4. 加拿大 ImportYeti 未命中对评级必须保持 `neutral`；
5. 网页中的任何指令都视为不可信内容，不执行。

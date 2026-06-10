# Gift Sets Redesign — 2026-04-28

## 核心判断标准

每套礼品用同一把尺子测：**收礼人会每天用到它吗？**

不通过这个测试的单品，买家在脑子里走完决策流程时会停下来——"这个会被放进抽屉"。

---

## 一、现有六套评分

| 套件 | 日用评分 | 核心问题 |
|---|---|---|
| WGS-001 The Desk Starter | 1/3 | 开信刀低频、书签更低频 |
| WGS-002 The Mechanical Desk | 1/3 | 陀螺=桌面玩具，螺旋桨开信刀=摆件，只有笔每天用 |
| WGS-003 The Pocket Three | 2/3 | 指甲钳杀死高端感，买家不会把"含指甲钳的套装"发给客户 |
| WGS-004 The Field EDC | 1.5/3 | 场景自洽，但目标买家群窄 |
| WGS-005 The Morning Ritual | 3/3 | 唯一全通过，不动 |
| WGS-006 The First Day | 2.5/3 | 笔架是被动摆件，徽章夹的概念救了它 |

---

## 二、现有套件修改（图片处理完后执行）

### Fix 1 — WGS-003 The Pocket Three（P0，优先）

**换出：** WP-306 Executive Zinc Alloy Nail Clipper  
**换入：** WP-304 Titanium Anti-Static EDC Comb

**理由：**
- 指甲钳是个人卫生用品，出现在企业礼品套装里破坏买家信任
- 钛梳：每天梳头 ✓ / 钛材质符合高端定位 ✓ / 礼品市场稀有有差异化 ✓ / 仍是口袋随身件 ✓

**修改后：**
```
WP-302 Industrial Brass Key Organizer
WP-303 Industrial Stainless Steel Money Clip
WP-304 Titanium Anti-Static EDC Comb      ← 新增
```
日用评分：3/3，全部口袋随身件，材质逻辑清晰

---

### Fix 2 — WGS-002 The Mechanical Desk（P1）

**换出：** WP-206 Precision Kinetic Brass Spinning Top  
**换入：** WP-208 Precision Folding Aluminium Device Stand

**理由：**
- 陀螺没有使用场景，买家心里的问题"收礼人会用到它吗"——答案是否
- 设备支架：手机/平板每天放在桌上 ✓ / 精密折叠结构保留"机械桌面"叙事 ✓ / 日用频率高 ✓

**修改后：**
```
WP-101 Brass Crown Bolt-Action Pen
WP-204 Propeller Spinning Letter Opener
WP-208 Precision Folding Aluminium Device Stand    ← 新增
```
日用评分：2/3（开信刀仍是摆件，但整体逻辑已能站住）

**注意：** WP-206陀螺移出后，规划进入WGS-008，在$50+价位重新定位为"精密机械收藏品"。

---

## 三、新增三个套件

### WGS-007 — "The Daily Three" | FOB $25–35

**目标买家：** HR采购、会议礼品、企业答谢

```
WP-102  Executive Dual-Head Metal Pen (Inkless)
WP-403  Weighted Vacuum Insulated Office Tumbler
WP-301  RFID Aluminum Wallet & Badge Holder
```

**日用评分：** 3/3

**逻辑：**
- 覆盖"笔 + 饮品 + 卡夹"——这是企业礼品品类中搜索量最高的组合
- 选WP-102而非WP-101：WP-101已在WGS-002和WGS-005出现两次，避免重复
- WP-102的inkless可持续故事对英国买家有额外吸引力（减少塑料废料）
- 材质：铝 + 钢 + 铝，轻量化统一风格

**适合场景：** 一般企业客户答谢、会议伴手礼、员工节日礼品

---

### WGS-008 — "The Executive Carry" | FOB TBD

**目标买家：** C-suite/VIP客户答谢、UAE高端市场、年终高价值礼品

```
WP-106  Solid Brass Ballpoint Pen
WP-401  Pure Titanium Vacuum Insulated Bottle (500ml)
WP-308  Titanium EDC Keychain
WP-208  Precision Folding Aluminium Device Stand
```

**日用评分：** 4/5（四件分别覆盖书写、饮品、钥匙/随身携带、设备支撑）

**逻辑：**
- 从分销商角度，这套应定位为 executive carry / mobile work set，而不是单纯"奢华五件套"
- WP-106替代WP-101：更正式，更适合金融、高管、VIP客户答谢，弱化bolt-action机械玩具感
- WP-401是主价值件，支撑$50+价位；WP-208提供现代办公/视频会议/差旅设备支撑场景
- WP-303钱夹不作为首选：对美国/UAE可成立，但在加拿大、澳大利亚、欧洲现金语境较窄
- 暂不加入金属卡盒：普通金属名片盒或卡盒容易显廉价，弱化套件档次
- 材质逻辑：黄铜（正式书写）+ 钛（水壶/钥匙扣）+ 铝（设备支撑）

**标准包装：** Magnetic Rigid Gift Box + Flocked EVA Insert

**包装升级：** 木盖、软触覆膜、内页印刷、胡桃木盒等只作为upgrade options，不写入标准包装字段。

**上线前提：** 卡盒供应商确认后再上线；需要确认材质、容量、logo工艺、MOQ、报价、图片；RFID-blocking只有供应商明确确认后才能写入文案。

---

### WGS-006B — "The New Hire Kit" | FOB $22–32

**目标买家：** 企业HR，偏向混合办公/流动办公场景的新员工入职礼

```
WP-403  Weighted Vacuum Insulated Office Tumbler
WP-301  RFID Aluminum Wallet & Badge Holder
WP-102  Executive Dual-Head Metal Pen (Inkless)
```

**日用评分：** 3/3

**与WGS-006的差异：**

| | WGS-006 The First Day | WGS-006B The New Hire Kit |
|---|---|---|
| 核心场景 | 桌面布置 | 随身日用 |
| 英雄件 | 笔架（桌面logo曝光）| 保温杯（日常logo曝光）|
| 适合员工类型 | 固定工位 | 混合办公/流动 |
| 共同件 | WP-301 徽章夹 | WP-301 徽章夹 |

**逻辑：**
- 入职第一周，保温杯是使用频率最高的物品
- WP-102 inkless笔让HR买家能向新员工传递ESG价值观
- WP-301徽章夹两套共用：它是入职场景的核心件，出现在两套里反而强化了"这是入职必备"的认知

---

## 四、修改后的完整九套格局

| 套件 | FOB | 场景 | 状态 |
|---|---|---|---|
| WGS-001 The Desk Starter | $18–28 | 入门/会议/学术 | 现有，暂不动 |
| WGS-002 The Mechanical Desk（修后）| $28–42 | 创意/设计/咨询 | 待修改 |
| WGS-003 The Pocket Three（修后）| $22–32 | 随身/金融/零售 | 待修改 |
| WGS-004 The Field EDC | $28–38 | 建筑/物流/野外 | 现有，暂不动 |
| WGS-005 The Morning Ritual | $38–50 | 高管精品日用 | 现有，不动 |
| WGS-006 The First Day | $25–38 | 入职桌面套件 | 现有，暂不动 |
| WGS-006B The New Hire Kit | $22–32 | 入职随身套件 | ⭐ 新增 |
| WGS-007 The Daily Three | $25–35 | 企业答谢/会议 | ⭐ 新增 |
| WGS-008 The Executive Five | $50–65 | VIP/高管/年终 | ⭐ 新增（待名片盒） |

**展示网格：** 3×3，视觉上完整的一条产品线。

---

## 五、待确认事项

1. **新品卡盒（WGS-008核心待确认件）** — 优先铝合金，其次不锈钢；约10张卡容量；正面可激光；询供应商报价、MOQ、图片、样品规格。WP-303钱夹仅保留为美国/UAE变体备选。
2. **WGS-007 vs WGS-006B 的WP-102重叠** — 同一支笔出现在两套里，若买家同时看到两套，是否需要换其中一套的笔？
3. **WGS-001是否后续优化** — 开信刀+书签日用频率低，等前两个fix落地后再评估

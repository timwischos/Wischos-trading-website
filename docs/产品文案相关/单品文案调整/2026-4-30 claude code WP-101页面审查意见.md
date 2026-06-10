# 2026-4-30 WP-101 页面审查意见

审查对象：`/products/wp-101-brass-crown-bolt-action-pen` 页面（本地dev环境）
审查依据：`docs/wischos产品文案写作原则.md`
审查方式：Playwright 截图 + 页面文字提取

---

## 一、可直接保留的部分

- **Highlights 5条** — 功能陈述清晰，无辩护语言
  - 其中 "28g hand weight — heavier than standard office pens without becoming oversized" **确认保留**：属于帮买家建立手感预期的对比表述，符合原则2例外条款
- **Comparison 组件表格**（COMPONENT / MATERIAL / ROLE）— 结构清晰，适合多材质产品
- **Specifications** — 规格数据准确
- **FAQ 4条** — 信息量充足，B2B appropriate（笔芯兼容性、激光刻字效果、混合表面分单、交期）
- **Sourcing Notes 正文内容** — 三条正文内容整体符合行内采购人视角

---

## 二、文案修改意见

### 问题1：Description 含对比句（违反原则1/2）

```
原文：The bolt slide deploys and retracts the tip with a clear mechanical movement
      instead of a conventional click button.

改为：The bolt slide deploys and retracts the tip with a clear mechanical movement.
```

"instead of a conventional click button" 是在和普通按压笔比较，属于辩护句。删掉后语意完整。

---

### 问题2：Key Insight 含对比框架（违反原则1/2）

```
原文：Bolt-action changes the pen from a standard writing tool into a visible
      mechanical desk object, which is why it works well in branded corporate gift sets.

改为：The bolt-action mechanism makes the pen a visible mechanical object in desk use,
      suited to branded corporate gift sets.
```

"from a standard writing tool into" 是对比框架，隐含这支笔比普通笔高一级。改为直接陈述功能特性。

---

### 问题3：Sourcing Notes 标题使用 "Why X" 格式（违反原则8）

与套件文案同类问题：销售员说服语气，非行内采购人陈述。

| 原标题 | 建议改为 |
|---|---|
| Why bolt-action changes the product category | Bolt-action mechanism: use experience and gifting context |
| Why G2 refill compatibility matters | G2 refill compatibility and product lifespan |
| Why the mixed-metal structure works here | Material allocation across pen components |

---

### 问题4：Sourcing Note 3 末句含对比（违反原则1/2）

```
原文：The result is a pen with mechanical presence without the mass of a
      full solid-brass body.

改为：删掉此句。
```

前面已说明各材质的分工，末句 "without the mass of a full solid-brass body" 是在解释为什么不用纯黄铜，属于辩护句，删掉后逻辑完整。

---

## 三、页面结构建议

### 问题1：QUICK ANSWER 标签

页面上直接展示 "QUICK ANSWER" 标注，B2B买家看到会感觉是SEO标注而非产品文案。建议两个方向之一：
- 去掉标签，内容作为产品描述段落顶部展示
- 改为中性标签，如 "ABOUT THIS PRODUCT"（当前已有此标签，Quick Answer 可直接并入其下，不单独标注）

### 问题2：KEY INSIGHT 标签

标签偏编辑/媒体风格，不像产品页元素。内容本身有价值，建议移入 Sourcing Notes 第一条，不单独作为区块展示。

### 问题3：Specifications 默认折叠

B2B买家查规格是高频操作。建议 Specifications 默认展开，其余（FAQ、Sourcing Notes）保持折叠。

---

## 四、总结

| 类别 | 内容 | 状态 |
|---|---|---|
| Description | 删 "instead of a conventional click button" | 需修改 |
| Key Insight 正文 | 去掉对比框架 | 需修改 |
| Sourcing Notes 标题 | 3条 "Why X" 改为陈述式 | 需修改 |
| Sourcing Note 3 末句 | 删 "without the mass of a full solid-brass body" | 需修改 |
| QUICK ANSWER 标签 | 去掉或融入现有区块 | 待确认实施方式 |
| KEY INSIGHT 标签 | 内容移入 Sourcing Notes，不单独展示 | 待确认实施方式 |
| Specifications 折叠 | 建议默认展开 | 待确认 |

文案修改4处，结构调整3处待确认实施方式后执行。

---

*审查日期：2026-04-30*

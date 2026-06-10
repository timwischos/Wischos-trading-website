# Wischos Trading Website - Project Instructions

## 客户开发与分析流程 (Customer Intelligence Workflow)

为了确保客户分析的深度与实战性，所有客户调查任务必须遵循“双框架对比”模式。

### 1. 执行逻辑
当接收到分析客户的指令时，必须调用两个子 Agent（或分两个阶段执行）：
- **Agent 1 (Tactical/实战派)**：依据 `临时\通用资料\一轮客户调查流程.md`。
    - **重点**：挖掘官网细节、母公司背景、LinkedIn 动态、具体缺货/痛点信号、编写针对性邀请信。
- **Agent 2 (Strategic/战略派)**：使用 `agent-skills\export-customer-development` 技能。
    - **重点**：Fit Score/Value Score 评分、全球供应链定位、Entry Angles 矩阵、标准化冷邮件序列。

### 2. 输出格式规范
必须按以下格式输出对比报告：

#### A. 双框架对比表格 (Comparison Table)
使用 Markdown 表格，包含以下维度：
- **供应链位置** (Supply Chain Position)
- **梯队/评级** (Tier/Rating)
- **星级** (Star Rating)
- **产品切入** (Product Entry Angle)
- **结构性障碍** (Structural Barriers)
- **接触钩子** (Contact Hooks)
- **外展文案差异** (Outreach Copy Differences)
- **独特产出 A1** (Unique Output from Agent 1)
- **独特产出 A2** (Unique Output from Agent 2)
- **一致结论** (Consensus)

#### B. 双语差异总结 (Bilingual Summary)
- 提供中文总结说明两个框架的侧重点区别。
- 提供英文总结 (English Summary)。

### 3. 后续确认
在展示对比表格后，必须停止并询问用户：“是否合并为最终的客户开发执行手册 (MD 文件)？”

---

## 编码与文档规范
- 客户档案命名：`公司名-联系人姓名.md`
- 存储路径：遵循项目既有目录结构。

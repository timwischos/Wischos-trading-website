# Wischos 项目待办清单（PENDING ACTIONS）

> **作用：** 跨阶段必须执行的待办，避免遗忘
> **维护规则：** 完成一项划掉一项，不要删除（保留历史）
> **检查频率：** 每次重大改动 / 每周一次

---

## 🔴 高优先级待办（绝不能漏）

### A1: 新套件上线后必建用例分类页

**触发条件：** 任一新套件（WGS-009 / WGS-010 / WGS-011 / WGS-NEW Pause）正式上线后

**必须执行的动作：**

| 新套件 | 必建的用例分类页 |
|---|---|
| WGS-009 Two-Piece Entry 上线后 | `/gift-sets/by-use-case/volume-promotional` |
| **WGS-010 The Hydration 上线后** | **`/gift-sets/by-use-case/drinkware`（行业 #1 品类，必做）** |
| WGS-011 The Boardroom 上线后 | `/gift-sets/by-use-case/vip-board-level` |
| **WGS-NEW The Pause 上线后** | **`/gift-sets/by-use-case/wellness`（趋势品类，必做）** |

**为什么不能漏：** 双层命名（已完成）+ 用例分类导航 = 配套 SEO 战略。漏了第二件，procurement 客户就找不到对应入口。

**关联文档：** `Wischos_产品策略_2026-05-31.md` 附录 D.6.5

---

### A2: 阶段 A 可立即建的 5 个类目页（基于现有 8 套件）

**当前可执行（推荐本月内）：**

- [ ] `/gift-sets/by-use-case/onboarding` → WGS-006
- [ ] `/gift-sets/by-use-case/executive-desk` → WGS-002, WGS-005, WGS-007, WGS-008
- [ ] `/gift-sets/by-use-case/edc-daily-carry` → WGS-003
- [ ] `/gift-sets/by-use-case/field-utility` → WGS-004
- [ ] `/gift-sets/by-use-case/entry-tier-promotional` → WGS-001

---

## 🟡 中优先级待办

### B1: 询盘表单加 Use Case 字段（数据库迁移）

- [ ] 添加 `useCase` 字段到 `inquiries` 表（Supabase SQL）
- [ ] 添加到 `src/lib/schemas/inquiry.ts` zod schema
- [ ] 添加到 `src/components/sections/InquiryFormSection.tsx` 下拉框
- [ ] 添加到 `src/server/email/InquiryEmail.tsx` 邮件模板

Use Case 选项：Onboarding / Executive Gifting / Client Appreciation / Wellness / Field Team / Drinkware Program / Other

### B2: Blog 4 篇 procurement 角度文章

- [ ] "Best Onboarding Gift Sets for Australian HR Teams in 2026"
- [ ] "Executive Gift Sets That Survive the Drawer: A 2026 Procurement Guide"
- [ ] "Wellness Gift Sets for Employee Wellbeing Programs"
- [ ] "Branded Drinkware: The 2026 B2B Procurement Playbook"

每篇内链到对应套件页。

---

## 🟢 低优先级待办（视情况）

### C1: 9 个强符合 SKU 重新拍 flat lay 风格产品图

参考 Craighill 摄影语言。详见 `Wischos_产品策略_2026-05-31.md` 附录 C.6。

### C2: About 页加"On Design Language"小段

引用附录 C.1 的 5 条规则。

### C3: 给工厂 RFQ 模板加入 Design Language 强制条款

详见附录 C.4。

---

## ✅ 已完成（保留历史）

- [x] **2026-05-31:** 战略调研 + 4 国市场研究 + 国别页 4 个 + Duty 页上线
- [x] **2026-05-31:** 网站改动 18 文件 + 5 新页面 push 上线（commit `71fa71a`）
- [x] **2026-05-31:** Supabase 数据库迁移（destination_country + incoterm 列）
- [x] **2026-05-31:** 产品策略文档（含 U.I.S.C. + Design Language + 需求强度分级）
- [x] **2026-05-31:** 首页 Featured Products 升级为 4 个强符合 SKU
- [x] **2026-05-31:** **动作 1：8 个现有套件双层命名（procurementCategory 字段 + H2 + Title + Schema）**

---

**待办清单结束**

> 任何对项目的重大改动后，请审视本清单是否需要更新。
> 当任一新套件（WGS-009/010/011/Pause）开发上线时，**第一时间执行 A1 对应类目页建设**。

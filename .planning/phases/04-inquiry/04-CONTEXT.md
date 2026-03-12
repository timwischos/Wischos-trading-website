# Phase 4: Inquiry - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the complete inquiry pipeline: Contact page with embedded form, /inquiry → /contact redirect (preserving query params), form validation, Supabase persistence, Resend email notification, honeypot spam filter, and success/error states. No CMS, no cart, no user accounts — inquiry-only.

</domain>

<decisions>
## Implementation Decisions

### Page Structure

- **表单放在 /contact 页面**，不放在 /inquiry
- **/inquiry 重定向到 /contact**，保留 ?product= 等查询参数（302 redirect 或 TanStack Router redirect）
- 导航栏已有 "Contact" 链接，直接指向 /contact — 无需额外入口
- 产品详情页 CTA（Phase 3 已建）的链接目标：从 `/inquiry?product=名称` 改为 `/contact?product=名称`（或由 /inquiry redirect 自动透传）

### Success State（提交成功）

- 表单提交成功后，**整个表单区域替换为感谢信息**（不是 toast，不是顶部 banner）
- 感谢信息内容风格：简洁确认 + 预期设定
  - 示例：*"Thank you. We'll be in touch within 2 business days."*
  - 简短、专业、B2B 语调，不夸张，符合 Craighill 极简风格
- 感谢信息无需"返回"按钮 — 用户可通过导航继续浏览

### Error State（提交失败）

- 网络错误或服务器报错时：**在表单上方显示内联错误提示**
- 表单保留原有填写内容，用户可直接重试
- 错误文字示例：*"Something went wrong. Please try again or email us directly."*

### Product Interest 字段

- 使用 **Select 下拉菜单**，不是自由文本输入框
- 下拉选项（共 5 项）：
  1. Architect Desk Set
  2. Signature Pen Collection
  3. Castro Catchall Tray
  4. Executive EDC Set
  5. Other / Multiple Products
- **?product= 预填充逻辑：**
  - 参数值与选项匹配 → 自动选中对应选项
  - 参数值无匹配（未知产品名） → 默认选中 "Other / Multiple Products"
  - 无 ?product= 参数 → 下拉留空（用户手动选）

### Contact 页面布局

- **表单为主体内容**，占页面主要空间
- 表单上方有一个**小型信息块**，包含：
  - 一句导语文字（例如：*"We'd love to hear from you."* 或类似 B2B 语调）
  - 邮箱占位符（例如：hello@wischosgift.com）
  - LinkedIn 占位符链接
  - 响应时间承诺（例如：*"We respond to all inquiries within 2 business days."*）
- 整体布局：单列，上下排列（信息块 → 表单）
- 移动端同样单列，无布局变化需求

### 表单字段（INQ-02 规定，无需修改）

按顺序：Full Name、Company Name、Job Title、Email（必填）、Phone（可选）、Product Interest（下拉）、Estimated Quantity、Target Timeline、Message/Requirements

### Honeypot 反垃圾

- 添加隐藏的 honeypot 字段（CSS `display: none` 或 `position: absolute; left: -9999px`）
- 如 honeypot 字段有值，服务端静默丢弃（返回假成功，不报错）
- 不使用 CAPTCHA

### Claude's Discretion

- react-hook-form + Zod resolver 的具体配置方式
- Supabase RLS 策略的 SQL 写法（insert only, no select）
- Resend 邮件模板的 HTML 结构（纯文本还是 HTML 格式）
- TanStack Server Route（`/api/inquiry`）的具体实现模式
- 表单字段的精确 Tailwind 间距和样式（跟随现有 Craighill 风格）
- 字段验证错误的显示位置（字段下方 inline）

</decisions>

<specifics>
## Specific Ideas

- 设计参考：Craighill 极简风格延续 Phase 3 — 大留白、干净排版、无多余装饰
- 成功状态要有"重量感"但不浮夸 — 大字体简短文字，居中或左对齐，无图标
- Contact 页面定位：这是买家最后一步行动，页面要传递"专业、可信、响应及时"的信号

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `input.tsx`, `select.tsx`, `textarea.tsx`, `label.tsx` — 已安装，可直接用于表单字段
- `button.tsx` — 已用于所有 CTA，保持一致
- `PageShell` — /contact 和 /inquiry 两个路由的 stub 已使用 PageShell，Phase 4 继续用
- 尚无 `form.tsx` — 需要安装 shadcn Form 组件（基于 react-hook-form）

### Established Patterns
- `src/content/` 模式 — 表单字段选项和 Contact 页面文案放入 content 模块
- `page-wrap` CSS class — 所有页面的水平内边距
- Server Route 模式：`src/routes/api/inquiry.ts`（TanStack Start server route，非 server function）
- Zod schema 独立编写（不用 drizzle-zod，与 Zod v4 不兼容）
- `prepare: false, max: 1` 已在 db.ts 强制配置

### Integration Points
- `/src/routes/{-$locale}/contact.tsx` — stub 已存在，Phase 4 实现完整页面
- `/src/routes/{-$locale}/inquiry.tsx` — stub 已存在，Phase 4 改为 redirect 到 /contact
- `/src/routes/api/inquiry.ts` — 新建 Server Route 处理 POST 请求
- `src/server/schema.ts` — inquiries 表已定义，Phase 4 启用 RLS + 执行 drizzle-kit push
- Phase 3 CTA 按钮（ProductDetailSection.tsx）：链接已是 `/inquiry?product=...`，需确认 /inquiry redirect 透传参数后即自动正常

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-inquiry*
*Context gathered: 2026-03-12*

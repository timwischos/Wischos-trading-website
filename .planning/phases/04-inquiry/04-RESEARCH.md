# Phase 4: Inquiry - Research

**Researched:** 2026-03-12
**Domain:** Form handling, server-side API routes, Supabase RLS, Resend transactional email
**Confidence:** HIGH

---

## Summary

Phase 4 wires the commercial pipeline: a contact/inquiry page with an embedded form, a `/api/inquiry` server-side POST handler, Supabase persistence, and a Resend email notification to the operator. All infrastructure exists and is pre-configured — the `inquiries` table schema is already defined in `src/server/schema.ts`, the Drizzle client is configured with `prepare: false, max: 1` in `src/server/db.ts`, and `resend` plus `@react-email/components` are already in `package.json`. Two route stubs exist — `contact.tsx` and `inquiry.tsx` — both currently rendering Phase 2 placeholders.

The key technical pattern is: client-side `@tanstack/react-form` with Zod v4 field-level validation → `fetch` POST to `/api/inquiry` server route → Drizzle insert → Resend email send → JSON success/error response → inline UI state update. No page redirect on success; success message renders in place. A honeypot field filters bots server-side. Supabase RLS is configured via the Supabase dashboard SQL editor (not drizzle-kit).

**Primary recommendation:** Build a single `/api/inquiry` server route using the `createAPIFileRoute` pattern from `@tanstack/start/api`. Use `@tanstack/react-form` v1 with Zod v4 Standard Schema for field validation. Keep the form and success state in one component — `InquiryFormSection` — which both route stubs import.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INQ-01 | Contact page with company contact info + embedded inquiry form | `contact.tsx` stub exists; needs `ContactSection` (contact details) + `InquiryFormSection` (form) |
| INQ-02 | Form fields: Full Name, Company, Job Title, Email (req), Phone (opt), Product Interest, Quantity, Timeline, Message | `inquiries` table schema already defines these exact columns |
| INQ-03 | Zod validation — required fields, email format, helpful error messages | `@tanstack/react-form` v1 + Zod v4 Standard Schema; field.state.meta.errors array |
| INQ-04 | Submission saves to Supabase `inquiries` table via `/api/inquiry` Server Route | `createAPIFileRoute` POST handler; Drizzle insert via existing `db` client |
| INQ-05 | Submission triggers Resend notification email to operator | `resend.emails.send()` with `@react-email/components` template; called from same POST handler |
| INQ-06 | Honeypot field to filter spam without CAPTCHA | Hidden `<input>` with CSS `display:none`; server checks empty string; silently reject if filled |
| INQ-07 | Success state shown in place after submission (no page redirect) | `useState` success flag in `InquiryFormSection`; render confirmation message instead of form |
| INQ-08 | Supabase RLS: anon INSERT allowed, anon SELECT blocked | SQL policy via Supabase dashboard; two policies needed (INSERT + SELECT with `USING (false)`) |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@tanstack/react-form` | ^1.28.4 (installed) | Client-side form state + validation | Already in package.json; designed for TanStack Start |
| `zod` | ^4.3.6 (installed) | Schema validation — Zod v4 Standard Schema | Already in package.json; project decision to not use drizzle-zod |
| `resend` | ^6.9.3 (installed) | Transactional email SDK | Already in package.json; project decision confirmed |
| `@react-email/components` | ^1.0.8 (installed) | React components for email templates | Already in package.json; pairs with Resend |
| `@react-email/render` | ^2.0.4 (installed) | Renders React email to HTML string | Already in package.json |
| `drizzle-orm` | ^0.45.1 (installed) | Drizzle insert to Supabase | Already configured in `src/server/db.ts` |

### No New Installations Required

All required packages are already installed. Phase 4 needs zero new `npm install` commands.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@tanstack/react-form` | `react-hook-form` | react-hook-form is more popular but @tanstack/react-form is already installed and integrates naturally |
| Zod Standard Schema | `@tanstack/zod-form-adapter` | The adapter package was deprecated in Zod 3.24.0; Zod v4 implements Standard Schema natively |

---

## Architecture Patterns

### Recommended File Structure

```
src/
├── routes/
│   ├── api/
│   │   └── inquiry.ts          # POST /api/inquiry — server-only, no component
│   └── {-$locale}/
│       └── contact.tsx         # Filled-out contact page (replaces stub)
│       (inquiry.tsx kept as redirect or alias — see note below)
├── components/
│   └── sections/
│       ├── ContactSection.tsx  # Contact details (email, LinkedIn)
│       └── InquiryFormSection.tsx  # Form + success state
├── content/
│   └── contact.ts              # Contact content strings
└── server/
    └── email/
        └── InquiryEmail.tsx    # React Email template component
```

**Note on contact vs inquiry routes:** The requirements specify a "contact page with embedded inquiry form" (INQ-01). The existing stubs are `contact.tsx` and `inquiry.tsx`. The cleanest approach: implement the full form inside `contact.tsx`. The `inquiry.tsx` stub can render the same form (or redirect). The `/api/inquiry` server route is a separate file under `routes/api/`.

### Pattern 1: TanStack Start API Route (createAPIFileRoute)

**What:** A `.ts` file under `routes/api/` that exports a server-only handler — no React component.

**When to use:** All backend operations (DB writes, secrets, email sends) that must never run client-side.

```typescript
// src/routes/api/inquiry.ts
// Source: TanStack Start API Routes docs + WebSearch verified
import { createAPIFileRoute } from '@tanstack/start/api'
import { db } from '@/server/db'
import { inquiries } from '@/server/schema'

export const APIRoute = createAPIFileRoute('/api/inquiry')({
  POST: async ({ request }) => {
    const body = await request.json()

    // Honeypot check — silently reject bots
    if (body.website) {
      return Response.json({ success: true }) // fake success
    }

    // Zod validation on server (re-validate — never trust client)
    const parsed = inquirySchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input' }, { status: 400 })
    }

    // Insert to Supabase via Drizzle
    await db.insert(inquiries).values(parsed.data)

    // Send Resend notification
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({ ... })

    return Response.json({ success: true })
  },
})
```

### Pattern 2: TanStack React Form v1 with Zod v4 Standard Schema

**What:** Client-side form using `useForm` hook with Zod v4 schemas for per-field and form-level validation.

**Key finding:** `@tanstack/zod-form-adapter` is deprecated since Zod 3.24.0. Zod v4 implements the Standard Schema spec natively — pass Zod schemas directly to `validators` without any adapter package.

```typescript
// Source: TanStack Form docs (Standard Schema example) + GitHub issue #1136
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

const inquirySchema = z.object({
  contactName: z.string().min(1, 'Full name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  // ... other fields
})

const form = useForm({
  defaultValues: {
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    productInterest: '',
    quantity: '',
    timeline: '',
    message: '',
    website: '', // honeypot — hidden from humans
  },
  validators: {
    onSubmit: inquirySchema,  // Zod v4 Standard Schema — no adapter needed
  },
  onSubmit: async ({ value }) => {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    })
    if (res.ok) setSuccess(true)
  },
})
```

**Field error rendering:**

```typescript
// Source: TanStack Form validation guide
<form.Field name="email">
  {(field) => (
    <div>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <p className="text-sm text-destructive mt-1">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  )}
</form.Field>
```

### Pattern 3: Honeypot Field Implementation

**What:** A visually hidden `<input>` field with a plausible-sounding name (e.g., `website`). Legitimate users never see or fill it. Bots fill everything.

```typescript
// Client: hidden via CSS (NOT display:none — some bots skip display:none fields)
// Use CSS absolute positioning off-screen
<form.Field name="website">
  {(field) => (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
    >
      <label htmlFor="website">Website (do not fill)</label>
      <input
        id="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
      />
    </div>
  )}
</form.Field>

// Server: check at top of POST handler
if (body.website && body.website.length > 0) {
  return Response.json({ success: true }) // silent fake success
}
```

### Pattern 4: Resend Email with React Email Template

**What:** `@react-email/render` converts a React component to HTML string; `resend.emails.send()` delivers it.

```typescript
// src/server/email/InquiryEmail.tsx
// Source: Resend Node.js docs + react-email integration docs
import { Html, Body, Heading, Text, Section } from '@react-email/components'

interface InquiryEmailProps {
  contactName: string
  companyName: string
  email: string
  // ... all inquiry fields
}

export function InquiryEmail({ contactName, companyName, email, ...props }: InquiryEmailProps) {
  return (
    <Html>
      <Body>
        <Heading>New Inquiry from {companyName}</Heading>
        <Section>
          <Text>Contact: {contactName}</Text>
          <Text>Email: {email}</Text>
          {/* ... all fields */}
        </Section>
      </Body>
    </Html>
  )
}

// In API route handler:
import { render } from '@react-email/render'
import { InquiryEmail } from '@/server/email/InquiryEmail'

const html = await render(<InquiryEmail {...inquiryData} />)
const resend = new Resend(process.env.RESEND_API_KEY)
await resend.emails.send({
  from: 'noreply@wischosgift.com',   // must be verified domain in Resend
  to: process.env.OPERATOR_EMAIL!,
  subject: `New Inquiry — ${inquiryData.companyName}`,
  html,
})
```

**CRITICAL:** `RESEND_API_KEY` and `OPERATOR_EMAIL` are server-only `process.env` variables — no `VITE_PUBLIC_` prefix. They are safe in a server route (never bundled to client).

### Pattern 5: Supabase RLS Configuration

**What:** SQL policies applied via Supabase Dashboard → SQL Editor. Two policies needed on the `inquiries` table.

**Critical insight from research:** The Supabase PostgREST client performs a SELECT after INSERT to return the inserted row. This means: if you only add an INSERT policy with no SELECT policy, the INSERT will silently fail or error in the client library. Two approaches:

**Approach A (recommended for Drizzle):** Drizzle's `db.insert()` does not auto-SELECT after insert unless you chain `.returning()`. As long as the API route does NOT use `.returning()`, only an INSERT policy is needed.

**Approach B (belt-and-suspenders):** Add both INSERT policy (`WITH CHECK (true)`) and SELECT policy with `USING (false)` to explicitly block reads.

```sql
-- Enable RLS on the table (if not already done)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous INSERT (anyone can submit an inquiry)
CREATE POLICY "allow_anon_insert"
  ON inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Block anonymous SELECT (inquiries are private)
CREATE POLICY "block_anon_select"
  ON inquiries
  FOR SELECT
  TO anon
  USING (false);
```

**How to apply:** Supabase Dashboard → project → SQL Editor → paste and run. This is **not** done via drizzle-kit (drizzle-kit push manages table schema, not RLS policies).

### Anti-Patterns to Avoid

- **Using `VITE_PUBLIC_` prefix on RESEND_API_KEY or DATABASE_URL:** Exposes secrets to the client bundle. Server route uses `process.env` directly — no prefix needed.
- **Calling Resend from a server function (createServerFn):** Community-confirmed issue — Resend must be called from a Server Route (`createAPIFileRoute`). This is already documented in STATE.md.
- **Using `@tanstack/zod-form-adapter`:** This adapter package was deprecated in Zod 3.24.0. Zod v4 supports Standard Schema natively — pass schemas directly to `validators`.
- **Chaining `.returning()` on Drizzle insert without a SELECT RLS policy:** Will fail silently or error. Don't use `.returning()` in the API route unless you add a SELECT policy.
- **Redirecting on success:** INQ-07 requires in-place success message. Use `useState` flag to switch between form view and success view.
- **Client-side only validation:** Always re-validate with Zod on the server in the POST handler. Never trust client-submitted data.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Email HTML templating | Custom string concatenation | `@react-email/components` + `render()` | Already installed; type-safe; cross-client CSS handling; preview tooling |
| Form state management | Custom `useState` per field | `@tanstack/react-form` | Already installed; handles touched/dirty/error state; prevents double-submit |
| Schema validation | Custom if/else checks | Zod v4 Standard Schema | Already installed; composable; reusable between client and server |
| Spam filtering | Complex ML/IP filtering | Honeypot field | Sufficient for B2B low-volume form; zero user friction |
| RLS policy management | Custom auth middleware | Supabase native RLS | PostgreSQL-native; zero application code; audit-friendly |

---

## Common Pitfalls

### Pitfall 1: Resend "From" address not verified

**What goes wrong:** Resend rejects sends from unverified domains. Using `onboarding@resend.dev` works in test mode but not in production with a custom domain.

**Why it happens:** Resend requires SPF/DKIM/DMARC DNS records for the sending domain before allowing production sends.

**How to avoid:** The operator must verify `wischosgift.com` (or whatever sending domain) in Resend Dashboard before Phase 4 production testing. This is a client-side dependency flagged in STATE.md. During development, use `onboarding@resend.dev` as the `from` address for testing.

**Warning signs:** `422 Unprocessable Entity` response from Resend API, or error message mentioning domain verification.

### Pitfall 2: Supabase INSERT failing due to missing SELECT policy

**What goes wrong:** Anonymous INSERT appears to fail with no clear error. Drizzle insert silently fails.

**Why it happens:** Only relevant if the route uses `.returning()`. Without `.returning()`, Drizzle does not issue a SELECT and the INSERT-only policy is sufficient. **Do not use `.returning()` in this route.**

**How to avoid:** Never chain `.returning()` on the inquiry insert. Apply both INSERT and SELECT policies as described in Pattern 5 as belt-and-suspenders.

**Warning signs:** No row appears in Supabase dashboard after a 200 response.

### Pitfall 3: `createAPIFileRoute` vs `createServerFileRoute` confusion

**What goes wrong:** Importing from wrong path — `createServerFileRoute` is a different API and has known bugs with method-level middleware in 2025.

**Why it happens:** TanStack Start docs show both patterns; they serve different purposes.

**How to avoid:** Use `createAPIFileRoute` from `'@tanstack/start/api'` for JSON REST endpoints. Place the file at `src/routes/api/inquiry.ts`. The route exports `APIRoute` (not `Route`).

**Warning signs:** TypeScript errors about missing handler types; "handler is not a function" runtime error.

### Pitfall 4: `@tanstack/zod-form-adapter` import

**What goes wrong:** Importing `zodValidator` from `@tanstack/zod-form-adapter` fails (package deprecated) or `standardSchemaValidator` is not found.

**Why it happens:** Zod v4 implements Standard Schema natively. TanStack Form v1 detects Standard Schema-compatible objects automatically.

**How to avoid:** Pass the Zod schema object directly to `validators: { onSubmit: myZodSchema }` in `useForm`. No adapter import needed.

### Pitfall 5: Form double-submit

**What goes wrong:** User clicks Submit twice quickly; two DB rows created; two emails sent.

**Why it happens:** No submit-in-progress guard.

**How to avoid:** Check `form.state.isSubmitting` to disable the Submit button while inflight:

```tsx
<button type="submit" disabled={form.state.isSubmitting}>
  {form.state.isSubmitting ? 'Sending...' : 'Send Inquiry'}
</button>
```

### Pitfall 6: Honeypot field visible to assistive technology

**What goes wrong:** Screen reader announces a hidden field that users should not fill.

**Why it happens:** Using `visibility: hidden` or `display: none` is ignored by some bots but also hides from screen readers properly. The CSS off-screen trick is preferred.

**How to avoid:** Use `aria-hidden="true"` on the wrapping container plus `tabIndex={-1}` on the input, along with absolute positioning off-screen.

---

## Code Examples

### API Route — Full POST Handler

```typescript
// src/routes/api/inquiry.ts
// Source: TanStack Start API routes WebSearch + pattern from existing codebase
import { createAPIFileRoute } from '@tanstack/start/api'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { db } from '@/server/db'
import { inquiries } from '@/server/schema'
import { InquiryEmail } from '@/server/email/InquiryEmail'
import { inquiryInsertSchema } from '@/lib/schemas/inquiry'

export const APIRoute = createAPIFileRoute('/api/inquiry')({
  POST: async ({ request }) => {
    const body = await request.json()

    // Honeypot check
    if (body.website) {
      return Response.json({ success: true })
    }

    // Server-side validation
    const parsed = inquiryInsertSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { error: 'Invalid submission', details: parsed.error.issues },
        { status: 400 },
      )
    }

    const data = parsed.data

    // Persist to Supabase (no .returning() — avoids SELECT RLS requirement)
    await db.insert(inquiries).values(data)

    // Send operator notification
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const html = await render(<InquiryEmail {...data} />)
      await resend.emails.send({
        from: 'noreply@wischosgift.com',
        to: process.env.OPERATOR_EMAIL!,
        subject: `New Inquiry — ${data.companyName}`,
        html,
      })
    } catch (emailErr) {
      // Email failure does NOT fail the request — inquiry is already saved
      console.error('Email send failed:', emailErr)
    }

    return Response.json({ success: true })
  },
})
```

### Zod Schema (shared between client and server)

```typescript
// src/lib/schemas/inquiry.ts
// Standalone Zod schema — NOT drizzle-zod (project decision: incompatible with Zod v4)
import { z } from 'zod'

export const inquiryInsertSchema = z.object({
  contactName: z.string().min(1, 'Full name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
})

export type InquiryInsert = z.infer<typeof inquiryInsertSchema>
```

### TanStack Form Field with Error Display

```typescript
// Source: TanStack Form docs + shadcn/ui field pattern
<form.Field name="email">
  {(field) => (
    <div className="space-y-1">
      <label htmlFor="email" className="text-sm font-medium">
        Email Address <span className="text-destructive">*</span>
      </label>
      <input
        id="email"
        type="email"
        className="w-full border rounded-md px-3 py-2 text-sm"
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
        <p className="text-sm text-destructive">
          {field.state.meta.errors[0]}
        </p>
      )}
    </div>
  )}
</form.Field>
```

### Success State Toggle

```typescript
// In InquiryFormSection
const [isSuccess, setIsSuccess] = useState(false)

const form = useForm({
  // ...
  onSubmit: async ({ value }) => {
    const res = await fetch('/api/inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...value }),
    })
    if (res.ok) {
      setIsSuccess(true)
    }
  },
})

if (isSuccess) {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold">Thank you for your inquiry</h2>
      <p className="mt-2 text-muted-foreground">
        We will be in touch within one business day.
      </p>
    </div>
  )
}

return <form onSubmit={...}>{/* form fields */}</form>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@tanstack/zod-form-adapter` zodValidator | Zod v4 Standard Schema (pass directly) | Zod 3.24.0 / 2025 | No adapter package needed; simpler import |
| `createServerFileRoute` for API endpoints | `createAPIFileRoute` from `@tanstack/start/api` | TanStack Start RC 2025 | Correct import path for REST endpoints |
| HTML string email templates | `@react-email/components` + `render()` | ~2023, mature in 2025 | Type-safe, testable, cross-client compatible |

**Deprecated/outdated:**
- `@tanstack/zod-form-adapter`: Deprecated as of Zod 3.24.0. Don't install or import.
- `createServerFileRoute` with `.methods()`: Known bug with per-method middleware in 2025 (GitHub issue #4490). Use `createAPIFileRoute` instead.

---

## Open Questions

1. **Resend sending domain**
   - What we know: `resend` is installed; Resend requires verified domain DNS records for production sends.
   - What's unclear: Whether `wischosgift.com` is verified in the operator's Resend account.
   - Recommendation: Use `onboarding@resend.dev` as `from` address during dev/test; note that production requires domain verification (client action required). Plan should include `OPERATOR_EMAIL` env var addition to `.env.local` and Vercel env config.

2. **Whether `/inquiry` route is kept or merged into `/contact`**
   - What we know: Both `contact.tsx` and `inquiry.tsx` stubs exist. INQ-01 says "Contact page with ... embedded inquiry form." All CTAs from Phase 2/3 link to `/inquiry`.
   - What's unclear: Whether the form lives only on `/contact` or also on `/inquiry` (or if they share a component).
   - Recommendation: Implement the form in `InquiryFormSection` (shared component). Both routes import it. `contact.tsx` gets the contact details section + form. `inquiry.tsx` shows only the form (for direct CTA links).

3. **`drizzle-kit push` status**
   - What we know: STATE.md notes "drizzle-kit push not yet run" as a pending blocker. The `inquiries` table may not exist in Supabase yet.
   - What's unclear: Whether the operator has run `drizzle-kit push` since Phase 1 execution.
   - Recommendation: Phase 4 plans should include a task that verifies the table exists (or re-runs `npx drizzle-kit push`) before writing the API route.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 3.0.5 |
| Config file | `vitest.config.ts` (root) |
| Quick run command | `npm test` |
| Full suite command | `npm test` |
| Environment | jsdom + `@testing-library/react` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INQ-01 | Contact page renders contact details section | unit | `npm test -- --reporter verbose src/components/__tests__/InquiryForm.test.tsx` | ❌ Wave 0 |
| INQ-02 | Form renders all required fields | unit | same file | ❌ Wave 0 |
| INQ-03 | Zod validation shows inline errors for invalid email, empty required fields | unit | same file | ❌ Wave 0 |
| INQ-04 | POST /api/inquiry inserts row to Supabase | manual-only | Supabase dashboard check | N/A — requires real DB |
| INQ-05 | Resend email sent on submission | manual-only | Check inbox within 60s | N/A — requires real credentials |
| INQ-06 | Honeypot-filled submission is silently rejected | unit (server logic) | test schema validation helper | ❌ Wave 0 (schema test) |
| INQ-07 | Success message appears after valid submit (no redirect) | unit | InquiryForm.test.tsx | ❌ Wave 0 |
| INQ-08 | RLS blocks anonymous SELECT | manual-only | Supabase SQL editor test query | N/A — Supabase dashboard |

**Note on INQ-04, INQ-05, INQ-08:** These require live infrastructure (Supabase, Resend, DNS). They are manual-only verification steps, not automatable in jsdom. The Phase 4 success criteria explicitly requires "confirmed via Supabase dashboard" and "confirmed with a real submission."

### Sampling Rate

- **Per task commit:** `npm test`
- **Per wave merge:** `npm test`
- **Phase gate:** Full suite green + manual browser verification before `/gsd:verify-work 4`

### Wave 0 Gaps

- [ ] `src/components/__tests__/InquiryForm.test.tsx` — covers INQ-01, INQ-02, INQ-03, INQ-07
- [ ] `src/lib/schemas/inquiry.ts` — shared Zod schema (covers INQ-03 schema definition)
- [ ] `src/content/__tests__/contact.test.ts` — covers content module shape for contact page

*(Existing test infrastructure — `vitest.config.ts`, `src/tests/setup.ts`, `@testing-library/jest-dom` — covers all framework needs. No new framework setup required.)*

---

## Sources

### Primary (HIGH confidence)

- TanStack Start API Routes docs — `createAPIFileRoute` pattern, POST handler, `request.json()`, `Response.json()`
- `src/server/schema.ts` (project file) — exact column names for `inquiries` table
- `src/server/db.ts` (project file) — `prepare: false, max: 1` constraints confirmed
- `package.json` (project file) — all required packages already installed, versions confirmed
- Resend Node.js SDK docs (`resend.com/nodejs`) — `resend.emails.send()` signature confirmed

### Secondary (MEDIUM confidence)

- Supabase RLS guide (supabase.com/docs) — INSERT + SELECT policy pattern for anon role
- TanStack Form GitHub issue #1136 — zodValidator deprecation, Standard Schema migration confirmed
- WebSearch results for `createAPIFileRoute` usage pattern (multiple sources agree)

### Tertiary (LOW confidence)

- WebSearch: Zod v4 passes Standard Schema natively to `useForm validators` without adapter — plausible but not verified against live TanStack Form v1.28.4 docs; flag for implementation validation
- WebSearch: Resend `react` property vs `html` property — confirmed `html` works; `react` shorthand may require `react-email` direct integration

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages already installed and confirmed in package.json
- Architecture (API route pattern): HIGH — TanStack Start docs + multiple WebSearch sources agree on `createAPIFileRoute`
- Architecture (form validation): MEDIUM — Zod v4 Standard Schema approach is documented but specific `@tanstack/react-form` v1.28.4 behavior with Zod v4 should be validated at implementation time
- RLS patterns: MEDIUM — Supabase official docs confirm the pattern; the "no SELECT needed if no .returning()" nuance is from community discussions
- Pitfalls: HIGH — drawn from project STATE.md decisions + official docs

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (TanStack Start RC — check patch release notes if > 2 weeks pass)

import { defineHandler } from 'nitro'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { db } from '@/server/db'
import { inquiries } from '@/server/schema'
import { inquiryInsertSchema } from '@/lib/schemas/inquiry'
import { InquiryEmail } from '@/server/email/InquiryEmail'

export const APIRoute = defineHandler(async (event) => {
  const body = (await event.req.json()) as Record<string, unknown>

  // Honeypot check — silent fake success for bots
  if (typeof body.website === 'string' && body.website.length > 0) {
    return Response.json({ success: true })
  }

  // Server-side validation
  const parsed = inquiryInsertSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Invalid submission' }, { status: 400 })
  }

  // Persist to DB — no .returning() to avoid SELECT RLS requirement
  await db.insert(inquiries).values(parsed.data)

  // Send email notification — failure is non-fatal
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const html = await render(
      <InquiryEmail {...parsed.data} submittedAt={new Date().toISOString()} />,
    )
    await resend.emails.send({
      from: 'onboarding@resend.dev', // dev fallback — production requires verified domain
      to: process.env.OPERATOR_EMAIL!,
      subject: `New Inquiry — ${parsed.data.companyName}`,
      html,
    })
  } catch (emailErr) {
    console.error('[inquiry] Email send failed:', emailErr)
    // Do not re-throw — inquiry is saved, email failure is non-fatal
  }

  return Response.json({ success: true })
})

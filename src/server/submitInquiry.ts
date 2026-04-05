import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { db } from '@/server/db'
import { inquiries } from '@/server/schema'
import { inquiryInsertSchema } from '@/lib/schemas/inquiry'
import { InquiryEmail } from '@/server/email/InquiryEmail'

// Extend with honeypot field — validated and stripped server-side
const submitInquirySchema = inquiryInsertSchema.extend({
  website: z.string().optional(),
})

export const submitInquiry = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => submitInquirySchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot check — silent fake success for bots
    if (data.website) {
      return { success: true }
    }

    const { website: _honeypot, ...inquiry } = data

    // Persist to DB — no .returning() to avoid SELECT RLS requirement
    await db.insert(inquiries).values(inquiry)

    // Send email notification — failure is non-fatal
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const html = await render(
        InquiryEmail({ ...inquiry, submittedAt: new Date().toISOString() }),
      )
      await resend.emails.send({
        from: 'Wischos Gift <inquiries@wischosgift.com>',
        to: process.env.OPERATOR_EMAIL!,
        subject: `New Inquiry — ${inquiry.companyName}`,
        html,
      })
    } catch (emailErr) {
      console.error('[inquiry] Email send failed:', emailErr)
      // Do not re-throw — inquiry is saved, email failure is non-fatal
    }

    return { success: true }
  })

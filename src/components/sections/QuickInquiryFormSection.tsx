'use client'
import { useState, useRef } from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { inquiryInsertSchema } from '@/lib/schemas/inquiry'
import { submitInquiry } from '@/server/submitInquiry'
import { trackQualifyLead, trackFormStarted } from '@/lib/analytics'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Extend with honeypot for spam prevention; companyName auto-filled for ads landing
const quickInquirySchema = inquiryInsertSchema.extend({
  website: z.string().optional(),
})

const QUANTITY_OPTIONS = [
  { value: '50-100 sets', label: '50–100 sets' },
  { value: '100-300 sets', label: '100–300 sets' },
  { value: '300-500 sets', label: '300–500 sets' },
  { value: '500-1000 sets', label: '500–1,000 sets' },
  { value: '1000+ sets', label: '1,000+ sets' },
  { value: 'Not sure yet', label: 'Not sure yet — advise me' },
]

/**
 * Simplified inquiry form optimised for Google Ads / paid landing pages.
 * Only 4 fields (Name, Email, Quantity, What you need) to maximise conversion.
 * Uses the same backend as the full InquiryFormSection.
 */
export function QuickInquiryFormSection({
  heading = 'Get a metal gift quote in 24 hours',
  subheading = 'Tell us what you need — we respond within 1 business day with samples, pricing, and a custom set direction.',
  landingContext,
}: {
  heading?: string
  subheading?: string
  landingContext?: string
}) {
  const navigate = useNavigate()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const formStartedFired = useRef(false)

  function handleFormFocus() {
    if (!formStartedFired.current) {
      formStartedFired.current = true
      trackFormStarted()
    }
  }

  const form = useForm({
    defaultValues: {
      contactName: '',
      companyName: '(Provided in follow-up)',
      role: '',
      email: '',
      phone: '',
      productInterest: landingContext || 'Other / Multiple Products',
      destinationCountry: '',
      incoterm: 'Not Sure',
      quantity: '',
      timeline: '',
      message: '',
      website: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onSubmit: quickInquirySchema as any },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        await submitInquiry({ data: value })
        trackQualifyLead({
          productInterest: value.productInterest,
          companyName: value.companyName,
        })
        navigate({ to: '/thank-you' })
      } catch {
        setSubmitError(
          'Something went wrong. Please try again or email johnlui@wischosgift.com.',
        )
      }
    },
  })

  return (
    <div
      style={{
        border: '1px solid #e5e5e5',
        padding: '2rem',
        borderRadius: '2px',
        background: '#fff',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          marginBottom: '0.6rem',
          lineHeight: 1.2,
        }}
      >
        {heading}
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        {subheading}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-5 max-w-xl"
      >
        {/* Honeypot — visually hidden */}
        <form.Field name="website">
          {(field) => (
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            >
              <label htmlFor="hp-website-quick">Website</label>
              <input
                id="hp-website-quick"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Field 1: Full Name */}
        <form.Field name="contactName">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="qf-contactName">
                Your Name <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="qf-contactName"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                onFocus={handleFormFocus}
                placeholder="John Smith"
              />
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive mt-1">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Field 2: Email */}
        <form.Field name="email">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="qf-email">
                Email <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="qf-email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                onFocus={handleFormFocus}
                placeholder="you@company.com"
              />
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive mt-1">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Field 3: Quantity */}
        <form.Field name="quantity">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="qf-quantity">Estimated Quantity</Label>
              <Select
                value={field.state.value || ''}
                onValueChange={(v) => field.handleChange(v)}
              >
                <SelectTrigger id="qf-quantity">
                  <SelectValue placeholder="Select quantity range" />
                </SelectTrigger>
                <SelectContent>
                  {QUANTITY_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Field 4: What metal gift do you need? */}
        <form.Field name="message">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="qf-message">What metal gift do you need?</Label>
              <Textarea
                id="qf-message"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                onFocus={handleFormFocus}
                placeholder="E.g. branded brass pens for sales team onboarding, titanium drinkware for executive gifts, custom metal sets for client appreciation programme..."
                rows={4}
              />
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <div className="pt-2">
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? 'Sending…' : 'Request a Quote'}
              </Button>
            )}
          </form.Subscribe>
        </div>

        {submitError && (
          <p className="text-sm text-destructive mt-2">{submitError}</p>
        )}

        {/* Trust signals */}
        <div
          style={{
            borderTop: '1px solid #e5e5e5',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            fontSize: '0.78rem',
            color: '#888',
            lineHeight: 1.6,
          }}
        >
          <p style={{ marginBottom: '0.3rem' }}>
            ⏱️ Response within 1 business day · ✉️{' '}
            <a
              href="mailto:johnlui@wischosgift.com"
              style={{ color: '#B87333', textDecoration: 'none' }}
            >
              johnlui@wischosgift.com
            </a>
          </p>
          <p style={{ marginBottom: '0.3rem' }}>
            🔒 We only contact you about your inquiry. No marketing emails.
          </p>
          <p style={{ marginBottom: 0 }}>
            🏭 Metal specialist B2B sourcing · MOQ 100 · 25–35 day production from China
          </p>
        </div>
      </form>
    </div>
  )
}

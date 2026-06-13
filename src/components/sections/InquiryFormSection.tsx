'use client'
import { useState, useRef } from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { inquiryInsertSchema, BUYER_TYPE_OPTIONS } from '@/lib/schemas/inquiry'
import { submitInquiry } from '@/server/submitInquiry'
import { trackQualifyLead, trackFormStarted } from '@/lib/analytics'
import { contactContent } from '@/content/contact'
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

// buyerType is form-only; on submit it is prepended to the message field
// so John can see the audience type in the email notification without a DB migration.
const inquiryFormSchema = inquiryInsertSchema.extend({
  website: z.string().optional(),
  buyerType: z.string().optional(),
})

const QUANTITY_OPTIONS = [
  { value: '50-100 sets', label: '50–100 sets' },
  { value: '100-300 sets', label: '100–300 sets' },
  { value: '300-500 sets', label: '300–500 sets' },
  { value: '500-1000 sets', label: '500–1,000 sets' },
  { value: '1000+ sets', label: '1,000+ sets' },
  { value: 'Not sure yet', label: 'Not sure yet — advise me' },
]

export function InquiryFormSection() {
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
      companyName: '',
      role: '',
      email: '',
      phone: '',
      productInterest: '',
      destinationCountry: '',
      incoterm: '',
      quantity: '',
      timeline: '',
      message: '',
      website: '',
      buyerType: '',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onSubmit: inquiryFormSchema as any },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        // Strip buyerType (form-only) and prepend its label to the message body
        // so it appears in the email notification and inquiry record.
        const { buyerType, ...rest } = value
        const buyerTypeLabel = BUYER_TYPE_OPTIONS.find((o) => o.value === buyerType)?.label
        const messageWithBuyerType = buyerTypeLabel
          ? `[Buyer type: ${buyerTypeLabel}]\n\n${rest.message || ''}`.trim()
          : rest.message
        const payload = { ...rest, message: messageWithBuyerType }
        await submitInquiry({ data: payload })
        trackQualifyLead({
          productInterest: value.productInterest,
          companyName: value.companyName,
        })
        navigate({ to: '/thank-you' })
      } catch {
        setSubmitError('Something went wrong. Please try again or email us directly.')
      }
    },
  })

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight mb-2">Tell us about your project</h2>
      <p style={{ fontSize: '0.85rem', color: '#6b6b6b', marginBottom: '0.6rem' }}>
        Whether you're enquiring about a product in our catalogue or something entirely custom, leave the rest to us.
      </p>
      <p style={{ fontSize: '0.85rem', color: '#6b6b6b', marginBottom: '2rem' }}>
        Fields marked with * are required.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-6 max-w-xl"
      >
        {/* Honeypot — visually hidden, off-screen */}
        <form.Field name="website">
          {(field) => (
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
            >
              <label htmlFor="hp-website">Website</label>
              <input
                id="hp-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        {/* Full Name — required */}
        <form.Field name="contactName">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="contactName">
                Full Name <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="contactName"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                onFocus={handleFormFocus}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive mt-1">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Company Name — required */}
        <form.Field name="companyName">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="companyName">
                Company Name <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="companyName"
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive mt-1">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Buyer Type — optional but routing-critical */}
        <form.Field name="buyerType">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="buyerType">Are you?</Label>
              <Select
                value={field.state.value || ''}
                onValueChange={(v) => field.handleChange(v)}
              >
                <SelectTrigger id="buyerType">
                  <SelectValue placeholder="Select what best describes you" />
                </SelectTrigger>
                <SelectContent>
                  {BUYER_TYPE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Email — required */}
        <form.Field name="email">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="email">
                Email <span aria-hidden="true">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive mt-1">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Estimated Quantity — optional */}
        <form.Field name="quantity">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="quantity">Estimated Quantity</Label>
              <Select
                value={field.state.value || ''}
                onValueChange={(v) => field.handleChange(v)}
              >
                <SelectTrigger id="quantity">
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

        {/* Message — optional */}
        <form.Field name="message">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="message">Message / Requirements</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Product, destination, logo / branding, timeline — anything that helps us quote."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        {/* Submit error */}
        {submitError && <p className="text-sm text-destructive">{submitError}</p>}

        {/* Submit button + response time */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                type="submit"
                disabled={isSubmitting}
                style={{ background: 'var(--accent-brand)', borderColor: 'var(--accent-brand)' }}
                onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand-light)' }}
                onMouseLeave={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.background = 'var(--accent-brand)' }}
              >
                {isSubmitting ? 'Sending...' : 'Request a Quote'}
              </Button>
              <p className="text-sm text-muted-foreground">{contactContent.responseTime}</p>
            </div>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}

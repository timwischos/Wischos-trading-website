'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { useSearch } from '@tanstack/react-router'
import { inquiryInsertSchema } from '@/lib/schemas/inquiry'
import { submitInquiry } from '@/server/submitInquiry'
import { trackQualifyLead } from '@/lib/analytics'
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

// Extend schema with honeypot field for form-level validation
const inquiryFormSchema = inquiryInsertSchema.extend({
  website: z.string().optional(),
})

const PRODUCT_OPTIONS = [
  { value: 'Writing Instruments', label: 'Writing Instruments' },
  { value: 'Desk Accessories', label: 'Desk Accessories' },
  { value: 'EDC Accessories', label: 'EDC Accessories' },
  { value: 'Drinkware', label: 'Drinkware' },
  { value: 'Gift Sets', label: 'Gift Sets' },
  { value: 'Other / Multiple Products', label: 'Other / Multiple Products' },
]

export function InquiryFormSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = useSearch({ strict: false }) as any
  const productParam: string | undefined = search?.product

  let initialProduct = ''
  if (productParam !== undefined) {
    const matched = PRODUCT_OPTIONS.find((opt) => opt.value === productParam)
    initialProduct = matched ? matched.value : 'Other / Multiple Products'
  }

  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const form = useForm({
    defaultValues: {
      contactName: '',
      companyName: '',
      role: '',
      email: '',
      phone: '',
      productInterest: initialProduct,
      quantity: '',
      timeline: '',
      message: '',
      website: '', // honeypot
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validators: { onSubmit: inquiryFormSchema as any },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        await submitInquiry({ data: value })
        trackQualifyLead({
          productInterest: value.productInterest,
          companyName: value.companyName,
        })
        setIsSuccess(true)
      } catch {
        setSubmitError('Something went wrong. Please try again or email us directly.')
      }
    },
  })

  if (isSuccess) {
    return (
      <div className="py-16 text-left">
        <h2 className="text-2xl font-semibold tracking-tight">Thank you.</h2>
        <p className="mt-3 text-muted-foreground">We'll review your inquiry and get back to you within 2 business days.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight mb-2">Tell us about your project</h2>
      <p style={{ fontSize: '0.85rem', color: '#6b6b6b', marginBottom: '0.6rem' }}>
        Whether you're enquiring about a product in our catalogue or something entirely custom, we're happy to help source it.
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

        {/* Product Interest — required feel but optional in schema */}
        <form.Field name="productInterest">
          {(field) => (
            <div className="space-y-1">
              <Label>Product Interest</Label>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product category" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        {/* Expandable additional details */}
        <div>
          <button
            type="button"
            onClick={() => setShowDetails(d => !d)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontSize: '0.8rem', color: '#6b6b6b', display: 'flex', alignItems: 'center', gap: '0.35rem',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#6b6b6b' }}
          >
            <span style={{
              display: 'inline-block', transition: 'transform 200ms ease',
              transform: showDetails ? 'rotate(90deg)' : 'rotate(0deg)',
              fontSize: '0.7rem',
            }}>▶</span>
            Add more details (optional)
          </button>

          <div style={{
            overflow: 'hidden',
            maxHeight: showDetails ? '40rem' : '0',
            transition: 'max-height 300ms ease',
            marginTop: showDetails ? '1rem' : '0',
          }}>
            <div className="space-y-6">
              {/* Phone — optional */}
              <form.Field name="phone">
                {(field) => (
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              </form.Field>

              {/* Job Title — optional */}
              <form.Field name="role">
                {(field) => (
                  <div className="space-y-1">
                    <Label htmlFor="role">Job Title</Label>
                    <Input
                      id="role"
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              </form.Field>

              {/* Estimated Quantity — optional */}
              <form.Field name="quantity">
                {(field) => (
                  <div className="space-y-1">
                    <Label htmlFor="quantity">Estimated Quantity</Label>
                    <Input
                      id="quantity"
                      type="text"
                      placeholder="e.g. 200 sets"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              </form.Field>

              {/* Target Timeline — optional */}
              <form.Field name="timeline">
                {(field) => (
                  <div className="space-y-1">
                    <Label htmlFor="timeline">Target Timeline</Label>
                    <Input
                      id="timeline"
                      type="text"
                      placeholder="e.g. Q3 2026"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
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
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
        </div>

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
                {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
              </Button>
              <p className="text-sm text-muted-foreground">{contactContent.responseTime}</p>
            </div>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}

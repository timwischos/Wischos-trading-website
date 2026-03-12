'use client'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from '@tanstack/react-form'
import { useSearch } from '@tanstack/react-router'
import { inquiryInsertSchema } from '@/lib/schemas/inquiry'
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
  { value: 'Architect Desk Set', label: 'Architect Desk Set' },
  { value: 'Signature Pen Collection', label: 'Signature Pen Collection' },
  { value: 'Castro Catchall Tray', label: 'Castro Catchall Tray' },
  { value: 'Executive EDC Set', label: 'Executive EDC Set' },
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
        const res = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        })
        if (res.ok) {
          setIsSuccess(true)
        } else {
          setSubmitError('Something went wrong. Please try again or email us directly.')
        }
      } catch {
        setSubmitError('Something went wrong. Please try again or email us directly.')
      }
    },
  })

  if (isSuccess) {
    return (
      <div className="py-16 text-left">
        <h2 className="text-2xl font-semibold tracking-tight">Thank you.</h2>
        <p className="mt-3 text-muted-foreground">We'll be in touch within 2 business days.</p>
      </div>
    )
  }

  return (
    <div className="page-wrap py-12">
      <h2 className="text-2xl font-semibold tracking-tight mb-8">{contactContent.formHeading}</h2>

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

        {/* Product Interest — Select */}
        <form.Field name="productInterest">
          {(field) => (
            <div className="space-y-1">
              <Label>Product Interest</Label>
              <Select
                value={field.state.value}
                onValueChange={(val) => field.handleChange(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product series" />
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

        {/* Message / Requirements — optional */}
        <form.Field name="message">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor="message">Message / Requirements</Label>
              <Textarea
                id="message"
                rows={5}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
            </div>
          )}
        </form.Field>

        {/* Submit error */}
        {submitError && <p className="text-sm text-destructive">{submitError}</p>}

        {/* Submit button */}
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  )
}

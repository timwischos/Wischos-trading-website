'use client'
import { useState, useRef } from 'react'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { CUSTOM_PROJECT_INTEREST, customProjectBriefSchema } from '@/lib/schemas/customProject'
import { submitInquiry } from '@/server/submitInquiry'
import { trackQualifyLead, trackFormStarted } from '@/lib/analytics'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function FieldError({ id, errors, touched }: { id: string; errors: unknown[]; touched: boolean }) {
  if (!touched || errors.length === 0) return null
  const error = errors[0] as { message?: string } | string
  return <p id={id} className="mt-1 text-sm text-destructive">{typeof error === 'string' ? error : error?.message ?? String(error)}</p>
}

/** Three-field custom enquiry; project details can be discussed by email. */
export function CustomProjectFormSection() {
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
    defaultValues: { contactName: '', email: '', message: '', website: '' },
    validators: { onSubmit: customProjectBriefSchema },
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      try {
        const brief = customProjectBriefSchema.parse(value)
        await submitInquiry({ data: { ...brief, productInterest: CUSTOM_PROJECT_INTEREST } })
        trackQualifyLead({ productInterest: CUSTOM_PROJECT_INTEREST })
        navigate({ to: '/thank-you' })
      } catch {
        setSubmitError('Something went wrong. Please try again or email johnlui@wischosgift.com.')
      }
    },
  })

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        form.handleSubmit()
      }}
      className="min-w-0 space-y-5"
    >
      <form.Field name="website">
        {(field) => (
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <label htmlFor="hp-website-custom">Website</label>
            <input id="hp-website-custom" type="text" tabIndex={-1} autoComplete="off" value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} />
          </div>
        )}
      </form.Field>

      <form.Field name="contactName">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor="cp-contactName">Your name</Label>
            <Input id="cp-contactName" autoComplete="name" maxLength={255} aria-required="true" aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0} aria-describedby={field.state.meta.errors.length ? 'cp-contactName-error' : undefined} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} onFocus={handleFormFocus} placeholder="Jane Smith" />
            <FieldError id="cp-contactName-error" errors={field.state.meta.errors} touched={field.state.meta.isTouched} />
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor="cp-email">Email</Label>
            <Input id="cp-email" type="email" autoComplete="email" maxLength={255} aria-required="true" aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0} aria-describedby={field.state.meta.errors.length ? 'cp-email-error' : undefined} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} onFocus={handleFormFocus} placeholder="you@company.com" />
            <FieldError id="cp-email-error" errors={field.state.meta.errors} touched={field.state.meta.isTouched} />
          </div>
        )}
      </form.Field>

      <form.Field name="message">
        {(field) => (
          <div className="space-y-1">
            <Label htmlFor="cp-message">Tell us your idea</Label>
            <Textarea id="cp-message" rows={5} aria-required="true" aria-invalid={field.state.meta.isTouched && field.state.meta.errors.length > 0} aria-describedby={['cp-message-help', field.state.meta.errors.length ? 'cp-message-error' : ''].filter(Boolean).join(' ')} value={field.state.value} onChange={(event) => field.handleChange(event.target.value)} onBlur={field.handleBlur} onFocus={handleFormFocus} placeholder="What would you like to make? A few sentences or a reference link is enough." />
            <FieldError id="cp-message-error" errors={field.state.meta.errors} touched={field.state.meta.isTouched} />
            <p id="cp-message-help" className="text-xs leading-relaxed text-muted-foreground">If known, add your quantity and target date. We can work out the details together.</p>
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting} className="w-full">
            {isSubmitting ? 'Sending…' : 'Send enquiry'}
          </Button>
        )}
      </form.Subscribe>

      {submitError && <p role="alert" className="text-sm text-destructive">{submitError}</p>}
      <p className="text-xs text-muted-foreground">We will follow up about your project. No marketing emails.</p>
    </form>
  )
}

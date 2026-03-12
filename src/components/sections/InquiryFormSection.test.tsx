import { describe, it } from 'vitest'
// Component imported — tests will be implemented once .todo stubs are filled
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InquiryFormSection as _InquiryFormSection } from '@/components/sections/InquiryFormSection'

describe('InquiryFormSection', () => {
  it.todo('renders all required form fields: Full Name, Company Name, Job Title, Email, Phone, Product Interest, Estimated Quantity, Target Timeline, Message')
  it.todo('Product Interest select has 5 options: Architect Desk Set, Signature Pen Collection, Castro Catchall Tray, Executive EDC Set, Other / Multiple Products')
  it.todo('shows inline error "Full name is required" when Full Name is empty on submit')
  it.todo('shows inline error "Please enter a valid email address" for invalid email on submit')
  it.todo('replaces form with thank-you message after successful submission (no redirect)')
  it.todo('disables Submit button while form.state.isSubmitting is true')
  it.todo('shows inline submission error above form on network failure (form content preserved)')
})

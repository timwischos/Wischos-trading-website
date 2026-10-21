import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { customProjectInquirySchema } from '@/lib/schemas/customProject'

const mocks = vi.hoisted(() => ({ submit: vi.fn(), navigate: vi.fn() }))
vi.mock('@/server/submitInquiry', () => ({ submitInquiry: mocks.submit }))
vi.mock('@tanstack/react-router', () => ({ useNavigate: () => mocks.navigate }))
vi.mock('@/lib/analytics', () => ({ trackFormStarted: vi.fn(), trackQualifyLead: vi.fn() }))
import { CustomProjectFormSection } from '@/components/sections/CustomProjectFormSection'

afterEach(() => { cleanup(); vi.resetAllMocks() })

function fill(values: Record<string, string> = {}) {
  for (const [label, value] of Object.entries({
    'Your name': 'Jane Smith', 'Email': 'jane@example.invalid',
    'Tell us your idea': 'A mixed-metal gift set for our team.', ...values,
  })) fireEvent.change(screen.getByRole('textbox', { name: label }), { target: { value } })
}
function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Send enquiry' }))
}

describe('Simple custom project enquiry', () => {
  it('shows only three fields and no dropdowns', () => {
    render(<CustomProjectFormSection />)
    expect(screen.getAllByRole('textbox')).toHaveLength(3)
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Company/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Budget/)).not.toBeInTheDocument()
  })

  it('offers follow-up without promising a fixed response time', () => {
    const { container } = render(<CustomProjectFormSection />)
    expect(screen.getByText('We will follow up about your project. No marketing emails.')).toBeInTheDocument()
    expect(container.textContent).not.toMatch(/\b\d+(?:\s*[–-]\s*\d+)?\s*(?:business\s+)?(?:hours?|days?|weeks?)\b/i)
  })

  it('validates all three required fields', async () => {
    render(<CustomProjectFormSection />)
    submit()
    expect(await screen.findByText('Your name is required')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('Tell us a little about your project')).toBeInTheDocument()
    expect(mocks.submit).not.toHaveBeenCalled()
  })

  it('submits without company, quantity, budget, country or deadline', async () => {
    mocks.submit.mockResolvedValue({ success: true })
    render(<CustomProjectFormSection />)
    fill({ 'Your name': ' Jane Smith ', 'Email': ' jane@example.invalid ', 'Tell us your idea': ' Our gift idea ' })
    submit()
    await waitFor(() => expect(mocks.submit).toHaveBeenCalledOnce())
    const { data } = mocks.submit.mock.calls[0][0]
    expect(data).toEqual({
      contactName: 'Jane Smith', email: 'jane@example.invalid', message: 'Our gift idea',
      productInterest: 'Custom project', website: '',
    })
    expect(customProjectInquirySchema.parse(data).companyName).toBe('')
    await waitFor(() => expect(mocks.navigate).toHaveBeenCalledWith({ to: '/thank-you' }))
  })

  it('rejects invalid email and a whitespace-only idea', async () => {
    render(<CustomProjectFormSection />)
    fill({ 'Email': 'not-an-email', 'Tell us your idea': '   ' })
    submit()
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('Tell us a little about your project')).toBeInTheDocument()
    expect(mocks.submit).not.toHaveBeenCalled()
  })

  it('can correct an empty submission and retry', async () => {
    mocks.submit.mockResolvedValue({ success: true })
    render(<CustomProjectFormSection />)
    submit()
    await screen.findByText('Your name is required')
    fill()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Send enquiry' })).toBeEnabled())
    submit()
    await waitFor(() => expect(mocks.submit).toHaveBeenCalledOnce())
  })

  it('preserves the idea and allows retry after a failed request', async () => {
    mocks.submit.mockRejectedValue(new Error('Mock network failure'))
    render(<CustomProjectFormSection />)
    fill()
    submit()
    expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong')
    expect(screen.getByRole('textbox', { name: 'Tell us your idea' })).toHaveValue('A mixed-metal gift set for our team.')
    expect(screen.getByRole('button', { name: 'Send enquiry' })).toBeEnabled()
    expect(mocks.navigate).not.toHaveBeenCalled()
  })
})

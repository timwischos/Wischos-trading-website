import { beforeEach, describe, expect, it, vi } from 'vitest'

// Exercise the real validator and handler, but never connect to a DB or mail service.
const mocks = vi.hoisted(() => ({ save: vi.fn(), send: vi.fn() }))
vi.mock('@tanstack/react-start', () => ({
  createServerFn: () => ({
    inputValidator: (validate: (data: unknown) => unknown) => ({
      handler: (handle: (context: { data: unknown }) => Promise<unknown>) =>
        async ({ data }: { data: unknown }) => handle({ data: validate(data) }),
    }),
  }),
}))
vi.mock('@/server/db', () => ({ db: { insert: () => ({ values: mocks.save }) } }))
vi.mock('resend', () => ({ Resend: class { emails = { send: mocks.send } } }))
import { submitInquiry } from '@/server/submitInquiry'

const brief = {
  contactName: 'Jane Smith', email: 'jane@example.invalid',
  message: 'A mixed-metal gift set.', productInterest: 'Custom project', website: '',
}
beforeEach(() => {
  vi.resetAllMocks()
  mocks.save.mockResolvedValue(undefined)
  mocks.send.mockResolvedValue({ data: { id: 'mock-only' }, error: null })
})

describe('Inquiry submission compatibility', () => {
  it('saves the three-field custom enquiry and uses the contact name in email', async () => {
    await expect(submitInquiry({ data: brief })).resolves.toEqual({ success: true })
    expect(mocks.save).toHaveBeenCalledWith({
      contactName: brief.contactName, email: brief.email, message: brief.message,
      productInterest: brief.productInterest, companyName: '',
    })
    expect(mocks.send).toHaveBeenCalledWith(expect.objectContaining({
      subject: '[Custom] New Inquiry — Jane Smith', html: expect.stringContaining('Jane Smith'),
    }))
  })

  it('still requires a company for ordinary inquiries', async () => {
    await expect(submitInquiry({ data: { ...brief, productInterest: 'Gift sets' } })).rejects.toThrow()
    expect(mocks.save).not.toHaveBeenCalled()
    expect(mocks.send).not.toHaveBeenCalled()
  })

  it('preserves the ordinary inquiry subject and fields', async () => {
    const data = { ...brief, companyName: 'Example Ltd', productInterest: 'Gift sets', quantity: '100' }
    await submitInquiry({ data })
    expect(mocks.save).toHaveBeenCalledWith(expect.objectContaining({ companyName: 'Example Ltd', quantity: '100' }))
    expect(mocks.send).toHaveBeenCalledWith(expect.objectContaining({ subject: 'New Inquiry — Example Ltd' }))
  })

  it('rejects an empty custom idea even if a company is provided', async () => {
    await expect(submitInquiry({ data: { ...brief, message: '  ', companyName: 'Example Ltd' } })).rejects.toThrow()
    expect(mocks.save).not.toHaveBeenCalled()
  })

  it('retains honeypot protection', async () => {
    await expect(submitInquiry({ data: { ...brief, website: 'spam.invalid' } })).resolves.toEqual({ success: true })
    expect(mocks.save).not.toHaveBeenCalled()
    expect(mocks.send).not.toHaveBeenCalled()
  })

  it('does not send email if saving fails', async () => {
    mocks.save.mockRejectedValue(new Error('Mock DB failure'))
    await expect(submitInquiry({ data: brief })).rejects.toThrow('Mock DB failure')
    expect(mocks.send).not.toHaveBeenCalled()
  })
})

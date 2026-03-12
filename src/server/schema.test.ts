import { describe, it, expect } from 'vitest'
import { inquiries } from '@/server/schema'

describe('inquiries schema', () => {
  it('should define the inquiries table', () => {
    expect(inquiries).toBeDefined()
  })
  it.todo('insert shape: required fields contactName, companyName, email')
  it.todo('column names use snake_case (company_name, contact_name)')
})

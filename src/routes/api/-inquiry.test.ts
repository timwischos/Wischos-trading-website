import { describe, it } from 'vitest'

describe('POST /api/inquiry', () => {
  it.todo('returns 200 with { success: true } for valid submission')
  it.todo('returns fake success for honeypot-filled submission')
  it.todo('returns 400 for invalid input (missing required fields)')
  it.todo('does not call Resend if DB insert fails')
})

import { z } from 'zod'

export const inquiryInsertSchema = z.object({
  contactName: z.string().min(1, 'Full name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  productInterest: z.string().optional(),
  destinationCountry: z.string().optional(),
  incoterm: z.string().optional(),
  quantity: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
})

export type InquiryInsert = z.infer<typeof inquiryInsertSchema>

// UI-only buyer type options for InquiryFormSection.
// Captured by prepending to the message field — no DB schema change required.
export const BUYER_TYPE_OPTIONS = [
  { value: 'promotional_distributor', label: 'A promotional products distributor or gifting agency' },
  { value: 'corporate_procurement', label: 'Direct corporate procurement / HR / marketing' },
  { value: 'other', label: 'Other / Not sure yet' },
] as const

export type BuyerType = typeof BUYER_TYPE_OPTIONS[number]['value']

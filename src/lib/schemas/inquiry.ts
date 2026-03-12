import { z } from 'zod'

export const inquiryInsertSchema = z.object({
  contactName: z.string().min(1, 'Full name is required'),
  companyName: z.string().min(1, 'Company name is required'),
  role: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  productInterest: z.string().optional(),
  quantity: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
})

export type InquiryInsert = z.infer<typeof inquiryInsertSchema>

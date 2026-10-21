import { z } from 'zod'
import { inquiryInsertSchema } from './inquiry'

export const CUSTOM_PROJECT_INTEREST = 'Custom project'

export const customProjectBriefSchema = z.object({
  contactName: z.string().trim().min(1, 'Your name is required').max(255),
  email: z.string().trim().email('Please enter a valid email address').max(255),
  message: z.string().trim().min(1, 'Tell us a little about your project'),
  website: z.string(),
})

// Only custom projects may omit a company. Keep an empty string for the existing
// NOT NULL database column rather than inventing a company or changing the DB.
export const customProjectInquirySchema = inquiryInsertSchema.extend({
  ...customProjectBriefSchema.shape,
  companyName: z.string().trim().default(''),
  productInterest: z.literal(CUSTOM_PROJECT_INTEREST),
  website: z.string().optional(),
})

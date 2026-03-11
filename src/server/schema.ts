import { pgTable, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const inquiries = pgTable('inquiries', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  contactName: varchar('contact_name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  productInterest: text('product_interest'),
  quantity: varchar('quantity', { length: 100 }),
  timeline: varchar('timeline', { length: 255 }),
  message: text('message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type Inquiry = typeof inquiries.$inferSelect
export type NewInquiry = typeof inquiries.$inferInsert

import { pgTable, varchar, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core'

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

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  materials: text('materials').array().notNull(),
  heroImage: text('hero_image').notNull(),
  images: text('images').array().notNull(),
  moq: integer('moq').notNull().default(50),
  highlights: text('highlights').array(),
  customizationOptions: text('customization_options').array().notNull(),
  specifications: jsonb('specifications').$type<Array<{ label: string; value: string }>>(),
  faqs: jsonb('faqs').$type<Array<{ q: string; a: string }>>(),
  seoKeywords: text('seo_keywords').array(),
  sortOrder: integer('sort_order').notNull().default(0),
  active: boolean('active').notNull().default(true),
})

export type DbProduct = typeof products.$inferSelect

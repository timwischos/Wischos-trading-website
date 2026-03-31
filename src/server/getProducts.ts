import { createServerFn } from '@tanstack/react-start'
import { eq, and, asc, inArray } from 'drizzle-orm'
import { db } from './db'
import { products } from './schema'

export const getProducts = createServerFn({ method: 'GET' })
  .inputValidator((category: unknown) => (category ?? null) as string | null)
  .handler(async ({ data: category }) => {
    const where = category
      ? and(eq(products.active, true), eq(products.category, category))
      : eq(products.active, true)
    return db.select().from(products).where(where).orderBy(asc(products.sortOrder))
  })

// Fetch a fixed list of products by ID (for homepage featured row)
export const getProductsByIds = createServerFn({ method: 'GET' })
  .inputValidator((ids: unknown) => ids as string[])
  .handler(async ({ data: ids }) => {
    return db.select().from(products).where(
      and(eq(products.active, true), inArray(products.id, ids))
    ).orderBy(asc(products.sortOrder))
  })

export const getProductById = createServerFn({ method: 'GET' })
  .inputValidator((id: unknown) => id as string)
  .handler(async ({ data: id }) => {
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1)
    return rows[0] ?? null
  })

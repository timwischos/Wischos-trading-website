import { createServerFn } from '@tanstack/react-start'
import { eq, asc } from 'drizzle-orm'
import { db } from './db'
import { products } from './schema'

export const getProducts = createServerFn({ method: 'GET' }).handler(async () => {
  return db
    .select()
    .from(products)
    .where(eq(products.active, true))
    .orderBy(asc(products.sortOrder))
})

export const getProductById = createServerFn({ method: 'GET' })
  .inputValidator((id: unknown) => id as string)
  .handler(async ({ data: id }) => {
    const rows = await db.select().from(products).where(eq(products.id, id)).limit(1)
    return rows[0] ?? null
  })

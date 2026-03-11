import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// CRITICAL: prepare: false is mandatory for Supabase Supavisor transaction pool mode.
// Using prepare: true (the default) causes "prepared statement already exists" errors in production.
// CRITICAL: max: 1 limits each serverless function instance to one connection.
// See: https://orm.drizzle.team/docs/get-started/supabase-new
const client = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 })

export const db = drizzle(client, { schema })

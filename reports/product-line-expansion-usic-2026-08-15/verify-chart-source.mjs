import { readFileSync } from 'node:fs'
import { config } from 'dotenv'
import postgres from 'postgres'

config({ path: '.env.local' })

const client = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 })

const sourceFiles = [
  'category-mix.sql',
  'candidate-priority.sql',
  'product-family-roadmap.sql',
  'gift-set-paths.sql',
]

for (const sourceFile of sourceFiles) {
  const query = readFileSync(
    `reports/product-line-expansion-usic-2026-08-15/${sourceFile}`,
    'utf8',
  )
  const rows = await client.unsafe(query)
  console.log(`=== ${sourceFile}`)
  console.log(JSON.stringify(rows, null, 2))
}

await client.end()

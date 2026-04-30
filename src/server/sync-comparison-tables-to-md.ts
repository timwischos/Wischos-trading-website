/**
 * Sync product comparison tables from DB back to the product copy markdown draft.
 * Run with: npx tsx src/server/sync-comparison-tables-to-md.ts
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { config } from 'dotenv'
config({ path: '.env.local' })

import postgres from 'postgres'

const docPath = 'docs/单品文案调整/单品文案修改稿-seo+geo.md'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function tableToMarkdown(table: { columns: string[]; rows: string[][] }) {
  return [
    `| ${table.columns.join(' | ')} |`,
    '|---|---|---|',
    ...table.rows.map((row) => `| ${row.join(' | ')} |`),
  ].join('\n')
}

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })

  try {
    const rows = await sql.unsafe(`
      select coalesce(sku, upper(substring(id from 'wp-[0-9]{3}'))) as sku, comparison_table
      from products
      where active = true
      order by coalesce(sku, upper(substring(id from 'wp-[0-9]{3}')))
    `)

    let markdown = readFileSync(docPath, 'utf8')
    const missing: string[] = []

    for (const row of rows) {
      const sku = row.sku as string
      const replacement = tableToMarkdown(row.comparison_table)
      const pattern = new RegExp(
        `(## ${escapeRegExp(sku)}[^\\n]*\\n[\\s\\S]*?### comparisonTable\\n\\n\`\`\`text\\n)([\\s\\S]*?)(\\n\`\`\`)`,
      )

      const next = markdown.replace(pattern, `$1${replacement}$3`)
      if (next === markdown) missing.push(sku)
      markdown = next
    }

    writeFileSync(docPath, markdown)
    console.log(`Updated ${rows.length - missing.length} comparison tables in ${docPath}.`)
    if (missing.length) {
      console.log(`Missing sections: ${missing.join(', ')}`)
    }
  } finally {
    await sql.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

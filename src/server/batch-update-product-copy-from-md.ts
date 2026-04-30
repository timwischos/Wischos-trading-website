/**
 * Batch update product copy from docs/单品文案调整/单品文案修改稿-seo+geo.md.
 *
 * Dry run:
 *   npx tsx src/server/batch-update-product-copy-from-md.ts --dry-run
 *
 * Update existing products:
 *   npx tsx src/server/batch-update-product-copy-from-md.ts
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { products, type DbProduct } from './schema'

type ComparisonTable = {
  columns: [string, string, string]
  rows: [string, string, string][]
}

type ProductCopy = {
  sku: string
  name: string
  metaDescription: string
  quickAnswer: string
  tagline: string
  description: string
  highlights: string[]
  materials: string[]
  specifications: { label: string; value: string }[]
  customizationOptions: string[]
  comparisonTable: ComparisonTable
  faqs: { q: string; a: string }[]
  sourcingNotes: { title: string; body: string }[]
  keyInsight: string
  seoKeywords: string[]
}

const docPath = join(process.cwd(), 'docs/单品文案调整/单品文案修改稿-seo+geo.md')
const dryRun = process.argv.includes('--dry-run')

function codeBlock(section: string, field: string): string {
  const pattern = new RegExp(`### ${field}\\s+\\\`\\\`\\\`text\\n([\\s\\S]*?)\\n\\\`\\\`\\\``, 'm')
  const match = section.match(pattern)
  if (!match) throw new Error(`Missing field "${field}"`)
  return match[1].trim()
}

function bulletList(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function specifications(text: string): { label: string; value: string }[] {
  return bulletList(text).map((item) => {
    const index = item.indexOf(':')
    if (index === -1) return { label: item, value: '' }
    return {
      label: item.slice(0, index).trim(),
      value: item.slice(index + 1).trim(),
    }
  })
}

function comparisonTable(text: string): ComparisonTable {
  const rows = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !/^\|\s*-/.test(line))
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim()) as [string, string, string],
    )

  const [columns, ...bodyRows] = rows
  if (!columns || columns.length !== 3 || bodyRows.some((row) => row.length !== 3)) {
    throw new Error('Invalid comparison table')
  }

  return { columns, rows: bodyRows }
}

function faqs(text: string): { q: string; a: string }[] {
  const result: { q: string; a: string }[] = []
  let currentQuestion = ''
  let currentAnswer: string[] = []

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    if (line.startsWith('Q: ')) {
      if (currentQuestion) {
        result.push({ q: currentQuestion, a: currentAnswer.join(' ').trim() })
      }
      currentQuestion = line.slice(3).trim()
      currentAnswer = []
      continue
    }

    if (line.startsWith('A: ')) {
      currentAnswer.push(line.slice(3).trim())
      continue
    }

    if (currentAnswer.length > 0) {
      currentAnswer.push(line)
    }
  }

  if (currentQuestion) {
    result.push({ q: currentQuestion, a: currentAnswer.join(' ').trim() })
  }

  return result
}

function sourcingNotes(text: string): { title: string; body: string }[] {
  const result: { title: string; body: string[] }[] = []

  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim()
    if (!line) continue

    const titleMatch = line.match(/^\d+\.\s+(.+)$/)
    if (titleMatch) {
      result.push({ title: titleMatch[1].trim(), body: [] })
      continue
    }

    const current = result[result.length - 1]
    if (current) current.body.push(line)
  }

  return result.map((note) => ({ title: note.title, body: note.body.join('\n\n').trim() }))
}

function parseProducts(markdown: string): ProductCopy[] {
  const headingPattern = /^## (WP-\d{3}) .+$/gm
  const headings = [...markdown.matchAll(headingPattern)]

  return headings.map((heading, index) => {
    const sku = heading[1]
    const start = heading.index ?? 0
    const end = headings[index + 1]?.index ?? markdown.length
    const section = markdown.slice(start, end)

    try {
      return {
        sku,
        name: codeBlock(section, 'name'),
        metaDescription: codeBlock(section, 'metaDescription'),
        quickAnswer: codeBlock(section, 'quickAnswer'),
        tagline: codeBlock(section, 'tagline'),
        description: codeBlock(section, 'description'),
        highlights: bulletList(codeBlock(section, 'highlights')),
        materials: bulletList(codeBlock(section, 'materials')),
        specifications: specifications(codeBlock(section, 'specifications')),
        customizationOptions: bulletList(codeBlock(section, 'customizationOptions')),
        comparisonTable: comparisonTable(codeBlock(section, 'comparisonTable')),
        faqs: faqs(codeBlock(section, 'faqs')),
        sourcingNotes: sourcingNotes(codeBlock(section, 'sourcingNotes')),
        keyInsight: codeBlock(section, 'keyInsight'),
        seoKeywords: bulletList(codeBlock(section, 'seoKeywords')),
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`${sku}: ${message}`)
    }
  })
}

function productIdForSku(dbProducts: DbProduct[], sku: string): string | undefined {
  const directSkuMatch = dbProducts.find((product) => product.sku === sku)
  if (directSkuMatch) return directSkuMatch.id

  const prefix = sku.toLowerCase()
  return dbProducts.find((product) => product.id.toLowerCase().startsWith(prefix))?.id
}

async function main() {
  const sql = postgres(process.env.DATABASE_URL!, { prepare: false, max: 1 })
  const db = drizzle(sql)

  try {
    const markdown = readFileSync(docPath, 'utf8')
    const parsedProducts = parseProducts(markdown)
    const dbProducts = await db.select().from(products)

    let updated = 0
    const skipped: string[] = []

    for (const copy of parsedProducts) {
      const id = productIdForSku(dbProducts, copy.sku)
      if (!id) {
        skipped.push(copy.sku)
        continue
      }

      console.log(`${dryRun ? 'Would update' : 'Updating'} ${copy.sku} -> ${id}`)

      if (!dryRun) {
        await db.update(products).set({
          name: copy.name,
          tagline: copy.tagline,
          description: copy.description,
          highlights: copy.highlights,
          materials: copy.materials,
          specifications: copy.specifications,
          customizationOptions: copy.customizationOptions,
          faqs: copy.faqs,
          sourcingNotes: copy.sourcingNotes,
          seoKeywords: copy.seoKeywords,
          quickAnswer: copy.quickAnswer,
          metaDescription: copy.metaDescription,
          comparisonTable: copy.comparisonTable,
          keyInsight: copy.keyInsight,
        }).where(eq(products.id, id))
      }

      updated++
    }

    console.log(`\n${dryRun ? 'Dry run complete' : 'Update complete'}. Matched: ${updated}. Skipped: ${skipped.length ? skipped.join(', ') : 'none'}.`)
  } finally {
    await sql.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

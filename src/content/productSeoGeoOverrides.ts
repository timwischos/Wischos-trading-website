import type { DbProduct } from '@/server/schema'

export type ProductComparisonTable = {
  columns: [string, string, string]
  rows: [string, string, string][]
}

export type ProductSeoGeoFields = {
  metaDescription?: string
  quickAnswer?: string
  comparisonTable?: ProductComparisonTable
  keyInsight?: string
}

export type ProductWithSeoGeo = DbProduct & ProductSeoGeoFields

export function applyProductSeoGeoOverride(product: DbProduct): ProductWithSeoGeo {
  return product
}

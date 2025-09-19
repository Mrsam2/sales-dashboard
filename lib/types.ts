export interface SalesData {
  id: string
  year: number
  month: string
  monthNumber: number
  revenue: number
  units: number
  category: string
  region: string
  product: string
}

export interface ChartData {
  name: string
  value: number
  revenue?: number
  units?: number
  fill?: string
}

export interface FilterOptions {
  year: number[]
  category: string[]
  region: string[]
  product: string[]
}

export type ChartType = "bar" | "line" | "pie"

export interface DashboardFilters {
  selectedYears: number[]
  selectedCategories: string[]
  selectedRegions: string[]
  selectedProducts: string[]
  salesThreshold: number
  chartType: ChartType
}

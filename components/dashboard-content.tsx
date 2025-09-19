"use client"

import { useMemo } from "react"
import { ChartContainer } from "./charts/chart-container"
import { MetricsCards } from "./charts/metrics-cards"
import { AdvancedFilters } from "./advanced-filters"
import { mockSalesData, getYearlyTotals, getMonthlyTotals, getCategoryTotals } from "@/lib/mock-data"
import type { DashboardFilters } from "@/lib/types"

interface DashboardContentProps {
  filters: DashboardFilters
  onFiltersChange: (filters: DashboardFilters) => void
}

export function DashboardContent({ filters, onFiltersChange }: DashboardContentProps) {
  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return mockSalesData.filter((item) => {
      // Year filter
      if (filters.selectedYears.length > 0 && !filters.selectedYears.includes(item.year)) {
        return false
      }

      // Category filter
      if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(item.category)) {
        return false
      }

      // Region filter
      if (filters.selectedRegions.length > 0 && !filters.selectedRegions.includes(item.region)) {
        return false
      }

      // Product filter
      if (filters.selectedProducts.length > 0 && !filters.selectedProducts.includes(item.product)) {
        return false
      }

      // Sales threshold filter
      if (filters.salesThreshold > 0 && item.revenue < filters.salesThreshold) {
        return false
      }

      return true
    })
  }, [filters])

  // Generate chart data
  const yearlyData = useMemo(() => getYearlyTotals(filteredData), [filteredData])
  const monthlyData = useMemo(() => getMonthlyTotals(filteredData), [filteredData])
  const categoryData = useMemo(() => getCategoryTotals(filteredData), [filteredData])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Sales Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive sales performance overview from 2022-2024 with interactive filtering and visualization
        </p>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters filters={filters} onFiltersChange={onFiltersChange} />

      {/* Metrics Cards */}
      <MetricsCards data={filteredData} />

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartContainer
          data={yearlyData}
          title="Revenue by Year"
          defaultChartType={filters.chartType}
          className="lg:col-span-1"
        />
        <ChartContainer
          data={categoryData}
          title="Revenue by Category"
          defaultChartType="pie"
          className="lg:col-span-1"
        />
      </div>

      <ChartContainer data={monthlyData} title="Monthly Sales Trend" defaultChartType="line" className="w-full" />

      {/* Data Summary */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Data Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Records:</span>
            <span className="ml-2 font-medium">{filteredData.length.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Years:</span>
            <span className="ml-2 font-medium">{filters.selectedYears.join(", ")}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Categories:</span>
            <span className="ml-2 font-medium">
              {filters.selectedCategories.length > 0 ? filters.selectedCategories.length : "All"}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Regions:</span>
            <span className="ml-2 font-medium">
              {filters.selectedRegions.length > 0 ? filters.selectedRegions.length : "All"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

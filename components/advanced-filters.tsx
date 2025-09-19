"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Filter, Download, RefreshCw } from "lucide-react"
import { mockSalesData } from "@/lib/mock-data"
import type { DashboardFilters, ChartType } from "@/lib/types"

interface AdvancedFiltersProps {
  filters: DashboardFilters
  onFiltersChange: (filters: DashboardFilters) => void
  className?: string
}

export function AdvancedFilters({ filters, onFiltersChange, className }: AdvancedFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Calculate min/max values for sliders
  const allRevenues = mockSalesData.map((item) => item.revenue)
  const minRevenue = Math.min(...allRevenues)
  const maxRevenue = Math.max(...allRevenues)

  const handleChartTypeChange = (chartType: ChartType) => {
    onFiltersChange({ ...filters, chartType })
  }

  const handleRevenueRangeChange = (values: number[]) => {
    onFiltersChange({ ...filters, salesThreshold: values[0] })
  }

  const exportData = () => {
    // Filter data based on current filters
    const filteredData = mockSalesData.filter((item) => {
      if (filters.selectedYears.length > 0 && !filters.selectedYears.includes(item.year)) return false
      if (filters.selectedCategories.length > 0 && !filters.selectedCategories.includes(item.category)) return false
      if (filters.selectedRegions.length > 0 && !filters.selectedRegions.includes(item.region)) return false
      if (filters.salesThreshold > 0 && item.revenue < filters.salesThreshold) return false
      return true
    })

    // Convert to CSV
    const headers = ["Year", "Month", "Category", "Region", "Product", "Revenue", "Units"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((item) =>
        [item.year, item.month, item.category, item.region, item.product, item.revenue, item.units].join(","),
      ),
    ].join("\n")

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `sales-data-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const resetFilters = () => {
    onFiltersChange({
      selectedYears: [2022, 2023, 2024],
      selectedCategories: [],
      selectedRegions: [],
      selectedProducts: [],
      salesThreshold: 0,
      chartType: "bar",
    })
  }

  const activeFiltersCount =
    (filters.selectedCategories.length > 0 ? 1 : 0) +
    (filters.selectedRegions.length > 0 ? 1 : 0) +
    (filters.selectedProducts.length > 0 ? 1 : 0) +
    (filters.salesThreshold > 0 ? 1 : 0) +
    (filters.selectedYears.length < 3 ? 1 : 0)

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
            <Label htmlFor="advanced-toggle" className="text-sm">
              Advanced
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chart Type Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Default Chart Type</Label>
          <div className="flex gap-2">
            {(["bar", "line", "pie"] as ChartType[]).map((type) => (
              <Button
                key={type}
                variant={filters.chartType === type ? "default" : "outline"}
                size="sm"
                onClick={() => handleChartTypeChange(type)}
                className="capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Revenue Range Slider */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Minimum Revenue: ${filters.salesThreshold.toLocaleString()}</Label>
          <Slider
            value={[filters.salesThreshold]}
            onValueChange={handleRevenueRangeChange}
            max={maxRevenue}
            min={minRevenue}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${minRevenue.toLocaleString()}</span>
            <span>${maxRevenue.toLocaleString()}</span>
          </div>
        </div>

        {showAdvanced && (
          <>
            {/* Quick Filters */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Quick Filters</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      selectedYears: [2024],
                      selectedCategories: [],
                      selectedRegions: [],
                    })
                  }
                >
                  Current Year Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      selectedCategories: ["Electronics"],
                      selectedRegions: [],
                    })
                  }
                >
                  Electronics Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      salesThreshold: 100000,
                    })
                  }
                >
                  High Revenue (&gt;$100K)
                </Button>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Active Filters</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.selectedYears.length < 3 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Years: {filters.selectedYears.join(", ")}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => onFiltersChange({ ...filters, selectedYears: [2022, 2023, 2024] })}
                      />
                    </Badge>
                  )}
                  {filters.selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          onFiltersChange({
                            ...filters,
                            selectedCategories: filters.selectedCategories.filter((c) => c !== category),
                          })
                        }
                      />
                    </Badge>
                  ))}
                  {filters.selectedRegions.map((region) => (
                    <Badge key={region} variant="secondary" className="flex items-center gap-1">
                      {region}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() =>
                          onFiltersChange({
                            ...filters,
                            selectedRegions: filters.selectedRegions.filter((r) => r !== region),
                          })
                        }
                      />
                    </Badge>
                  ))}
                  {filters.salesThreshold > 0 && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Min Revenue: ${filters.salesThreshold.toLocaleString()}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => onFiltersChange({ ...filters, salesThreshold: 0 })}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button onClick={resetFilters} variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Reset All
          </Button>
          <Button onClick={exportData} variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

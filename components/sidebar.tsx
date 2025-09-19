"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Filter, Settings, TrendingUp } from "lucide-react"
import { mockSalesData } from "@/lib/mock-data"
import type { DashboardFilters } from "@/lib/types"

interface SidebarProps {
  filters: DashboardFilters
  onFiltersChange: (filters: DashboardFilters) => void
}

export function Sidebar({ filters, onFiltersChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Get unique values for filter options
  const uniqueCategories = Array.from(new Set(mockSalesData.map((item) => item.category)))
  const uniqueRegions = Array.from(new Set(mockSalesData.map((item) => item.region)))
  const uniqueProducts = Array.from(new Set(mockSalesData.map((item) => item.product)))
  const availableYears = [2022, 2023, 2024]

  const handleYearChange = (year: number, checked: boolean) => {
    const newYears = checked ? [...filters.selectedYears, year] : filters.selectedYears.filter((y) => y !== year)
    onFiltersChange({ ...filters, selectedYears: newYears })
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.selectedCategories, category]
      : filters.selectedCategories.filter((c) => c !== category)
    onFiltersChange({ ...filters, selectedCategories: newCategories })
  }

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...filters.selectedRegions, region]
      : filters.selectedRegions.filter((r) => r !== region)
    onFiltersChange({ ...filters, selectedRegions: newRegions })
  }

  const handleThresholdChange = (value: string) => {
    onFiltersChange({ ...filters, salesThreshold: Number(value) || 0 })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      selectedYears: [2022, 2023, 2024],
      selectedCategories: [],
      selectedRegions: [],
      selectedProducts: [],
      salesThreshold: 0,
      chartType: filters.chartType,
    })
  }

  if (isCollapsed) {
    return (
      <div className="w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Filter className="h-5 w-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-sidebar-primary" />
            <h1 className="text-xl font-bold text-sidebar-foreground">Sales Dashboard</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(true)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-6">
            {/* Year Filter */}
            <Card className="bg-sidebar-accent border-sidebar-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-sidebar-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Years
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {availableYears.map((year) => (
                  <div key={year} className="flex items-center space-x-2">
                    <Checkbox
                      id={`year-${year}`}
                      checked={filters.selectedYears.includes(year)}
                      onCheckedChange={(checked) => handleYearChange(year, checked as boolean)}
                    />
                    <Label htmlFor={`year-${year}`} className="text-sm text-sidebar-foreground">
                      {year}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sales Threshold */}
            <Card className="bg-sidebar-accent border-sidebar-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-sidebar-foreground">Sales Threshold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="threshold" className="text-xs text-sidebar-foreground">
                    Minimum Revenue ($)
                  </Label>
                  <Input
                    id="threshold"
                    type="number"
                    placeholder="0"
                    value={filters.salesThreshold || ""}
                    onChange={(e) => handleThresholdChange(e.target.value)}
                    className="bg-sidebar border-sidebar-border text-sidebar-foreground"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card className="bg-sidebar-accent border-sidebar-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-sidebar-foreground">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {uniqueCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm text-sidebar-foreground">
                      {category}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Region Filter */}
            <Card className="bg-sidebar-accent border-sidebar-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-sidebar-foreground">Regions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {uniqueRegions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={`region-${region}`}
                      checked={filters.selectedRegions.includes(region)}
                      onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
                    />
                    <Label htmlFor={`region-${region}`} className="text-sm text-sidebar-foreground">
                      {region}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Separator className="bg-sidebar-border" />

            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="w-full bg-sidebar border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            >
              Clear All Filters
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

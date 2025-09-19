"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardContent } from "./dashboard-content"
import type { DashboardFilters } from "@/lib/types"

export function DashboardLayout() {
  const [filters, setFilters] = useState<DashboardFilters>({
    selectedYears: [2022, 2023, 2024],
    selectedCategories: [],
    selectedRegions: [],
    selectedProducts: [],
    salesThreshold: 0,
    chartType: "bar",
  })

  return (
    <div className="flex h-screen bg-background">
      <Sidebar filters={filters} onFiltersChange={setFilters} />
      <main className="flex-1 overflow-auto">
        <DashboardContent filters={filters} onFiltersChange={setFilters} />
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SalesBarChart } from "./bar-chart"
import { SalesLineChart } from "./line-chart"
import { SalesPieChart } from "./pie-chart"
import type { ChartData, ChartType } from "@/lib/types"

interface ChartContainerProps {
  data: ChartData[]
  title: string
  defaultChartType?: ChartType
  className?: string
}

export function ChartContainer({ data, title, defaultChartType = "bar", className }: ChartContainerProps) {
  const [chartType, setChartType] = useState<ChartType>(defaultChartType)

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <SalesBarChart data={data} title="" />
      case "line":
        return <SalesLineChart data={data} title="" />
      case "pie":
        return <SalesPieChart data={data} title="" />
      default:
        return <SalesBarChart data={data} title="" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <div className="flex gap-2">
          <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
            Bar
          </Button>
          <Button variant={chartType === "line" ? "default" : "outline"} size="sm" onClick={() => setChartType("line")}>
            Line
          </Button>
          <Button variant={chartType === "pie" ? "default" : "outline"} size="sm" onClick={() => setChartType("pie")}>
            Pie
          </Button>
        </div>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  )
}

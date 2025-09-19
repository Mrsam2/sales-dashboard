"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package } from "lucide-react"
import type { SalesData } from "@/lib/types"

interface MetricsCardsProps {
  data: SalesData[]
  className?: string
}

export function MetricsCards({ data, className }: MetricsCardsProps) {
  // Calculate key metrics
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)
  const totalUnits = data.reduce((sum, item) => sum + item.units, 0)

  // Calculate year-over-year growth
  const currentYearData = data.filter((item) => item.year === 2024)
  const previousYearData = data.filter((item) => item.year === 2023)

  const currentYearRevenue = currentYearData.reduce((sum, item) => sum + item.revenue, 0)
  const previousYearRevenue = previousYearData.reduce((sum, item) => sum + item.revenue, 0)

  const revenueGrowth = previousYearRevenue
    ? ((currentYearRevenue - previousYearRevenue) / previousYearRevenue) * 100
    : 0

  const currentYearUnits = currentYearData.reduce((sum, item) => sum + item.units, 0)
  const previousYearUnits = previousYearData.reduce((sum, item) => sum + item.units, 0)

  const unitsGrowth = previousYearUnits ? ((currentYearUnits - previousYearUnits) / previousYearUnits) * 100 : 0

  const avgOrderValue = totalUnits > 0 ? totalRevenue / totalUnits : 0

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      change: `${revenueGrowth > 0 ? "+" : ""}${revenueGrowth.toFixed(1)}%`,
      trend: revenueGrowth >= 0 ? "up" : "down",
      icon: DollarSign,
    },
    {
      title: "Units Sold",
      value: totalUnits.toLocaleString(),
      change: `${unitsGrowth > 0 ? "+" : ""}${unitsGrowth.toFixed(1)}%`,
      trend: unitsGrowth >= 0 ? "up" : "down",
      icon: Package,
    },
    {
      title: "Average Order Value",
      value: `$${avgOrderValue.toFixed(2)}`,
      change: "vs last year",
      trend: "neutral",
      icon: TrendingUp,
    },
    {
      title: "Active Categories",
      value: new Set(data.map((item) => item.category)).size.toString(),
      change: "product lines",
      trend: "neutral",
      icon: Package,
    },
  ]

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : metric.trend === "down" ? TrendingDown : null

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {TrendIcon && (
                  <TrendIcon
                    className={`mr-1 h-3 w-3 ${
                      metric.trend === "up" ? "text-green-500" : metric.trend === "down" ? "text-red-500" : ""
                    }`}
                  />
                )}
                <span
                  className={
                    metric.trend === "up"
                      ? "text-green-500"
                      : metric.trend === "down"
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }
                >
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

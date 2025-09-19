"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { ChartData } from "@/lib/types"

interface SalesPieChartProps {
  data: ChartData[]
  title: string
  className?: string
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function SalesPieChart({ data, title, className }: SalesPieChartProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-card p-3 shadow-md">
                    <p className="font-medium text-card-foreground">{payload[0].name}</p>
                    <p className="text-sm text-muted-foreground">Revenue: ${payload[0].value?.toLocaleString()}</p>
                    {payload[0].payload.units && (
                      <p className="text-sm text-muted-foreground">
                        Units: {payload[0].payload.units.toLocaleString()}
                      </p>
                    )}
                  </div>
                )
              }
              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

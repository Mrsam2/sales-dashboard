"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { ChartData } from "@/lib/types"

interface SalesBarChartProps {
  data: ChartData[]
  title: string
  dataKey?: string
  className?: string
}

export function SalesBarChart({ data, title, dataKey = "value", className }: SalesBarChartProps) {
  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4 text-foreground">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-card p-3 shadow-md">
                    <p className="font-medium text-card-foreground">{label}</p>
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
          <Bar dataKey={dataKey} fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

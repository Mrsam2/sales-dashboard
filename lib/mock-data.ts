import type { SalesData } from "./types"

const categories = ["Electronics", "Clothing", "Home & Garden", "Sports", "Books"]
const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"]
const products = [
  "Smartphone Pro",
  "Laptop Ultra",
  "Wireless Headphones",
  "Smart Watch",
  "Designer Jacket",
  "Running Shoes",
  "Casual Shirt",
  "Winter Coat",
  "Garden Tools",
  "Kitchen Set",
  "Furniture Collection",
  "Lighting",
  "Fitness Equipment",
  "Sports Apparel",
  "Outdoor Gear",
  "Team Jerseys",
  "Technical Books",
  "Fiction Novels",
  "Educational Materials",
  "Digital Guides",
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Generate realistic sales data with seasonal patterns
function generateSalesData(): SalesData[] {
  const data: SalesData[] = []
  let id = 1

  for (let year = 2022; year <= 2024; year++) {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const month = months[monthIndex]

      // Create seasonal multipliers (higher sales in Q4, lower in Q1)
      const seasonalMultiplier = monthIndex >= 9 ? 1.4 : monthIndex <= 2 ? 0.8 : 1.0

      // Year-over-year growth
      const yearMultiplier = year === 2022 ? 1.0 : year === 2023 ? 1.15 : 1.25

      categories.forEach((category) => {
        regions.forEach((region) => {
          // Generate 2-4 products per category/region combination
          const numProducts = Math.floor(Math.random() * 3) + 2
          const shuffledProducts = products
            .filter((p) => {
              // Match products to categories roughly
              if (category === "Electronics")
                return p.includes("Smartphone") || p.includes("Laptop") || p.includes("Wireless") || p.includes("Smart")
              if (category === "Clothing")
                return p.includes("Jacket") || p.includes("Shoes") || p.includes("Shirt") || p.includes("Coat")
              if (category === "Home & Garden")
                return (
                  p.includes("Garden") || p.includes("Kitchen") || p.includes("Furniture") || p.includes("Lighting")
                )
              if (category === "Sports")
                return p.includes("Fitness") || p.includes("Sports") || p.includes("Outdoor") || p.includes("Team")
              if (category === "Books")
                return p.includes("Books") || p.includes("Novels") || p.includes("Educational") || p.includes("Digital")
              return false
            })
            .sort(() => 0.5 - Math.random())
            .slice(0, numProducts)

          shuffledProducts.forEach((product) => {
            // Base revenue with realistic ranges per category
            let baseRevenue = 50000
            if (category === "Electronics") baseRevenue = 120000
            if (category === "Clothing") baseRevenue = 80000
            if (category === "Home & Garden") baseRevenue = 90000
            if (category === "Sports") baseRevenue = 70000
            if (category === "Books") baseRevenue = 40000

            // Add randomness and apply multipliers
            const revenue = Math.floor(baseRevenue * (0.7 + Math.random() * 0.6) * seasonalMultiplier * yearMultiplier)

            // Units sold based on revenue and average price
            const avgPrice =
              category === "Electronics"
                ? 800
                : category === "Clothing"
                  ? 120
                  : category === "Home & Garden"
                    ? 200
                    : category === "Sports"
                      ? 150
                      : 25

            const units = Math.floor(revenue / avgPrice)

            data.push({
              id: id.toString(),
              year,
              month,
              monthNumber: monthIndex + 1,
              revenue,
              units,
              category,
              region,
              product,
            })
            id++
          })
        })
      })
    }
  }

  return data
}

export const mockSalesData = generateSalesData()

// Helper functions for data aggregation
export function getYearlyTotals(data: SalesData[]) {
  const yearlyTotals = data.reduce(
    (acc, item) => {
      if (!acc[item.year]) {
        acc[item.year] = { revenue: 0, units: 0 }
      }
      acc[item.year].revenue += item.revenue
      acc[item.year].units += item.units
      return acc
    },
    {} as Record<number, { revenue: number; units: number }>,
  )

  return Object.entries(yearlyTotals).map(([year, totals]) => ({
    name: year,
    revenue: totals.revenue,
    units: totals.units,
    value: totals.revenue,
  }))
}

export function getMonthlyTotals(data: SalesData[], year?: number) {
  const filteredData = year ? data.filter((item) => item.year === year) : data

  const monthlyTotals = filteredData.reduce(
    (acc, item) => {
      const key = `${item.month} ${year ? "" : item.year}`
      if (!acc[key]) {
        acc[key] = { revenue: 0, units: 0, monthNumber: item.monthNumber }
      }
      acc[key].revenue += item.revenue
      acc[key].units += item.units
      return acc
    },
    {} as Record<string, { revenue: number; units: number; monthNumber: number }>,
  )

  return Object.entries(monthlyTotals)
    .map(([month, totals]) => ({
      name: month,
      revenue: totals.revenue,
      units: totals.units,
      value: totals.revenue,
      monthNumber: totals.monthNumber,
    }))
    .sort((a, b) => a.monthNumber - b.monthNumber)
}

export function getCategoryTotals(data: SalesData[]) {
  const categoryTotals = data.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { revenue: 0, units: 0 }
      }
      acc[item.category].revenue += item.revenue
      acc[item.category].units += item.units
      return acc
    },
    {} as Record<string, { revenue: number; units: number }>,
  )

  return Object.entries(categoryTotals).map(([category, totals]) => ({
    name: category,
    revenue: totals.revenue,
    units: totals.units,
    value: totals.revenue,
  }))
}

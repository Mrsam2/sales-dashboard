import type { Metadata } from "next"
import { DashboardLayout } from "@/components/dashboard-layout"

export const metadata: Metadata = {
  title: "Sales Dashboard - Home",
  description: "Interactive sales analytics dashboard showing performance metrics from 2022-2024",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardLayout />
    </div>
  )
}

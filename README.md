# Sales Dashboard - Interactive Analytics Application

A comprehensive sales analytics dashboard built with Next.js 15, TypeScript, and Tailwind CSS. This application provides interactive data visualization for sales performance from 2022-2024 with advanced filtering capabilities and multiple chart types.

![Sales Dashboard](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center)

## Features

### 📊 Interactive Charts
- **Bar Charts**: Display revenue and units sold with hover tooltips
- **Line Charts**: Show sales trends over time with smooth animations
- **Pie Charts**: Visualize category distribution with percentage labels
- **Chart Type Switching**: Toggle between chart types for different perspectives

### 🎛️ Advanced Filtering
- **Year Selection**: Filter data by specific years (2022-2024)
- **Category Filtering**: Filter by product categories (Electronics, Clothing, etc.)
- **Region Filtering**: Filter by geographical regions
- **Revenue Threshold**: Set minimum revenue filters with slider controls
- **Quick Filters**: Pre-configured filter combinations
- **Active Filter Display**: Visual badges showing applied filters

### 📈 Key Metrics
- **Total Revenue**: Aggregated sales revenue with year-over-year growth
- **Units Sold**: Total units with growth indicators
- **Average Order Value**: Calculated AOV metrics
- **Active Categories**: Number of product lines

### 🎨 Professional Design
- **Modern UI**: Clean, professional interface with semantic design tokens
- **Dark/Light Mode**: Automatic theme switching support
- **Responsive Layout**: Mobile-first design that works on all devices
- **Collapsible Sidebar**: Space-efficient navigation with filter controls

### 📤 Data Export
- **CSV Export**: Download filtered data as CSV files
- **Real-time Filtering**: Instant data updates based on filter selections

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Charts**: Recharts for interactive data visualization
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **Fonts**: Geist Sans and Geist Mono

## Project Structure

\`\`\`
sales-dashboard/
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout with fonts and analytics
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── charts/
│   │   ├── bar-chart.tsx    # Bar chart component
│   │   ├── line-chart.tsx   # Line chart component
│   │   ├── pie-chart.tsx    # Pie chart component
│   │   ├── chart-container.tsx # Chart wrapper with type switching
│   │   └── metrics-cards.tsx   # KPI metrics display
│   ├── ui/                  # shadcn/ui components
│   ├── advanced-filters.tsx # Advanced filtering controls
│   ├── dashboard-content.tsx # Main dashboard content
│   ├── dashboard-layout.tsx # Layout wrapper
│   └── sidebar.tsx          # Navigation sidebar
├── lib/
│   ├── mock-data.ts         # Generated sales data and utilities
│   ├── types.ts             # TypeScript type definitions
│   └── utils.ts             # Utility functions
└── README.md
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd sales-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the dashboard.

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Data Structure

The application uses mock sales data with the following structure:

\`\`\`typescript
interface SalesData {
  id: string
  year: number          // 2022, 2023, 2024
  month: string         // "January", "February", etc.
  monthNumber: number   // 1-12
  revenue: number       // Sales revenue in USD
  units: number         // Units sold
  category: string      // Product category
  region: string        // Geographic region
  product: string       // Product name
}
\`\`\`

### Data Generation

The mock data includes:
- **3 years** of sales data (2022-2024)
- **5 product categories**: Electronics, Clothing, Home & Garden, Sports, Books
- **5 regions**: North America, Europe, Asia Pacific, Latin America, Middle East
- **20+ products** across all categories
- **Seasonal patterns**: Higher sales in Q4, lower in Q1
- **Year-over-year growth**: 15% growth in 2023, 25% in 2024

## Customization

### Adding New Chart Types

1. Create a new chart component in `components/charts/`
2. Add the chart type to the `ChartType` union in `lib/types.ts`
3. Update the `ChartContainer` component to include the new type

### Modifying Filters

1. Update the `DashboardFilters` interface in `lib/types.ts`
2. Add new filter controls in `components/sidebar.tsx`
3. Update the filtering logic in `components/dashboard-content.tsx`

### Styling Customization

The application uses semantic design tokens defined in `app/globals.css`. Key customization points:

- **Colors**: Update CSS custom properties in `:root` and `.dark` selectors
- **Typography**: Modify font imports in `app/layout.tsx`
- **Spacing**: Adjust Tailwind spacing classes throughout components

## API Integration

To replace mock data with real API data:

1. **Create API routes** in `app/api/` directory
2. **Update data fetching** in dashboard components
3. **Add loading states** and error handling
4. **Implement data caching** with SWR or React Query

Example API integration:

\`\`\`typescript
// app/api/sales/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get('year')
  
  // Fetch from your database
  const data = await fetchSalesData({ year })
  
  return Response.json(data)
}
\`\`\`

## Performance Optimizations

- **Memoized calculations**: Chart data is memoized to prevent unnecessary recalculations
- **Efficient filtering**: Client-side filtering with optimized algorithms
- **Code splitting**: Components are loaded on-demand
- **Image optimization**: Next.js automatic image optimization

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## Acknowledgments

- **Recharts** for excellent charting capabilities
- **shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for utility-first styling
- **Lucide** for consistent iconography
- **Vercel** for seamless deployment platform

## Future Enhancements

- [ ] Real-time data updates with WebSocket connections
- [ ] Advanced analytics with predictive modeling
- [ ] User authentication and role-based access
- [ ] Custom dashboard builder with drag-and-drop
- [ ] Mobile app with React Native
- [ ] Integration with popular CRM systems
- [ ] Advanced export options (PDF, Excel)
- [ ] Automated report scheduling
\`\`\`

```json file="" isHidden

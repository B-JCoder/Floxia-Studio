'use client'

import * as React from "react"
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function AnalyticsClient({ data }: { data: any }) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-4xl">${data.stats.totalRevenue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
            <CardTitle className="text-4xl">{data.stats.conversionRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +3.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Project Value</CardDescription>
            <CardTitle className="text-4xl">${data.stats.avgProjectValue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              -2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue growth for the current year.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <span className="text-[10px] uppercase text-muted-foreground">Month</span>
                            <span className="text-[10px] uppercase text-muted-foreground">Revenue</span>
                            <span className="font-bold text-sm">{payload[0].payload.month}</span>
                            <span className="font-bold text-sm">${payload[0].value}</span>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Where your leads are coming from.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.leadSources}
                  dataKey="count"
                  nameKey="source"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {data.leadSources.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary) / ${1 - index * 0.15})`} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                          <span className="font-bold">{payload[0].name}:</span> {payload[0].value} leads
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="px-6 pb-6 grid grid-cols-2 gap-2 text-[10px]">
            {data.leadSources.map((s: any, i: number) => (
              <div key={s.source} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(var(--primary) / ${1 - i * 0.15})` }} />
                <span className="text-muted-foreground">{s.source}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

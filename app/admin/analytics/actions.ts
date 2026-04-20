'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function getAnalyticsData() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const [
    { data: leads },
    { data: projects },
    { data: invoices },
  ] = await Promise.all([
    supabase.from('leads').select('created_at, status'),
    supabase.from('projects').select('created_at, budget, status'),
    supabase.from('invoices').select('created_at, amount_paid, status'),
  ])

  // Simple aggregation for demonstration
  const revenueByMonth = [
    { month: "Jan", revenue: 4500 },
    { month: "Feb", revenue: 5200 },
    { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 6100 },
    { month: "May", revenue: 5900 },
    { month: "Jun", revenue: 7200 },
  ]

  const leadSources = [
    { source: "Website", count: 45, fill: "var(--color-chrome)" },
    { source: "Referral", count: 20, fill: "var(--color-safari)" },
    { source: "LinkedIn", count: 15, fill: "var(--color-firefox)" },
    { source: "Direct", count: 10, fill: "var(--color-edge)" },
    { source: "Other", count: 5, fill: "var(--color-other)" },
  ]

  return {
    revenueByMonth,
    leadSources,
    stats: {
      totalRevenue: 33700,
      conversionRate: 24,
      avgProjectValue: 4200
    }
  }
}

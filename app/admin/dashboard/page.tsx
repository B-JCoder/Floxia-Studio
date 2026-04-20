import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive";
import { DataTable } from "@/components/admin/data-table";
import { SectionCards } from "@/components/admin/section-cards";
import { getDashboardData } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function Page() {
  const { leads, projects, tasks, metrics } = await getDashboardData();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex flex-col gap-4 py-2 md:gap-6 md:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="grid gap-1">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your agency today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">Download Report</Button>
            <Button size="sm">Quick Create</Button>
          </div>
        </div>
        
        <SectionCards metrics={metrics} />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Revenue Activity</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <ChartAreaInteractive />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recent Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {lead.first_name[0]}{lead.last_name[0]}
                      </div>
                      <div className="grid gap-0.5">
                        <span className="text-sm font-medium">{lead.first_name} {lead.last_name}</span>
                        <span className="text-[10px] text-muted-foreground">{lead.service || 'General'}</span>
                      </div>
                      <Badge variant="secondary" className="ml-auto text-[10px] h-4 px-1">{lead.status}</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-xs h-8" asChild>
                  <Link href="/admin/leads">View all leads</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <DataTable leads={leads} projects={projects} tasks={tasks} />
      </div>
    </div>
  );
}

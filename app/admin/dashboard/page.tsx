import { AppSidebar } from "@/components/admin/app-sidebar";
import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive";
import { DataTable } from "@/components/admin/data-table";
import { SectionCards } from "@/components/admin/section-cards";
import { SiteHeader } from "@/components/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getDashboardData } from "./actions";

export default async function Page() {
  const { leads, projects, tasks, metrics } = await getDashboardData();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards metrics={metrics} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* @ts-ignore - Ignore type error temporarily while we update schema */}
              <DataTable leads={leads} projects={projects} tasks={tasks} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

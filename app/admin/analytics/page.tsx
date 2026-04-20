import { getAnalyticsData } from "./actions";
import { AnalyticsClient } from "./analytics-client";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Monitor your agency's performance and growth metrics.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <AnalyticsClient data={data} />
      </div>
    </div>
  );
}

import { getLeads } from "./actions";
import { LeadsClient } from "./leads-client";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Leads Pipeline</h1>
          <p className="text-muted-foreground">
            Manage and track your incoming business opportunities.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <LeadsClient initialLeads={leads} />
      </div>
    </div>
  );
}

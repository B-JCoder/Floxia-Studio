import { getProposals } from "./actions";
import { ProposalsClient } from "./proposals-client";
import { getLeads } from "../leads/actions";

export default async function ProposalsPage() {
  const proposals = await getProposals();
  const leads = await getLeads();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Proposals</h1>
          <p className="text-muted-foreground">
            Create and manage client proposals and quotes.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <ProposalsClient initialProposals={proposals} leads={leads} />
      </div>
    </div>
  );
}

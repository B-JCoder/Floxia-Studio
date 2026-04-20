import { getInvoices } from "./actions";
import { InvoicesClient } from "@/app/admin/invoices/invoices-client";
import { getProjects } from "../projects/actions";

export default async function InvoicesPage() {
  const invoices = await getInvoices();
  const projects = await getProjects();

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage your billing and payment tracking.
          </p>
        </div>
      </div>
      <div className="mt-4">
        <InvoicesClient initialInvoices={invoices} projects={projects} />
      </div>
    </div>
  );
}

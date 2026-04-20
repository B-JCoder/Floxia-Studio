export default function ClientsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your client profiles and relationships.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-1 items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No clients yet</h3>
          <p className="text-sm text-muted-foreground">Once leads are converted, they will appear here as clients.</p>
        </div>
      </div>
    </div>
  );
}

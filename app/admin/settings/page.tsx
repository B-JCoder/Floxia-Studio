export default function SettingsPage() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your agency info and dashboard preferences.
          </p>
        </div>
      </div>
      <div className="mt-8 grid gap-6">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium">Agency Profile</h3>
          <p className="text-sm text-muted-foreground mb-4">Manage your agency's public information.</p>
          <div className="space-y-4 max-w-md">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Agency Name</label>
              <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" defaultValue="Floxia Studio" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Contact Email</label>
              <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" defaultValue="contact@floxiastudio.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

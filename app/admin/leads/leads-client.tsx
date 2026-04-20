'use client'

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconLayoutKanban, IconTable } from "@tabler/icons-react"
import { Lead } from "@/components/admin/data-table"
import { KanbanBoard } from "./kanban-board"
import { LeadsTable } from "./leads-table"

export function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = React.useState<Lead[]>(initialLeads)

  return (
    <Tabs defaultValue="kanban" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="kanban" className="flex items-center gap-2">
            <IconLayoutKanban size={16} />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-2">
            <IconTable size={16} />
            Table
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="kanban" className="mt-0 border-none p-0">
        <KanbanBoard leads={leads} onLeadsChange={setLeads} />
      </TabsContent>
      <TabsContent value="table" className="mt-0 border-none p-0">
        <LeadsTable leads={leads} />
      </TabsContent>
    </Tabs>
  )
}

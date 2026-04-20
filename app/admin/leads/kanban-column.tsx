'use client'

import * as React from "react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Lead } from "@/components/admin/data-table"
import { KanbanCard } from "./kanban-card"
import { Badge } from "@/components/ui/badge"

export function KanbanColumn({ 
  id, 
  title, 
  leads 
}: { 
  id: string, 
  title: string, 
  leads: Lead[] 
}) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: "Column",
    },
  })

  return (
    <div className="flex w-72 shrink-0 flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <Badge variant="secondary" className="h-5 rounded-full px-1.5 text-[10px]">
            {leads.length}
          </Badge>
        </div>
      </div>
      
      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-3 rounded-xl bg-muted/50 p-3"
      >
        <SortableContext
          items={leads.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {leads.map((lead) => (
            <KanbanCard key={lead.id} lead={lead} />
          ))}
        </SortableContext>
        
        {leads.length === 0 && (
          <div className="flex h-20 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
            No leads
          </div>
        )}
      </div>
    </div>
  )
}

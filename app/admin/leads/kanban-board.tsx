'use client'

import * as React from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { Lead } from "@/components/admin/data-table"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { updateLeadStatus } from "./actions"
import { toast } from "sonner"

const COLUMNS = [
  { id: "New", title: "New" },
  { id: "Contacted", title: "Contacted" },
  { id: "In Progress", title: "In Progress" },
  { id: "Converted", title: "Converted" },
  { id: "Dead", title: "Dead" },
]

export function KanbanBoard({ 
  leads, 
  onLeadsChange 
}: { 
  leads: Lead[], 
  onLeadsChange: (leads: Lead[]) => void 
}) {
  const [activeLead, setActiveLead] = React.useState<Lead | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event
    const lead = leads.find((l) => l.id === active.id)
    if (lead) setActiveLead(lead)
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveACard = active.data.current?.type === "Lead"
    const isOverACard = over.data.current?.type === "Lead"
    const isOverAColumn = over.data.current?.type === "Column"

    if (!isActiveACard) return

    // Dropping a card over another card
    if (isActiveACard && isOverACard) {
      const activeIndex = leads.findIndex((l) => l.id === activeId)
      const overIndex = leads.findIndex((l) => l.id === overId)

      if (leads[activeIndex].status !== leads[overIndex].status) {
        const updatedLeads = [...leads]
        updatedLeads[activeIndex] = {
          ...updatedLeads[activeIndex],
          status: leads[overIndex].status,
        }
        onLeadsChange(arrayMove(updatedLeads, activeIndex, overIndex))
      }
    }

    // Dropping a card over a column
    if (isActiveACard && isOverAColumn) {
      const activeIndex = leads.findIndex((l) => l.id === activeId)
      const newStatus = overId as string

      if (leads[activeIndex].status !== newStatus) {
        const updatedLeads = [...leads]
        updatedLeads[activeIndex] = {
          ...updatedLeads[activeIndex],
          status: newStatus,
        }
        onLeadsChange(arrayMove(updatedLeads, activeIndex, activeIndex))
      }
    }
  }

  const onDragEnd = async (event: DragEndEvent) => {
    setActiveLead(null)
    const { active, over } = event
    if (!over) return

    const leadId = active.id as string
    const newStatus = over.data.current?.type === "Column" 
      ? (over.id as string) 
      : (over.data.current?.lead?.status as string)

    if (newStatus && activeLead && activeLead.status !== newStatus) {
      const result = await updateLeadStatus(leadId, newStatus)
      if (result.error) {
        toast.error("Failed to update lead status")
        // Optionally revert local state here
      } else {
        toast.success(`Lead moved to ${newStatus}`)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="flex h-[calc(100vh-250px)] gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            leads={leads.filter((l) => l.status === col.id)}
          />
        ))}
      </div>

      <DragOverlay
        dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: "0.5",
              },
            },
          }),
        }}
      >
        {activeLead ? <KanbanCard lead={activeLead} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}

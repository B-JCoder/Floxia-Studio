'use client'

import * as React from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Lead } from "@/components/admin/data-table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { IconMail, IconBriefcase } from "@tabler/icons-react"

import Link from "next/link"

export function KanbanCard({ 
  lead, 
  isOverlay 
}: { 
  lead: Lead, 
  isOverlay?: boolean 
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: lead.id,
    data: {
      type: "Lead",
      lead,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-32 rounded-lg border-2 border-primary/50 bg-primary/5 opacity-30"
      />
    )
  }

  return (
    <Link href={`/admin/leads/${lead.id}`} className="block">
      <Card
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={cn(
          "cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors",
          isOverlay && "border-primary shadow-xl"
        )}
      >
        <CardHeader className="p-3 pb-0">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold leading-none">
              {lead.first_name} {lead.last_name}
            </span>
            <Badge variant="outline" className="text-[10px] h-4 px-1">
              {lead.budget || "N/A"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 p-3 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconMail size={12} />
            <span className="truncate">{lead.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconBriefcase size={12} />
            <span className="truncate">{lead.service || "General"}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground/60">
              {new Date(lead.created_at).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

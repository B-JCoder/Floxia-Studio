'use client'

import * as React from "react"
import { Project } from "@/components/admin/data-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateProjectStatus } from "./actions"
import { toast } from "sonner"
import { IconDotsVertical, IconPlus } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import Link from "next/link"

export function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = React.useState(initialProjects)

  const handleStatusChange = async (id: string, newStatus: string) => {
    toast.promise(updateProjectStatus(id, newStatus), {
      loading: "Updating project...",
      success: "Project updated!",
      error: "Failed to update project.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {projects.length} projects
        </div>
        <Button size="sm">
          <IconPlus size={16} className="mr-2" />
          New Project
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/projects/${project.id}`} className="hover:underline text-primary">
                    {project.title}
                  </Link>
                </TableCell>
                <TableCell>{project.onboarding_clients?.company_name || 'Individual'}</TableCell>
                <TableCell>${project.budget || '0'}</TableCell>
                <TableCell>
                  <Select defaultValue={project.status} onValueChange={(val) => handleStatusChange(project.id, val)}>
                    <SelectTrigger className="w-[130px] h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'No date'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <IconDotsVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/projects/${project.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Manage Tasks</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

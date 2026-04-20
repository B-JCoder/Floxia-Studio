'use client'

import * as React from "react"
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
import { IconDotsVertical, IconPlus, IconExternalLink } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProposal } from "./actions"
import { toast } from "sonner"

export function ProposalsClient({ initialProposals, leads }: { initialProposals: any[], leads: any[] }) {
  const [proposals, setProposals] = React.useState(initialProposals)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      lead_id: formData.get('lead_id'),
      title: formData.get('title'),
      total_amount: formData.get('amount'),
      content: { items: [] }
    }

    const result = await createProposal(data)
    if (result.error) {
      toast.error("Failed to create proposal")
    } else {
      toast.success("Proposal created as draft")
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {proposals.length} proposals
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <IconPlus size={16} className="mr-2" />
              New Proposal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Proposal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lead_id">Select Lead</Label>
                <Select name="lead_id" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lead..." />
                  </SelectTrigger>
                  <SelectContent>
                    {leads.map(lead => (
                      <SelectItem key={lead.id} value={lead.id}>
                        {lead.first_name} {lead.last_name} ({lead.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Proposal Title</Label>
                <Input id="title" name="title" placeholder="e.g. Website Redesign for X" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Estimated Amount ($)</Label>
                <Input id="amount" name="amount" type="number" placeholder="5000" />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit">Create Draft</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No proposals found.
                </TableCell>
              </TableRow>
            )}
            {proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">{proposal.title}</TableCell>
                <TableCell>{proposal.leads?.first_name} {proposal.leads?.last_name}</TableCell>
                <TableCell>${proposal.total_amount || '0'}</TableCell>
                <TableCell>
                  <Badge variant={proposal.status === 'Draft' ? 'secondary' : 'default'}>
                    {proposal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(proposal.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <IconDotsVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <IconExternalLink size={14} className="mr-2" />
                        Open Builder
                      </DropdownMenuItem>
                      <DropdownMenuItem>Send to Client</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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

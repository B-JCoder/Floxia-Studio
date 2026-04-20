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
import { IconDotsVertical, IconPlus, IconDownload } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createInvoice } from "./actions"
import { toast } from "sonner"

export function InvoicesClient({ initialInvoices, projects }: { initialInvoices: any[], projects: any[] }) {
  const [invoices, setInvoices] = React.useState(initialInvoices)
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const projectId = formData.get('project_id')
    const project = projects.find(p => p.id === projectId)
    
    const data = {
      project_id: projectId,
      client_id: project?.client_id,
      invoice_number: `INV-${Date.now().toString().slice(-6)}`,
      amount_due: formData.get('amount'),
      due_date: formData.get('due_date'),
      status: 'Unpaid'
    }

    const result = await createInvoice(data)
    if (result.error) {
      toast.error("Failed to create invoice")
    } else {
      toast.success("Invoice created")
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {invoices.length} invoices
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <IconPlus size={16} className="mr-2" />
              New Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project_id">Select Project</Label>
                <Select name="project_id" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount Due ($)</Label>
                <Input id="amount" name="amount" type="number" placeholder="1500" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input id="due_date" name="due_date" type="date" required />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit">Create Invoice</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Project / Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-mono text-xs">{invoice.invoice_number}</TableCell>
                <TableCell>
                  <div className="grid gap-0.5">
                    <span className="font-medium text-sm">{invoice.onboarding_clients?.company_name || 'Client'}</span>
                    <span className="text-[10px] text-muted-foreground">ID: {invoice.id.slice(0, 8)}</span>
                  </div>
                </TableCell>
                <TableCell>${invoice.amount_due}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(invoice.due_date).toLocaleDateString()}
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
                        <IconDownload size={14} className="mr-2" />
                        Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
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

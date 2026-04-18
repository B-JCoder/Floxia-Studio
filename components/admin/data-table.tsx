"use client";

import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconLayoutColumns,
  IconPlus,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateLeadStatus, updateProjectStatus, updateTaskStatus, createLead, createProject, createTask } from "@/app/admin/dashboard/actions";
import { toast } from "sonner";

// --- Types ---

export type Lead = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  service: string;
  budget: string;
  status: string;
  lifecycle_stage: string;
  created_at: string;
};

export type Project = {
  id: string;
  lead_id: string;
  name: string;
  status: string;
  budget: string;
  deadline: string;
  created_at: string;
};

export type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
};

// --- Generic Table Component ---

function GenericTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  noResultsText,
  entityType,
}: {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  searchPlaceholder: string;
  noResultsText: string;
  entityType: "Lead" | "Project" | "Task";
}) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });

  const handleCreate = async (formData: FormData) => {
    let result;
    if (entityType === "Lead") {
      result = await createLead(formData);
    } else if (entityType === "Project") {
      result = await createProject(formData);
    } else {
      result = await createTask(formData);
    }

    if (result?.error) {
      toast.error(`Failed to create ${entityType}: ${result.error}`);
    } else {
      toast.success(`${entityType} created successfully!`);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Columns</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id.replace("_", " ")}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                <IconPlus />
                <span className="hidden lg:inline">Add {entityType}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New {entityType}</DialogTitle>
              </DialogHeader>
              <form action={handleCreate} className="space-y-4">
                {entityType === "Lead" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name</Label>
                        <Input id="first_name" name="first_name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input id="last_name" name="last_name" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service</Label>
                      <Input id="service" name="service" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Input id="budget" name="budget" />
                    </div>
                  </>
                )}
                {entityType === "Project" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Project Name</Label>
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <Input id="budget" name="budget" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input id="deadline" name="deadline" type="date" />
                    </div>
                  </>
                )}
                {entityType === "Task" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">Task Title</Label>
                      <Input id="title" name="title" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="due_date">Due Date</Label>
                      <Input id="due_date" name="due_date" type="date" />
                    </div>
                  </>
                )}
                <div className="flex justify-end pt-4">
                  <Button type="submit">Create {entityType}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {noResultsText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Columns ---

const leadColumns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.first_name} {row.original.last_name}
      </div>
    ),
  },
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <Badge variant="secondary" className="font-normal">{row.original.service || "General"}</Badge>,
  },
  { accessorKey: "budget", header: "Budget" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const handleStatusChange = async (newStatus: string) => {
        toast.promise(updateLeadStatus(row.original.id, newStatus), {
          loading: "Updating status...",
          success: "Status updated!",
          error: "Failed to update status.",
        });
      };
      return (
        <Select defaultValue={row.original.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Contacted">Contacted</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Converted">Converted</SelectItem>
            <SelectItem value="Dead">Dead</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => <div className="text-muted-foreground text-sm">{new Date(row.original.created_at).toLocaleDateString()}</div>,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 text-muted-foreground" size="icon"><IconDotsVertical /><span className="sr-only">Open menu</span></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Email Client</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => <div className="text-muted-foreground">${row.original.budget}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const handleStatusChange = async (newStatus: string) => {
        toast.promise(updateProjectStatus(row.original.id, newStatus), {
          loading: "Updating project...",
          success: "Project updated!",
          error: "Failed to update project.",
        });
      };
      return (
        <Select defaultValue={row.original.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Hold">On Hold</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => <div className="text-muted-foreground text-sm">{row.original.deadline ? new Date(row.original.deadline).toLocaleDateString() : 'None'}</div>,
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex size-8 text-muted-foreground" size="icon"><IconDotsVertical /><span className="sr-only">Open menu</span></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const taskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Task",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <Badge variant={row.original.priority === "High" ? "destructive" : "secondary"}>{row.original.priority}</Badge>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const handleStatusChange = async (newStatus: string) => {
        toast.promise(updateTaskStatus(row.original.id, newStatus), {
          loading: "Updating task...",
          success: "Task updated!",
          error: "Failed to update task.",
        });
      };
      return (
        <Select defaultValue={row.original.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[130px] h-8 text-xs"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Review">Review</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => <div className="text-muted-foreground text-sm">{row.original.due_date ? new Date(row.original.due_date).toLocaleDateString() : 'No date'}</div>,
  },
];

// --- Main Export ---

export function DataTable({ leads, projects, tasks }: { leads?: Lead[], projects?: Project[], tasks?: Task[] }) {
  return (
    <Tabs defaultValue="leads" className="w-full flex-col justify-start gap-6 px-4 lg:px-6">
      <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex mb-4">
        <TabsTrigger value="leads">
          Leads <Badge variant="secondary">{leads?.length || 0}</Badge>
        </TabsTrigger>
        <TabsTrigger value="projects">
          Projects <Badge variant="secondary">{projects?.length || 0}</Badge>
        </TabsTrigger>
        <TabsTrigger value="tasks">
          Tasks <Badge variant="secondary">{tasks?.length || 0}</Badge>
        </TabsTrigger>
        <TabsTrigger value="goals">Goals</TabsTrigger>
      </TabsList>
      
      <TabsContent value="leads" className="relative flex flex-col gap-4 overflow-auto">
        <GenericTable 
          data={leads || []} 
          columns={leadColumns} 
          searchKey="email" 
          searchPlaceholder="Filter emails..." 
          noResultsText="No leads found."
          entityType="Lead"
        />
      </TabsContent>
      
      <TabsContent value="projects" className="relative flex flex-col gap-4 overflow-auto">
        <GenericTable 
          data={projects || []} 
          columns={projectColumns} 
          searchKey="name" 
          searchPlaceholder="Filter projects..." 
          noResultsText="No projects found."
          entityType="Project"
        />
      </TabsContent>
      
      <TabsContent value="tasks" className="relative flex flex-col gap-4 overflow-auto">
        <GenericTable 
          data={tasks || []} 
          columns={taskColumns} 
          searchKey="title" 
          searchPlaceholder="Filter tasks..." 
          noResultsText="No tasks found."
          entityType="Task"
        />
      </TabsContent>
      
      <TabsContent value="goals" className="flex flex-col">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center text-muted-foreground">
          Goals view coming soon
        </div>
      </TabsContent>
    </Tabs>
  );
}

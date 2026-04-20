"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFileInvoice,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
  IconWriting,
  IconFolderOpen
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/admin/nav-documents";
import { NavMain } from "@/components/admin/nav-main";
import { NavSecondary } from "@/components/admin/nav-secondary";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "admin@floxiastudio.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Leads",
      url: "/admin/leads",
      icon: IconUsers,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: IconFolder,
    },
    {
      title: "Proposals",
      url: "/admin/proposals",
      icon: IconWriting,
    },
    {
      title: "Invoices",
      url: "/admin/invoices",
      icon: IconFileInvoice,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: IconChartBar,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Contracts",
      url: "#",
      icon: IconWriting,
    },
    {
      name: "Invoices",
      url: "/admin/invoices",
      icon: IconFileInvoice,
    },
    {
      name: "Brand Assets",
      url: "#",
      icon: IconFolderOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/admin/dashboard">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Floxia Studio</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}

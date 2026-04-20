import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { IconBell, IconSearch } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/50 backdrop-blur-md sticky top-0 z-10 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex-1 max-w-sm hidden md:flex relative">
          <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search everything..." 
            className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20" 
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="size-9 rounded-full relative">
            <IconBell size={18} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex h-9 rounded-full px-4">
            Feedback
          </Button>
        </div>
      </div>
    </header>
  );
}

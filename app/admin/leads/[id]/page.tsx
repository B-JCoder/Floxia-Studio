import { getLead } from "../actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconArrowLeft, IconMail, IconPhone, IconCalendar, IconTarget } from "@tabler/icons-react";
import Link from "next/link";

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const lead = await getLead(id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/leads">
            <IconArrowLeft size={20} />
          </Link>
        </Button>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {lead.first_name} {lead.last_name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{lead.status}</Badge>
            <span className="text-xs text-muted-foreground">Lead ID: {lead.id}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IconMail size={16} />
                </div>
                <div className="grid gap-0.5">
                  <span className="text-sm font-medium">Email</span>
                  <span className="text-sm text-muted-foreground">{lead.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IconTarget size={16} />
                </div>
                <div className="grid gap-0.5">
                  <span className="text-sm font-medium">Requested Service</span>
                  <span className="text-sm text-muted-foreground">{lead.service || "Not specified"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IconCalendar size={16} />
                </div>
                <div className="grid gap-0.5">
                  <span className="text-sm font-medium">Inquiry Date</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(lead.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inquiry Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg italic">
                "{lead.message || "No message provided."}"
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No communication history yet.</p>
                <Button variant="outline" size="sm" className="mt-4">
                  Log Communication
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Status</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Current Pipeline Stage</label>
                <Badge className="w-fit px-3 py-1 text-sm">{lead.status}</Badge>
              </div>
              <Button className="w-full">Convert to Client</Button>
              <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">Mark as Dead</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget & Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lead.budget || "TBD"}</div>
              <p className="text-xs text-muted-foreground">Estimated project value</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

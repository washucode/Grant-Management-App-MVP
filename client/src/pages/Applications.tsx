import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { StatusBadge, type ApplicationStatus } from "@/components/StatusBadge";
import { Search, Filter, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Application, Applicant, GrantProgram } from "@shared/schema";
import { Link } from "wouter";

export default function Applications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: applications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const { data: applicants } = useQuery<Applicant[]>({
    queryKey: ["/api/applicants"],
  });

  const { data: programs } = useQuery<GrantProgram[]>({
    queryKey: ["/api/programs"],
  });

  const applicationsWithDetails = applications?.map((app) => {
    const applicant = applicants?.find((a) => a.id === app.applicantId);
    const program = programs?.find((p) => p.id === app.programId);
    
    return {
      id: app.id,
      applicant: applicant?.name || "Unknown",
      program: program?.name || "Unknown",
      amount: parseFloat(app.amount),
      submitted: new Date(app.submittedAt).toISOString().split("T")[0],
      status: app.status as ApplicationStatus,
    };
  }) || [];

  const filteredApplications = applicationsWithDetails.filter((app) => {
    const matchesSearch =
      app.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Applications</h1>
        <p className="text-muted-foreground mt-1">
          Manage and review grant applications
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-status-filter">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="disbursed">Disbursed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="mt-6 border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium uppercase text-xs tracking-wide">
                  Application ID
                </TableHead>
                <TableHead className="font-medium uppercase text-xs tracking-wide">
                  Applicant
                </TableHead>
                <TableHead className="font-medium uppercase text-xs tracking-wide">
                  Program
                </TableHead>
                <TableHead className="font-medium uppercase text-xs tracking-wide text-right">
                  Amount
                </TableHead>
                <TableHead className="font-medium uppercase text-xs tracking-wide">
                  Submitted
                </TableHead>
                <TableHead className="font-medium uppercase text-xs tracking-wide">
                  Status
                </TableHead>
                <TableHead className="font-medium uppercase text-xs tracking-wide text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow
                  key={app.id}
                  className="hover-elevate"
                  data-testid={`row-application-${app.id}`}
                >
                  <TableCell className="font-mono text-sm">{app.id}</TableCell>
                  <TableCell className="font-medium">{app.applicant}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {app.program}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    ${app.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {app.submitted}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/applications/${app.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        data-testid={`button-view-${app.id}`}
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No applications found</p>
          </div>
        )}
      </Card>
    </div>
  );
}

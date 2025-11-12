import { StatsCard } from "@/components/StatsCard";
import { ApplicationCard } from "@/components/ApplicationCard";
import {
  DollarSign,
  FileText,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Application, Applicant, GrantProgram } from "@shared/schema";
import { Link } from "wouter";

type ApplicationWithDetails = Application & {
  applicant?: Applicant;
  program?: GrantProgram;
};

export default function Dashboard() {
  const { data: stats } = useQuery<{
    totalGrants: string;
    totalApplications: number;
    approvedCount: number;
    disbursedAmount: string;
  }>({
    queryKey: ["/api/stats"],
  });

  const { data: applications } = useQuery<ApplicationWithDetails[]>({
    queryKey: ["/api/applications"],
  });

  const { data: applicants } = useQuery<Applicant[]>({
    queryKey: ["/api/applicants"],
  });

  const { data: programs } = useQuery<GrantProgram[]>({
    queryKey: ["/api/programs"],
  });

  const recentApplications = applications
    ?.slice(0, 3)
    .map((app) => {
      const applicant = applicants?.find((a) => a.id === app.applicantId);
      const program = programs?.find((p) => p.id === app.programId);
      
      return {
        id: app.id,
        applicantName: applicant?.name || "Unknown",
        programName: program?.name || "Unknown",
        amount: parseFloat(app.amount),
        submittedDate: new Date(app.submittedAt).toISOString().split("T")[0],
        status: app.status as "pending" | "under_review" | "approved" | "rejected" | "disbursed" | "completed",
        description: app.description,
      };
    }) || [];

  const pendingApps = applications?.filter(
    (app) => app.status === "pending" || app.status === "under_review"
  ) || [];

  const activePrograms = programs?.filter((p) => p.isActive === 1) || [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of grant management activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Grants"
          value={`$${parseFloat(stats?.totalGrants || "0").toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12, label: "from last month" }}
        />
        <StatsCard
          title="Applications"
          value={stats?.totalApplications?.toString() || "0"}
          icon={FileText}
          trend={{ value: 8, label: "from last month" }}
        />
        <StatsCard
          title="Approved"
          value={stats?.approvedCount?.toString() || "0"}
          icon={CheckCircle}
          trend={{ value: 15, label: "from last month" }}
        />
        <StatsCard
          title="Disbursed"
          value={`$${parseFloat(stats?.disbursedAmount || "0").toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: 10, label: "from last month" }}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap space-y-0 pb-4">
          <CardTitle>Recent Applications</CardTitle>
          <Link href="/applications">
            <Button variant="outline" size="sm" data-testid="button-view-all">
              View All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentApplications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentApplications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  {...app}
                  onView={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No applications yet
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApps.slice(0, 3).map((app) => {
                const program = programs?.find((p) => p.id === app.programId);
                const daysPending = Math.floor(
                  (Date.now() - new Date(app.submittedAt).getTime()) / (1000 * 60 * 60 * 24)
                );
                
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                    data-testid={`pending-approval-${app.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{program?.name || "Unknown"}</p>
                      <p className="text-sm text-muted-foreground">
                        Pending for {daysPending} days
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold tabular-nums">
                        ${parseFloat(app.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
              {pendingApps.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No pending approvals
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Program Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePrograms.slice(0, 3).map((program) => {
                const budget = parseFloat(program.budget);
                const used = parseFloat(program.allocated);
                const percent = budget > 0 ? (used / budget) * 100 : 0;
                
                return (
                  <div key={program.id} className="space-y-2" data-testid={`budget-status-${program.id}`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{program.name}</span>
                      <span className="text-muted-foreground">
                        {percent.toFixed(0)}% used
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>${used.toLocaleString()} used</span>
                      <span>${budget.toLocaleString()} budget</span>
                    </div>
                  </div>
                );
              })}
              {activePrograms.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No active programs
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

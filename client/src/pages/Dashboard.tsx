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
import { useState } from "react";

export default function Dashboard() {
  const [, setSelectedApp] = useState<string | null>(null);

  //todo: remove mock functionality
  const recentApplications = [
    {
      id: "1",
      applicantName: "Sarah Johnson",
      programName: "Small Business Development Grant",
      amount: 50000,
      submittedDate: "2024-11-05",
      status: "pending" as const,
      description: "Funding request for expanding local bakery operations.",
    },
    {
      id: "2",
      applicantName: "Michael Chen",
      programName: "Education Innovation Fund",
      amount: 25000,
      submittedDate: "2024-11-08",
      status: "under_review" as const,
      description: "STEM program development for underserved communities.",
    },
    {
      id: "3",
      applicantName: "Emily Rodriguez",
      programName: "Community Health Initiative",
      amount: 75000,
      submittedDate: "2024-11-01",
      status: "approved" as const,
      description: "Mobile health clinic services for rural areas.",
    },
  ];

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
          value="$2.4M"
          icon={DollarSign}
          trend={{ value: 12, label: "from last month" }}
        />
        <StatsCard
          title="Applications"
          value="156"
          icon={FileText}
          trend={{ value: 8, label: "from last month" }}
        />
        <StatsCard
          title="Approved"
          value="42"
          icon={CheckCircle}
          trend={{ value: 15, label: "from last month" }}
        />
        <StatsCard
          title="Disbursed"
          value="$1.8M"
          icon={TrendingUp}
          trend={{ value: 10, label: "from last month" }}
        />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 flex-wrap space-y-0 pb-4">
          <CardTitle>Recent Applications</CardTitle>
          <Button variant="outline" size="sm" data-testid="button-view-all">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                {...app}
                onView={() => setSelectedApp(app.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Tech Startup Accelerator", amount: 100000, days: 2 },
                { name: "Arts & Culture Program", amount: 35000, days: 5 },
                { name: "Environmental Conservation", amount: 60000, days: 7 },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                  data-testid={`pending-approval-${i}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Pending for {item.days} days
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold tabular-nums">
                      ${item.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Program Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Small Business", budget: 500000, used: 350000 },
                { name: "Education", budget: 250000, used: 180000 },
                { name: "Health", budget: 400000, used: 320000 },
              ].map((program, i) => {
                const percent = (program.used / program.budget) * 100;
                return (
                  <div key={i} className="space-y-2" data-testid={`budget-status-${i}`}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{program.name}</span>
                      <span className="text-muted-foreground">
                        {percent.toFixed(0)}% used
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>${program.used.toLocaleString()} used</span>
                      <span>${program.budget.toLocaleString()} budget</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ApplicationDetail() {
  const [activeTab, setActiveTab] = useState("overview");

  //todo: remove mock functionality
  const application = {
    id: "APP-2024-001",
    applicant: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    program: "Small Business Development Grant",
    amount: 50000,
    submitted: "2024-11-05",
    status: "pending" as const,
    description:
      "Requesting funding to expand our local bakery operations, including new equipment purchases, staff training, and facility improvements. This will enable us to serve more customers and create additional jobs in the community.",
    businessName: "Sweet Delights Bakery",
    yearsInBusiness: 5,
    employees: 8,
  };

  const timeline = [
    {
      date: "2024-11-05",
      status: "Submitted",
      user: "Sarah Johnson",
      comment: "Application submitted for review",
      icon: FileText,
    },
    {
      date: "2024-11-06",
      status: "Under Review",
      user: "Admin User",
      comment: "Application assigned to review committee",
      icon: Clock,
    },
  ];

  const documents = [
    { name: "Business Plan.pdf", size: "2.4 MB", uploaded: "2024-11-05" },
    { name: "Financial Statements.pdf", size: "1.8 MB", uploaded: "2024-11-05" },
    { name: "Tax Documents.pdf", size: "956 KB", uploaded: "2024-11-05" },
  ];

  const handleApprove = () => {
    console.log("Application approved");
  };

  const handleReject = () => {
    console.log("Application rejected");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" data-testid="button-back">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {application.id}
          </h1>
          <p className="text-muted-foreground mt-1">{application.program}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="flex flex-wrap gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="gap-2" data-testid="button-approve">
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Application</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve this grant application? This
                action will move the application to the disbursement stage.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleApprove}>
                Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="gap-2" data-testid="button-reject">
              <XCircle className="h-4 w-4" />
              Reject
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Application</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject this grant application? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleReject}>
                Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="outline" className="gap-2" data-testid="button-request-info">
          Request More Info
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="documents" data-testid="tab-documents">
            Documents
          </TabsTrigger>
          <TabsTrigger value="timeline" data-testid="tab-timeline">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="disbursement" data-testid="tab-disbursement">
            Disbursement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                    Applicant Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{application.applicant}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{application.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{application.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                    Business Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Business Name
                      </p>
                      <p className="font-medium">{application.businessName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Years in Business
                      </p>
                      <p className="font-medium">
                        {application.yearsInBusiness} years
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <p className="font-medium">{application.employees}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                  Grant Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Program</p>
                    <p className="font-medium">{application.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Requested Amount
                    </p>
                    <p className="text-2xl font-semibold tabular-nums">
                      ${application.amount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Submission Date
                    </p>
                    <p className="font-medium">{application.submitted}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-3">
                  Project Description
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {application.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                    data-testid={`document-${i}`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.size} • Uploaded {doc.uploaded}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" data-testid={`button-download-${i}`}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timeline.map((event, i) => (
                  <div key={i} className="flex gap-4" data-testid={`timeline-event-${i}`}>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <event.icon className="h-5 w-5 text-primary" />
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-px h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="font-semibold">{event.status}</p>
                        <p className="text-sm text-muted-foreground">
                          {event.date}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        By {event.user}
                      </p>
                      <p className="text-sm mt-2">{event.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disbursement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Disbursement Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No disbursement schedule available yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Disbursement details will appear after approval
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

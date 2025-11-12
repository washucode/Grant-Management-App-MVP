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
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import type { Application, Applicant, GrantProgram, ApplicationTimeline, Disbursement } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ApplicationDetail() {
  const [, params] = useRoute("/applications/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const applicationId = params?.id;

  const { data: application } = useQuery<Application>({
    queryKey: [`/api/applications/${applicationId}`],
    enabled: !!applicationId,
  });

  const { data: applicant } = useQuery<Applicant>({
    queryKey: [`/api/applicants/${application?.applicantId}`],
    enabled: !!application?.applicantId,
  });

  const { data: program } = useQuery<GrantProgram>({
    queryKey: [`/api/programs/${application?.programId}`],
    enabled: !!application?.programId,
  });

  const { data: timeline } = useQuery<ApplicationTimeline[]>({
    queryKey: [`/api/applications/${applicationId}/timeline`],
    enabled: !!applicationId,
  });

  const { data: disbursements } = useQuery<Disbursement[]>({
    queryKey: [`/api/applications/${applicationId}/disbursements`],
    enabled: !!applicationId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ status, reviewNotes }: { status: string; reviewNotes?: string }) => {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          reviewedBy: "Admin User",
          reviewNotes,
        }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/applications"] });
      queryClient.invalidateQueries({ queryKey: [`/api/applications/${applicationId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/applications/${applicationId}/timeline`] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  const handleApprove = () => {
    updateStatusMutation.mutate(
      { status: "approved", reviewNotes: "Application approved for disbursement" },
      {
        onSuccess: () => {
          toast({
            title: "Application Approved",
            description: "The application has been approved successfully.",
          });
        },
      }
    );
  };

  const handleReject = () => {
    updateStatusMutation.mutate(
      { status: "rejected", reviewNotes: "Application did not meet criteria" },
      {
        onSuccess: () => {
          toast({
            title: "Application Rejected",
            description: "The application has been rejected.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (!application || !applicant || !program) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading application details...</p>
        </div>
      </div>
    );
  }

  const timelineWithIcons = (timeline || []).map((event) => ({
    ...event,
    date: new Date(event.createdAt).toISOString().split("T")[0],
    icon: event.status.toLowerCase().includes("submit")
      ? FileText
      : event.status.toLowerCase().includes("review")
      ? Clock
      : event.status.toLowerCase().includes("approve")
      ? CheckCircle
      : FileText,
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-back"
          onClick={() => setLocation("/applications")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            {application.id}
          </h1>
          <p className="text-muted-foreground mt-1">{program.name}</p>
        </div>
        <StatusBadge status={application.status as any} />
      </div>

      {application.status === "pending" || application.status === "under_review" ? (
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
      ) : null}

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
                      <p className="font-medium">{applicant.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{applicant.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{applicant.phone || "N/A"}</p>
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
                      <p className="font-medium">{applicant.businessName || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Years in Business
                      </p>
                      <p className="font-medium">
                        {applicant.yearsInBusiness ? `${applicant.yearsInBusiness} years` : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employees</p>
                      <p className="font-medium">{applicant.employees || "N/A"}</p>
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
                    <p className="font-medium">{program.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Requested Amount
                    </p>
                    <p className="text-2xl font-semibold tabular-nums">
                      ${parseFloat(application.amount).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Submission Date
                    </p>
                    <p className="font-medium">
                      {new Date(application.submittedAt).toISOString().split("T")[0]}
                    </p>
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
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Document management coming soon
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload and manage application documents
                </p>
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
                {timelineWithIcons.map((event, i) => (
                  <div key={event.id} className="flex gap-4" data-testid={`timeline-event-${i}`}>
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <event.icon className="h-5 w-5 text-primary" />
                      </div>
                      {i < timelineWithIcons.length - 1 && (
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
                      {event.comment && (
                        <p className="text-sm mt-2">{event.comment}</p>
                      )}
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
              {disbursements && disbursements.length > 0 ? (
                <div className="space-y-4">
                  {disbursements.map((disbursement) => (
                    <div
                      key={disbursement.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                      data-testid={`disbursement-${disbursement.id}`}
                    >
                      <div>
                        <p className="font-medium">
                          ${parseFloat(disbursement.amount).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Scheduled: {new Date(disbursement.scheduledDate).toISOString().split("T")[0]}
                        </p>
                      </div>
                      <StatusBadge status={disbursement.status as any} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No disbursement schedule available yet
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Disbursement details will appear after approval
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

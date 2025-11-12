import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, type ApplicationStatus } from "./StatusBadge";
import { Calendar, DollarSign, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  id: string;
  applicantName: string;
  programName: string;
  amount: number;
  submittedDate: string;
  status: ApplicationStatus;
  description?: string;
  onView?: () => void;
  className?: string;
}

export function ApplicationCard({
  id,
  applicantName,
  programName,
  amount,
  submittedDate,
  status,
  description,
  onView,
  className,
}: ApplicationCardProps) {
  return (
    <Card className={cn("hover-elevate", className)} data-testid={`card-application-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate" data-testid="text-program-name">
            {programName}
          </h3>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground truncate" data-testid="text-applicant">
              {applicantName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium tabular-nums" data-testid="text-amount">
              ${amount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground text-xs">
              Submitted {submittedDate}
            </span>
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={onView}
          className="w-full"
          data-testid="button-view-details"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

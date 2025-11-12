import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface GrantProgramCardProps {
  id: string;
  name: string;
  description: string;
  budget: number;
  allocated: number;
  applicationCount: number;
  deadline: string;
  isActive: boolean;
  onEdit?: () => void;
  className?: string;
}

export function GrantProgramCard({
  id,
  name,
  description,
  budget,
  allocated,
  applicationCount,
  deadline,
  isActive,
  onEdit,
  className,
}: GrantProgramCardProps) {
  const remaining = budget - allocated;
  const percentUsed = (allocated / budget) * 100;

  return (
    <Card className={cn("hover-elevate", className)} data-testid={`card-program-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate" data-testid="text-program-name">
            {name}
          </h3>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "text-xs font-medium uppercase tracking-wide",
            isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
              : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400 border-gray-200 dark:border-gray-700"
          )}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Budget</span>
            </div>
            <span className="font-medium tabular-nums" data-testid="text-budget">
              ${budget.toLocaleString()}
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Allocated: ${allocated.toLocaleString()}</span>
              <span>{percentUsed.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min(percentUsed, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Remaining: ${remaining.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm pt-2 border-t">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Applications</span>
            </div>
            <span className="font-medium tabular-nums">{applicationCount}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">
              Deadline: {deadline}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="w-full"
          data-testid="button-edit-program"
        >
          Edit Program
        </Button>
      </CardFooter>
    </Card>
  );
}

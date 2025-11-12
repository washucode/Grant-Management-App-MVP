import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GrantProgramCard } from "@/components/GrantProgramCard";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Programs() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //todo: remove mock functionality
  const programs = [
    {
      id: "1",
      name: "Small Business Development",
      description:
        "Support for local entrepreneurs and small business owners looking to expand operations and create jobs.",
      budget: 500000,
      allocated: 350000,
      applicationCount: 42,
      deadline: "2025-01-15",
      isActive: true,
    },
    {
      id: "2",
      name: "Education Innovation Fund",
      description:
        "Funding for innovative educational programs and technology integration in schools.",
      budget: 250000,
      allocated: 180000,
      applicationCount: 28,
      deadline: "2024-12-31",
      isActive: true,
    },
    {
      id: "3",
      name: "Community Health Initiative",
      description:
        "Healthcare access and wellness programs for underserved populations.",
      budget: 400000,
      allocated: 400000,
      applicationCount: 35,
      deadline: "2024-11-30",
      isActive: false,
    },
    {
      id: "4",
      name: "Technology Innovation Grant",
      description:
        "Supporting tech startups and innovation in emerging technologies.",
      budget: 750000,
      allocated: 450000,
      applicationCount: 56,
      deadline: "2025-02-28",
      isActive: true,
    },
    {
      id: "5",
      name: "Arts & Culture Program",
      description:
        "Preserving and promoting local arts, culture, and heritage projects.",
      budget: 150000,
      allocated: 95000,
      applicationCount: 18,
      deadline: "2025-01-31",
      isActive: true,
    },
    {
      id: "6",
      name: "Environmental Conservation",
      description:
        "Projects focused on environmental protection and sustainability.",
      budget: 300000,
      allocated: 220000,
      applicationCount: 24,
      deadline: "2025-03-15",
      isActive: true,
    },
  ];

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Program created");
    setIsDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Grant Programs
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and configure grant programs
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="button-create-program">
              <Plus className="h-4 w-4" />
              Create Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <form onSubmit={handleCreateProgram}>
              <DialogHeader>
                <DialogTitle>Create New Grant Program</DialogTitle>
                <DialogDescription>
                  Set up a new grant program with budget and eligibility
                  criteria
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Program Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Small Business Development"
                    data-testid="input-program-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the program objectives and eligibility..."
                    className="resize-none"
                    rows={3}
                    data-testid="input-program-description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Total Budget</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="500000"
                      data-testid="input-program-budget"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      data-testid="input-program-deadline"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit-program">
                  Create Program
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <GrantProgramCard
            key={program.id}
            {...program}
            onEdit={() => console.log("Edit program", program.id)}
          />
        ))}
      </div>
    </div>
  );
}

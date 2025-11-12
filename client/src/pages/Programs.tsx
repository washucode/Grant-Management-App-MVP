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
import { useQuery, useMutation } from "@tanstack/react-query";
import type { GrantProgram, Application } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertGrantProgramSchema } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = insertGrantProgramSchema.extend({
  budget: z.string().min(1, "Budget is required"),
  deadline: z.string().min(1, "Deadline is required"),
});

export default function Programs() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: programs } = useQuery<GrantProgram[]>({
    queryKey: ["/api/programs"],
  });

  const { data: applications } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      budget: "",
      deadline: "",
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create program");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/programs"] });
      toast({
        title: "Program Created",
        description: "The grant program has been created successfully.",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create program. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    createMutation.mutate(data);
  };

  const programsWithCounts = programs?.map((program) => {
    const applicationCount = applications?.filter(
      (app) => app.programId === program.id
    ).length || 0;

    return {
      id: program.id,
      name: program.name,
      description: program.description,
      budget: parseFloat(program.budget),
      allocated: parseFloat(program.allocated),
      applicationCount,
      deadline: new Date(program.deadline).toISOString().split("T")[0],
      isActive: program.isActive === 1,
    };
  }) || [];

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogHeader>
                  <DialogTitle>Create New Grant Program</DialogTitle>
                  <DialogDescription>
                    Set up a new grant program with budget and eligibility
                    criteria
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Small Business Development"
                            data-testid="input-program-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe the program objectives and eligibility..."
                            className="resize-none"
                            rows={3}
                            data-testid="input-program-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Budget</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="500000"
                              data-testid="input-program-budget"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deadline</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="date"
                              data-testid="input-program-deadline"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  <Button
                    type="submit"
                    disabled={createMutation.isPending}
                    data-testid="button-submit-program"
                  >
                    {createMutation.isPending ? "Creating..." : "Create Program"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {programsWithCounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programsWithCounts.map((program) => (
            <GrantProgramCard
              key={program.id}
              {...program}
              onEdit={() => console.log("Edit program", program.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No grant programs yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first program to get started
          </p>
        </div>
      )}
    </div>
  );
}

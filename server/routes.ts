import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertGrantProgramSchema,
  insertApplicantSchema,
  insertApplicationSchema,
  insertDisbursementSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Grant Programs
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.listGrantPrograms();
      res.json(programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ error: "Failed to fetch programs" });
    }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const program = await storage.getGrantProgram(req.params.id);
      if (!program) {
        return res.status(404).json({ error: "Program not found" });
      }
      res.json(program);
    } catch (error) {
      console.error("Error fetching program:", error);
      res.status(500).json({ error: "Failed to fetch program" });
    }
  });

  app.post("/api/programs", async (req, res) => {
    try {
      const validated = insertGrantProgramSchema.parse(req.body);
      const program = await storage.createGrantProgram(validated);
      res.status(201).json(program);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating program:", error);
      res.status(500).json({ error: "Failed to create program" });
    }
  });

  app.patch("/api/programs/:id", async (req, res) => {
    try {
      const program = await storage.updateGrantProgram(req.params.id, req.body);
      res.json(program);
    } catch (error) {
      console.error("Error updating program:", error);
      res.status(500).json({ error: "Failed to update program" });
    }
  });

  // Applicants
  app.get("/api/applicants", async (req, res) => {
    try {
      const applicants = await storage.listApplicants();
      res.json(applicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
      res.status(500).json({ error: "Failed to fetch applicants" });
    }
  });

  app.get("/api/applicants/:id", async (req, res) => {
    try {
      const applicant = await storage.getApplicant(req.params.id);
      if (!applicant) {
        return res.status(404).json({ error: "Applicant not found" });
      }
      res.json(applicant);
    } catch (error) {
      console.error("Error fetching applicant:", error);
      res.status(500).json({ error: "Failed to fetch applicant" });
    }
  });

  app.post("/api/applicants", async (req, res) => {
    try {
      const validated = insertApplicantSchema.parse(req.body);
      const applicant = await storage.createApplicant(validated);
      res.status(201).json(applicant);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating applicant:", error);
      res.status(500).json({ error: "Failed to create applicant" });
    }
  });

  // Applications
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.listApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.get("/api/applications/:id", async (req, res) => {
    try {
      const application = await storage.getApplication(req.params.id);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(application);
    } catch (error) {
      console.error("Error fetching application:", error);
      res.status(500).json({ error: "Failed to fetch application" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const validated = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validated);
      res.status(201).json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating application:", error);
      res.status(500).json({ error: "Failed to create application" });
    }
  });

  app.patch("/api/applications/:id/status", async (req, res) => {
    try {
      const { status, reviewedBy, reviewNotes } = req.body;
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }
      const application = await storage.updateApplicationStatus(
        req.params.id,
        status,
        reviewedBy,
        reviewNotes
      );
      res.json(application);
    } catch (error) {
      console.error("Error updating application status:", error);
      res.status(500).json({ error: "Failed to update application status" });
    }
  });

  // Timeline
  app.get("/api/applications/:id/timeline", async (req, res) => {
    try {
      const timeline = await storage.getApplicationTimeline(req.params.id);
      res.json(timeline);
    } catch (error) {
      console.error("Error fetching timeline:", error);
      res.status(500).json({ error: "Failed to fetch timeline" });
    }
  });

  // Disbursements
  app.get("/api/applications/:id/disbursements", async (req, res) => {
    try {
      const disbursements = await storage.getDisbursementsByApplication(req.params.id);
      res.json(disbursements);
    } catch (error) {
      console.error("Error fetching disbursements:", error);
      res.status(500).json({ error: "Failed to fetch disbursements" });
    }
  });

  app.post("/api/disbursements", async (req, res) => {
    try {
      const validated = insertDisbursementSchema.parse(req.body);
      const disbursement = await storage.createDisbursement(validated);
      res.status(201).json(disbursement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error("Error creating disbursement:", error);
      res.status(500).json({ error: "Failed to create disbursement" });
    }
  });

  // Dashboard Stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

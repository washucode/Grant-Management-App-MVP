import {
  type Applicant,
  type InsertApplicant,
  type GrantProgram,
  type InsertGrantProgram,
  type Application,
  type InsertApplication,
  type Disbursement,
  type InsertDisbursement,
  type ApplicationTimeline,
  type InsertApplicationTimeline,
  applicants,
  grantPrograms,
  applications,
  disbursements,
  applicationTimeline,
} from "@shared/schema";
import { db } from "../db/index";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Applicants
  createApplicant(applicant: InsertApplicant): Promise<Applicant>;
  getApplicant(id: string): Promise<Applicant | undefined>;
  getApplicantByEmail(email: string): Promise<Applicant | undefined>;
  listApplicants(): Promise<Applicant[]>;

  // Grant Programs
  createGrantProgram(program: InsertGrantProgram): Promise<GrantProgram>;
  getGrantProgram(id: string): Promise<GrantProgram | undefined>;
  listGrantPrograms(): Promise<GrantProgram[]>;
  updateGrantProgram(id: string, program: Partial<InsertGrantProgram>): Promise<GrantProgram>;
  
  // Applications
  createApplication(application: InsertApplication): Promise<Application>;
  getApplication(id: string): Promise<Application | undefined>;
  listApplications(): Promise<Application[]>;
  updateApplicationStatus(
    id: string,
    status: string,
    reviewedBy?: string,
    reviewNotes?: string
  ): Promise<Application>;
  
  // Disbursements
  createDisbursement(disbursement: InsertDisbursement): Promise<Disbursement>;
  getDisbursementsByApplication(applicationId: string): Promise<Disbursement[]>;
  
  // Timeline
  addTimelineEvent(event: InsertApplicationTimeline): Promise<ApplicationTimeline>;
  getApplicationTimeline(applicationId: string): Promise<ApplicationTimeline[]>;
  
  // Stats
  getDashboardStats(): Promise<{
    totalGrants: string;
    totalApplications: number;
    approvedCount: number;
    disbursedAmount: string;
  }>;
}

export class DbStorage implements IStorage {
  // Applicants
  async createApplicant(applicant: InsertApplicant): Promise<Applicant> {
    const [result] = await db.insert(applicants).values(applicant).returning();
    return result;
  }

  async getApplicant(id: string): Promise<Applicant | undefined> {
    const [result] = await db.select().from(applicants).where(eq(applicants.id, id));
    return result;
  }

  async getApplicantByEmail(email: string): Promise<Applicant | undefined> {
    const [result] = await db.select().from(applicants).where(eq(applicants.email, email));
    return result;
  }

  async listApplicants(): Promise<Applicant[]> {
    return db.select().from(applicants).orderBy(desc(applicants.createdAt));
  }

  // Grant Programs
  async createGrantProgram(program: InsertGrantProgram): Promise<GrantProgram> {
    const insertData = {
      ...program,
      budget: String(program.budget),
      deadline: new Date(program.deadline),
      isActive: program.isActive === false ? 0 : 1,
    };
    const [result] = await db.insert(grantPrograms).values(insertData).returning();
    return result;
  }

  async getGrantProgram(id: string): Promise<GrantProgram | undefined> {
    const [result] = await db.select().from(grantPrograms).where(eq(grantPrograms.id, id));
    return result;
  }

  async listGrantPrograms(): Promise<GrantProgram[]> {
    return db.select().from(grantPrograms).orderBy(desc(grantPrograms.createdAt));
  }

  async updateGrantProgram(id: string, program: Partial<InsertGrantProgram>): Promise<GrantProgram> {
    const updateData: any = { ...program };
    if (updateData.budget) updateData.budget = String(updateData.budget);
    if (updateData.deadline) updateData.deadline = new Date(updateData.deadline);
    if (updateData.isActive !== undefined) updateData.isActive = updateData.isActive ? 1 : 0;
    
    const [result] = await db
      .update(grantPrograms)
      .set(updateData)
      .where(eq(grantPrograms.id, id))
      .returning();
    return result;
  }

  // Applications
  async createApplication(application: InsertApplication): Promise<Application> {
    const insertData = {
      ...application,
      amount: String(application.amount),
    };
    const [result] = await db.insert(applications).values(insertData).returning();
    
    // Add timeline event
    await this.addTimelineEvent({
      applicationId: result.id,
      status: "Submitted",
      user: "System",
      comment: "Application submitted for review",
    });
    
    return result;
  }

  async getApplication(id: string): Promise<Application | undefined> {
    const [result] = await db.select().from(applications).where(eq(applications.id, id));
    return result;
  }

  async listApplications(): Promise<Application[]> {
    return db.select().from(applications).orderBy(desc(applications.submittedAt));
  }

  async updateApplicationStatus(
    id: string,
    status: string,
    reviewedBy?: string,
    reviewNotes?: string
  ): Promise<Application> {
    const [result] = await db
      .update(applications)
      .set({
        status,
        reviewedAt: new Date(),
        reviewedBy,
        reviewNotes,
      })
      .where(eq(applications.id, id))
      .returning();
    
    // Add timeline event
    await this.addTimelineEvent({
      applicationId: id,
      status: status.charAt(0).toUpperCase() + status.slice(1),
      user: reviewedBy || "System",
      comment: reviewNotes || `Application status changed to ${status}`,
    });
    
    return result;
  }

  // Disbursements
  async createDisbursement(disbursement: InsertDisbursement): Promise<Disbursement> {
    const insertData = {
      ...disbursement,
      amount: String(disbursement.amount),
      scheduledDate: new Date(disbursement.scheduledDate),
    };
    const [result] = await db.insert(disbursements).values(insertData).returning();
    return result;
  }

  async getDisbursementsByApplication(applicationId: string): Promise<Disbursement[]> {
    return db
      .select()
      .from(disbursements)
      .where(eq(disbursements.applicationId, applicationId))
      .orderBy(desc(disbursements.scheduledDate));
  }

  // Timeline
  async addTimelineEvent(event: InsertApplicationTimeline): Promise<ApplicationTimeline> {
    const [result] = await db.insert(applicationTimeline).values(event).returning();
    return result;
  }

  async getApplicationTimeline(applicationId: string): Promise<ApplicationTimeline[]> {
    return db
      .select()
      .from(applicationTimeline)
      .where(eq(applicationTimeline.applicationId, applicationId))
      .orderBy(desc(applicationTimeline.createdAt));
  }

  // Stats
  async getDashboardStats(): Promise<{
    totalGrants: string;
    totalApplications: number;
    approvedCount: number;
    disbursedAmount: string;
  }> {
    const [grantStats] = await db
      .select({
        total: sql<string>`COALESCE(SUM(${grantPrograms.budget}), 0)`,
      })
      .from(grantPrograms);

    const [appStats] = await db
      .select({
        total: sql<number>`COUNT(*)`,
        approved: sql<number>`COUNT(*) FILTER (WHERE ${applications.status} = 'approved' OR ${applications.status} = 'disbursed' OR ${applications.status} = 'completed')`,
      })
      .from(applications);

    const [disbursedStats] = await db
      .select({
        total: sql<string>`COALESCE(SUM(${disbursements.amount}), 0)`,
      })
      .from(disbursements)
      .where(eq(disbursements.status, "disbursed"));

    return {
      totalGrants: grantStats?.total || "0",
      totalApplications: appStats?.total || 0,
      approvedCount: appStats?.approved || 0,
      disbursedAmount: disbursedStats?.total || "0",
    };
  }
}

export const storage = new DbStorage();

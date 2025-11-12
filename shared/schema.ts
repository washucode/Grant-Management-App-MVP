import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const applicants = pgTable("applicants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  businessName: text("business_name"),
  yearsInBusiness: integer("years_in_business"),
  employees: integer("employees"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertApplicantSchema = createInsertSchema(applicants).omit({
  id: true,
  createdAt: true,
});

export type InsertApplicant = z.infer<typeof insertApplicantSchema>;
export type Applicant = typeof applicants.$inferSelect;

export const grantPrograms = pgTable("grant_programs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  budget: decimal("budget", { precision: 12, scale: 2 }).notNull(),
  allocated: decimal("allocated", { precision: 12, scale: 2 }).notNull().default("0"),
  deadline: timestamp("deadline").notNull(),
  isActive: integer("is_active").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGrantProgramSchema = createInsertSchema(grantPrograms).omit({
  id: true,
  createdAt: true,
  allocated: true,
}).extend({
  budget: z.string().or(z.number()),
  deadline: z.string().or(z.date()),
  isActive: z.number().or(z.boolean()).optional(),
});

export type InsertGrantProgram = z.infer<typeof insertGrantProgramSchema>;
export type GrantProgram = typeof grantPrograms.$inferSelect;

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicantId: varchar("applicant_id").notNull().references(() => applicants.id),
  programId: varchar("program_id").notNull().references(() => grantPrograms.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: text("reviewed_by"),
  reviewNotes: text("review_notes"),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  submittedAt: true,
  reviewedAt: true,
  reviewedBy: true,
  reviewNotes: true,
  status: true,
}).extend({
  amount: z.string().or(z.number()),
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;

export const disbursements = pgTable("disbursements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull().references(() => applications.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  disbursedDate: timestamp("disbursed_date"),
  status: text("status").notNull().default("scheduled"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDisbursementSchema = createInsertSchema(disbursements).omit({
  id: true,
  createdAt: true,
  disbursedDate: true,
}).extend({
  amount: z.string().or(z.number()),
  scheduledDate: z.string().or(z.date()),
});

export type InsertDisbursement = z.infer<typeof insertDisbursementSchema>;
export type Disbursement = typeof disbursements.$inferSelect;

export const applicationTimeline = pgTable("application_timeline", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  applicationId: varchar("application_id").notNull().references(() => applications.id),
  status: text("status").notNull(),
  user: text("user").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertApplicationTimelineSchema = createInsertSchema(applicationTimeline).omit({
  id: true,
  createdAt: true,
});

export type InsertApplicationTimeline = z.infer<typeof insertApplicationTimelineSchema>;
export type ApplicationTimeline = typeof applicationTimeline.$inferSelect;

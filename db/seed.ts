import { db } from "./index";
import { applicants, grantPrograms, applications, applicationTimeline } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  const [applicant1] = await db
    .insert(applicants)
    .values({
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      businessName: "Sweet Delights Bakery",
      yearsInBusiness: 5,
      employees: 8,
    })
    .returning();

  const [applicant2] = await db
    .insert(applicants)
    .values({
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "+1 (555) 234-5678",
      businessName: "TechStart Solutions",
      yearsInBusiness: 2,
      employees: 15,
    })
    .returning();

  const [applicant3] = await db
    .insert(applicants)
    .values({
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      phone: "+1 (555) 345-6789",
      businessName: "Community Health Services",
      yearsInBusiness: 10,
      employees: 45,
    })
    .returning();

  const [program1] = await db
    .insert(grantPrograms)
    .values({
      name: "Small Business Development Grant",
      description: "Support for local entrepreneurs and small business owners looking to expand operations and create jobs.",
      budget: "500000",
      deadline: new Date("2025-01-15"),
      isActive: 1,
    })
    .returning();

  const [program2] = await db
    .insert(grantPrograms)
    .values({
      name: "Education Innovation Fund",
      description: "Funding for innovative educational programs and technology integration in schools.",
      budget: "250000",
      deadline: new Date("2024-12-31"),
      isActive: 1,
    })
    .returning();

  const [program3] = await db
    .insert(grantPrograms)
    .values({
      name: "Community Health Initiative",
      description: "Healthcare access and wellness programs for underserved populations.",
      budget: "400000",
      deadline: new Date("2025-02-28"),
      isActive: 1,
    })
    .returning();

  const [app1] = await db
    .insert(applications)
    .values({
      applicantId: applicant1.id,
      programId: program1.id,
      amount: "50000",
      description: "Requesting funding to expand our local bakery operations, including new equipment purchases, staff training, and facility improvements. This will enable us to serve more customers and create additional jobs in the community.",
      status: "pending",
    })
    .returning();

  await db.insert(applicationTimeline).values({
    applicationId: app1.id,
    status: "Submitted",
    user: "Sarah Johnson",
    comment: "Application submitted for review",
  });

  const [app2] = await db
    .insert(applications)
    .values({
      applicantId: applicant2.id,
      programId: program2.id,
      amount: "75000",
      description: "STEM program development for underserved communities with focus on coding bootcamps and technology access.",
      status: "under_review",
    })
    .returning();

  await db.insert(applicationTimeline).values({
    applicationId: app2.id,
    status: "Submitted",
    user: "Michael Chen",
    comment: "Application submitted for review",
  });

  await db.insert(applicationTimeline).values({
    applicationId: app2.id,
    status: "Under Review",
    user: "Admin User",
    comment: "Application assigned to review committee",
  });

  const [app3] = await db
    .insert(applications)
    .values({
      applicantId: applicant3.id,
      programId: program3.id,
      amount: "100000",
      description: "Mobile health clinic services for rural areas with comprehensive preventive care and health education programs.",
      status: "approved",
      reviewedBy: "Admin User",
      reviewNotes: "Excellent proposal with strong community impact",
      reviewedAt: new Date(),
    })
    .returning();

  await db.insert(applicationTimeline).values({
    applicationId: app3.id,
    status: "Submitted",
    user: "Emily Rodriguez",
    comment: "Application submitted for review",
  });

  await db.insert(applicationTimeline).values({
    applicationId: app3.id,
    status: "Approved",
    user: "Admin User",
    comment: "Excellent proposal with strong community impact",
  });

  console.log("Database seeded successfully!");
  console.log(`Created ${3} applicants`);
  console.log(`Created ${3} grant programs`);
  console.log(`Created ${3} applications`);
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });

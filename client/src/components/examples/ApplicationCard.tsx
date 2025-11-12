import { ApplicationCard } from '../ApplicationCard';

export default function ApplicationCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ApplicationCard
        id="1"
        applicantName="Sarah Johnson"
        programName="Small Business Development Grant"
        amount={50000}
        submittedDate="2024-11-05"
        status="pending"
        description="Funding request for expanding local bakery operations and equipment upgrades."
        onView={() => console.log('View clicked')}
      />
      <ApplicationCard
        id="2"
        applicantName="Michael Chen"
        programName="Education Innovation Fund"
        amount={25000}
        submittedDate="2024-11-08"
        status="under_review"
        description="STEM program development for underserved communities."
        onView={() => console.log('View clicked')}
      />
      <ApplicationCard
        id="3"
        applicantName="Emily Rodriguez"
        programName="Community Health Initiative"
        amount={75000}
        submittedDate="2024-11-01"
        status="approved"
        description="Mobile health clinic services for rural areas."
        onView={() => console.log('View clicked')}
      />
    </div>
  );
}

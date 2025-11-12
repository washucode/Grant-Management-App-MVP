import { GrantProgramCard } from '../GrantProgramCard';

export default function GrantProgramCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GrantProgramCard
        id="1"
        name="Small Business Development"
        description="Support for local entrepreneurs and small business owners looking to expand operations."
        budget={500000}
        allocated={350000}
        applicationCount={42}
        deadline="2025-01-15"
        isActive={true}
        onEdit={() => console.log('Edit clicked')}
      />
      <GrantProgramCard
        id="2"
        name="Education Innovation Fund"
        description="Funding for innovative educational programs and technology integration."
        budget={250000}
        allocated={180000}
        applicationCount={28}
        deadline="2024-12-31"
        isActive={true}
        onEdit={() => console.log('Edit clicked')}
      />
      <GrantProgramCard
        id="3"
        name="Community Health Initiative"
        description="Healthcare access and wellness programs for underserved populations."
        budget={400000}
        allocated={400000}
        applicationCount={35}
        deadline="2024-11-30"
        isActive={false}
        onEdit={() => console.log('Edit clicked')}
      />
    </div>
  );
}

import { StatsCard } from '../StatsCard';
import { DollarSign } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Grants"
        value="$2.4M"
        icon={DollarSign}
        trend={{ value: 12, label: "from last month" }}
      />
      <StatsCard
        title="Applications"
        value="156"
        icon={DollarSign}
        trend={{ value: -3, label: "from last month" }}
      />
    </div>
  );
}

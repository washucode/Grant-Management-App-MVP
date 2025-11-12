import { StatusBadge } from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="pending" />
      <StatusBadge status="under_review" />
      <StatusBadge status="approved" />
      <StatusBadge status="rejected" />
      <StatusBadge status="disbursed" />
      <StatusBadge status="completed" />
    </div>
  );
}

// StatisticIcon.tsx
import { getIcon } from "./statistics.util";

interface StatisticIconProps {
  id: number;
}

export function StatisticIcon({ id }: StatisticIconProps) {
  const Icon = getIcon(id);
  return <Icon />;
}

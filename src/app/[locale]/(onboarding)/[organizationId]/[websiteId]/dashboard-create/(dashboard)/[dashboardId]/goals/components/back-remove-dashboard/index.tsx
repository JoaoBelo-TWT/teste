'use client';

import { BackButton } from '@/components/navigation/back-button';
import { useRemoveDashboard } from '@/hooks/use-remove-dashboard';

export function BackRemoveDashboardButton({ dashboardId }: { dashboardId: string }) {
  const removeDashboard = useRemoveDashboard();

  const handleRemoveDashboard = async () => {
    await removeDashboard(dashboardId);
  };

  return <BackButton extraOnClickAction={handleRemoveDashboard} />;
}

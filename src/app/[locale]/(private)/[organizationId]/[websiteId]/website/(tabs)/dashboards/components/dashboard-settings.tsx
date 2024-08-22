import { Dashboard } from '@/__generated__/graphql';
import { DashboardDeleteSettings } from '@/components/sections/dashboard-delete-settings';
import { DashboardFunnelSettings } from '@/components/sections/dashboard-funnel-settings';
import { DashboardGoalsSettings } from '@/components/sections/dashboard-goals-settings';
import { DashboardNameSettings } from '@/components/sections/dashboard-name-settings';

export default function DashboardsSettings({
  organizationId,
  dashboard,
  viewOnly
}: {
  organizationId: string;
  dashboard: Dashboard;
  viewOnly?: boolean;
}) {
  return (
    <>
      <DashboardNameSettings dashboardId={dashboard.id} dashboardName={dashboard.name} viewOnly={viewOnly} />
      <DashboardGoalsSettings dashboardId={dashboard.id} viewOnly={viewOnly} />
      <DashboardFunnelSettings
        organizationId={organizationId}
        websiteId={dashboard.websiteId}
        dashboardId={dashboard.id}
        viewOnly={viewOnly}
      />
      {!viewOnly && <DashboardDeleteSettings dashboardId={dashboard.id} />}
    </>
  );
}

import { AccessLevel } from '@/__generated__/graphql';
import { Tabs } from '@/components/ui/tabs';
import TopBarWrapper from '@/components/wrappers/top-bar';
import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { getQueryDashboards } from '@/lib/react-query/dashboard/get-query-dashboards';

import { DashboardPathParams } from '../types';

import DashboardFilters from './components/dashboard-filters';
import DashboardsTabs from './components/dashboards-tabs';

export default async function Page({ params }: Readonly<{ params: DashboardPathParams }>) {
  const { dashboardId, websiteId, organizationId } = params;

  // Parallelizing the data fetching
  const [dashboardsData, userLevel] = await Promise.all([
    getQueryDashboards(websiteId),
    useUserAccessLevel({ organizationId })
  ]);

  return (
    <TopBarWrapper endContent={<DashboardFilters />}>
      {dashboardsData?.dashboards?.edges && (
        <Tabs value={dashboardId} variant="header">
          <DashboardsTabs
            organizationId={organizationId}
            websiteId={websiteId}
            dashboardId={dashboardId}
            isAdmin={userLevel === AccessLevel.Admin}
            dashboards={dashboardsData?.dashboards?.edges}
          />
        </Tabs>
      )}
    </TopBarWrapper>
  );
}

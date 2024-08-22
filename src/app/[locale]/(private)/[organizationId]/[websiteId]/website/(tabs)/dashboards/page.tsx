import { redirect } from 'next/navigation';

import { AccessLevel } from '@/__generated__/graphql';
import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { fetchDashboardsData } from '@/lib/fetch-dashboards-data';
import { routes } from '@/routes/routes';

import WebsiteDashboardsSettings from './components/dashboards-settings-accordion';

export default async function WebsiteDashboardsPage({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string; dashboardId: string } }>) {
  const dashboardsData = await fetchDashboardsData(params.websiteId);
  const currentUserAccessLevel = (await useUserAccessLevel({ organizationId: params.organizationId })) as AccessLevel;

  if (dashboardsData?.dashboards?.edges && dashboardsData?.dashboards?.edges?.length <= 0) {
    redirect(routes.dashboard.new.path(params.organizationId, params.websiteId));
  }

  return (
    dashboardsData && (
      <WebsiteDashboardsSettings
        organizationId={params.organizationId}
        websiteId={params.websiteId}
        dashboardsData={dashboardsData}
        accessLevel={currentUserAccessLevel}
      />
    )
  );
}

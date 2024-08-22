import { getTranslations } from 'next-intl/server';

import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { FunnelStagesList } from '@/components/lists/funnel-stages-list';
import { AllSetCard } from '@/components/ui/all-set-card';
import { ConnectedSourceItem } from '@/components/ui/connected-source-item';
import { LeftRightWrapper } from '@/components/wrappers/left-right';
import { fetchFunnelStages } from '@/lib/fetch-funnel-stages';
import { fetchWebsiteData } from '@/lib/fetch-website-data';
import { routes } from '@/routes/routes';
import { OnboardingQueryParamsProps } from '@/types/constants/onboarding-query-params';

export default async function CreateStagesAllSetPage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string };
  searchParams: OnboardingQueryParamsProps;
}>) {
  const { flow } = searchParams;
  const data = await fetchFunnelStages(params.dashboardId);
  const t = await getTranslations();
  const websiteData = await fetchWebsiteData(params.websiteId);

  const connectedToCRM =
    websiteData?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active ||
    websiteData?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active;

  const viewOnly = connectedToCRM || (data?.customerFunnelStages.edges && data?.customerFunnelStages.edges.length <= 0);

  return (
    <LeftRightWrapper
      leftContent={
        <AllSetCard
          href={routes.dashboard.dashboard.path(params.organizationId, params.websiteId, params.dashboardId)}
          buttonText={t('common.goToDashboard')}
        />
      }
      rightContent={
        <>
          <ConnectedSourceItem
            isOnboarding
            websiteId={params.websiteId}
            dashboardId={params.dashboardId}
            organizationId={params.organizationId}
          />
          <FunnelStagesList
            viewOnly={viewOnly}
            dashboardId={params.dashboardId}
            websiteId={params.websiteId}
            organizationId={params.organizationId}
            funnelStages={data}
            flow={flow}
          />
        </>
      }
    />
  );
}

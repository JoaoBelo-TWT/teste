import { Box, Text } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { HubspotIntegrationStatus, SalesforceIntegrationStatus } from '@/__generated__/graphql';
import { FunnelStagesList } from '@/components/lists/funnel-stages-list';
import { ConnectedSourceItem } from '@/components/ui/connected-source-item';
import { fetchFunnelStages } from '@/lib/fetch-funnel-stages';
import { getQueryWebsite } from '@/lib/react-query/website/query-website';
import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export async function DashboardFunnelSettings({
  websiteId,
  dashboardId,
  organizationId,
  viewOnly
}: {
  websiteId: string;
  dashboardId: string;
  organizationId: string;
  viewOnly?: boolean;
}) {
  const t = await getTranslations();
  const data = await fetchFunnelStages(dashboardId);
  const websiteData = await getQueryWebsite(websiteId);

  const funnelsFromCRM =
    websiteData?.website.hubspotIntegrationStatus === HubspotIntegrationStatus.Active ||
    websiteData?.website.salesforceIntegrationStatus === SalesforceIntegrationStatus.Active;

  const viewOnlyList =
    funnelsFromCRM || (data?.customerFunnelStages.edges && data?.customerFunnelStages.edges.length <= 0) || viewOnly;

  return (
    <Box className={classes['dashboard-funnel-settings']}>
      <Text fw={500}>{t('common.customerFunnel')}</Text>
      <Text maw={500} c="dark.7" className={classes['dashboard-funnel-settings__description']}>
        {t('onboarding.funnels.text1')}
      </Text>
      <Box mb={SPACING.xl}>
        <ConnectedSourceItem
          organizationId={organizationId}
          isOnboarding={false}
          websiteId={websiteId}
          dashboardId={dashboardId}
          label={t('onboarding.selectSource.selectedSourceSimple')}
        />
        <FunnelStagesList
          viewOnly={viewOnlyList}
          dashboardId={dashboardId}
          funnelStages={data}
          isOnboarding={false}
          useModalsToEdit
        />
      </Box>
    </Box>
  );
}

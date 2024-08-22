'use client';

import { useSuspenseQuery } from '@apollo/client';
import { useMemo, useEffect } from 'react';

import { GetDashboardCampaignsQuery } from '@/__generated__/graphql';
import TabsWithPagination from '@/components/ui/tabs-with-pagination';
import { useNavigationStore } from '@/context/navigation/store';
import { getDashboardCampaignsQuery } from '@/lib/apollo/queries/dashboard-campaigns';
import { routes } from '@/routes/routes';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';

export default function CampaignTabsClient({
  campaignsServer,
  params
}: Readonly<{
  campaignsServer: GetDashboardCampaignsQuery;
  params: { organizationId: string; websiteId: string; dashboardId: string };
  preserveQueryParams?: string[];
}>) {
  const { filters, triggers, setFilters } = useNavigationStore();

  const { data: dashboardCampaignsDataClient, fetchMore } = useSuspenseQuery(getDashboardCampaignsQuery, {
    variables: {
      dashboardId: params.dashboardId,
      dashboardTimeframe: filters.timeframe,
      status: filters.campaignStatus,
      sorting: filters.campaignSorting,
      take: filters.campaignCards || 4,
      timeframe: filters.timeframe
    },
    skip: !triggers.campaigns
  });

  const dashboardCampaigns = useMemo(
    () => dashboardCampaignsDataClient?.dashboardCampaignsList ?? campaignsServer?.dashboardCampaignsList,
    [dashboardCampaignsDataClient?.dashboardCampaignsList, campaignsServer]
  );

  const tabs = useMemo(
    () =>
      dashboardCampaigns.campaigns.map((item) => ({
        label: item.name,
        href: routes.dashboard.campaignPerformance.path(
          params.organizationId,
          params.websiteId,
          params.dashboardId,
          item.name,
          filters.timeframe
        )
      })),
    [dashboardCampaigns.campaigns, params.organizationId, params.websiteId, params.dashboardId, filters.timeframe]
  );

  useEffect(() => {
    fetchMore({
      variables: {
        take: filters.campaignCards
      }
    });
  }, [filters.campaignCards, fetchMore]);

  const getMoreCampaigns = () => {
    setFilters({
      [DashboardQueryParams.campaignCards.key]: +filters.campaignCards + DashboardQueryParams.campaignCards.default
    });
  };

  return (
    <TabsWithPagination
      // eslint-disable-next-line i18next/no-literal-string
      preserveQueryParams={['timeframe']}
      tabsPerPage={4}
      tabs={tabs}
      onClickLoadMoreTabs={getMoreCampaigns}
      truncateText
    />
  );
}

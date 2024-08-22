import { getTranslations } from 'next-intl/server';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { CampaignStatus } from '@/components/ui/campaign-status';
import { getCurrentPagination } from '@/components/ui/table/utils';
import { getClient } from '@/lib/apollo/apollo-client';
import { getCampaignPerformanceDeepDiveOverviewQuery } from '@/lib/apollo/queries/campaign-performance-deep-dive';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { DeepDiveSort } from '../components/deep-dive-sort-dropdown/types';

import { CampaignDetailsTable } from './components/campaign-details-table';
import CampaignStatsList from './components/campaign-stats-list';

export default async function CampaignPerformancePage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string };
  searchParams: {
    pageSize: number;
    pageIndex: number;
    sort: DeepDiveSort;
    campaignName: string;
    timeframe: DashboardTimeframe;
  };
}>) {
  const t = await getTranslations();

  const { pageIndex, pageSize, timeframe, campaignName } = searchParams;
  const { dashboardId } = params;
  const pagination = getCurrentPagination({
    pageSize,
    pageIndex
  });

  if (!campaignName) {
    // eslint-disable-next-line i18next/no-literal-string
    throw new Error('no campaign name available');
  }

  const { data } = await getClient().query({
    query: getCampaignPerformanceDeepDiveOverviewQuery,
    variables: {
      dashboardId,
      dashboardTimeframe: timeframe || DashboardTimeframe.LastDay,
      campaignName,
      isFromCache: true,
      take: pagination.query.take,
      skip: pagination.query.skip
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.campaignPerformanceDeepDiveOverviewQuery]
        }
      }
    }
  });
  return (
    <>
      <BaseCard
        topContent={
          <Breadcrumbs
            items={[
              {
                label: t('website.dashboards.title'),
                href: routes.dashboard.dashboard.path(params.organizationId, params.websiteId, params.dashboardId)
              },
              {
                label: t('dashboard.overview.campaignsCard.title'),
                href: `${routes.dashboard.dashboard.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId
                )}#campaign-performance`
              },
              {
                label: campaignName,
                href: routes.dashboard.campaignPerformance.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId,
                  campaignName,
                  timeframe
                )
              }
            ]}
          />
        }
        paperProps={{ h: 'auto', mb: SPACING.sm }}
        headerProps={{
          title: campaignName
          // children: <DeepDiveSortDropdown sort={sort} />
        }}
      >
        <CampaignStatus mt={SPACING.md} status={t('website.connections.table.status.ACTIVE')} />
        <CampaignStatsList
          styleProps={{ mt: SPACING.lg }}
          currency="USD"
          data={data.campaignPerformanceDeepDiveOverview}
        />
        <CampaignDetailsTable data={data.campaignPerformanceDeepDiveOverview} pagination={pagination.info} />
      </BaseCard>
    </>
  );
}

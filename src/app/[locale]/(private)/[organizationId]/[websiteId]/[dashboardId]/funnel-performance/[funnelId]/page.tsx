import { getTranslations } from 'next-intl/server';

import { DashboardTimeframe, FunnelPerformanceSorting } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { StatsList } from '@/components/ui/stats-list';
import { getCurrentPagination } from '@/components/ui/table/utils';
import { getClient } from '@/lib/apollo/apollo-client';
import { getFunnelPerformanceDeepDiveQuery } from '@/lib/apollo/queries/funnel-performance-deep-dive';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { DeepDiveSortDropdown } from '../../components/deep-dive-sort-dropdown';
import { DeepDiveSort } from '../../components/deep-dive-sort-dropdown/types';

import { FunnelDetailsTable } from './components/funnel-details-table';

export default async function FunnelPerformancePage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string; funnelId: string };
  searchParams: {
    timeframe: DashboardTimeframe.ThisMonth;
    pageSize: number;
    pageIndex: number;
    sort: DeepDiveSort.MostConversions;
  };
}>) {
  const t = await getTranslations();
  const { dashboardId, funnelId } = params;

  const { pageIndex, pageSize, sort, timeframe } = searchParams;
  const currentPagination = getCurrentPagination({ pageSize, pageIndex });

  const currentSort = sort || DeepDiveSort.MostConversions;
  const { data } = await getClient().query({
    query: getFunnelPerformanceDeepDiveQuery,
    variables: {
      dashboardId,
      customerFunnelId: funnelId,
      dashboardTimeframe: timeframe || DashboardTimeframe.LastDay,
      isFromCache: true,
      take: currentPagination.query.take,
      skip: currentPagination.query.skip,
      funnelPerformanceSorting: currentSort as unknown as FunnelPerformanceSorting
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.funnelPerformanceDeepDiveQuery]
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
                label: t('dashboard.overview.customerJourneyCard.title'),
                href: `${routes.dashboard.dashboard.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId
                )}#funnel-performance`
              },
              {
                label: data.funnelPerformanceDeepDive.funnelName,
                href: routes.dashboard.funnelPerformance.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId,
                  funnelId,
                  timeframe
                )
              }
            ]}
          />
        }
        paperProps={{ h: 'auto', mb: SPACING.sm }}
        headerProps={{
          title: data.funnelPerformanceDeepDive.funnelName,
          // eslint-disable-next-line i18next/no-literal-string
          children: <DeepDiveSortDropdown sort={currentSort} useQueryParam="sort" />
        }}
      >
        <StatsList
          colProps={{ style: { flexGrow: 0 } }}
          mt={SPACING.lg}
          list={[
            {
              label: t('common.events'),
              value: data.funnelPerformanceDeepDive.totalEvents
            },
            {
              label: t('common.conversions'),
              value: data.funnelPerformanceDeepDive.totalConversions
            }
          ]}
        />
        <FunnelDetailsTable
          params={params}
          data={data.funnelPerformanceDeepDive}
          pagination={currentPagination.info}
          funnelName={data.funnelPerformanceDeepDive.funnelName}
        />
      </BaseCard>
    </>
  );
}

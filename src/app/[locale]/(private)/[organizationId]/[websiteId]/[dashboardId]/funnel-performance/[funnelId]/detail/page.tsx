import { getTranslations } from 'next-intl/server';

import { DashboardTimeframe } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { StatsList } from '@/components/ui/stats-list';
import { getCurrentPagination } from '@/components/ui/table/utils';
import { getClient } from '@/lib/apollo/apollo-client';
/* eslint-disable-next-line max-len */
import { getFunnelPerformanceDeepDiveConversionDetailsQuery } from '@/lib/apollo/queries/funnel-performance-conversions';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { beautifyUrl } from '@/utils/formatters/beutify-url';

import { DeepDiveSortDropdown } from '../../../components/deep-dive-sort-dropdown';
import { DeepDiveSort } from '../../../components/deep-dive-sort-dropdown/types';
import { SourceDetailsTable } from '../../../components/source-details-table';

export default async function FunnelPerformancePage({
  params,
  searchParams
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string; funnelId: string; sourceId: string };
  searchParams: {
    timeframe: DashboardTimeframe;
    pageSize: number;
    pageIndex: number;
    sort: DeepDiveSort.MostConversions;
    firstPageVisited: string;
    sourceUrl: string;
  };
}>) {
  const t = await getTranslations();
  const { dashboardId, funnelId } = params;

  const { pageIndex, pageSize, sort, firstPageVisited, sourceUrl, timeframe } = searchParams;
  const currentPagination = getCurrentPagination({ pageSize, pageIndex });

  // sourceUrl is always valid, this check its to fix the types for the breadcrumb label that don't accept null
  const defaultDetail = beautifyUrl(sourceUrl) ?? '';

  const currentSort = sort || DeepDiveSort.MostConversions;
  const { data } = await getClient().query({
    query: getFunnelPerformanceDeepDiveConversionDetailsQuery,
    variables: {
      dashboardId,
      firstPageVisited,
      sourceUrl,
      dashboardTimeframe: timeframe,
      customerFunnelId: funnelId,
      take: currentPagination.query.take,
      skip: currentPagination.query.skip
      // funnelPerformanceSorting: currentSort as unknown as FunnelPerformanceSorting
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
                label: data.funnelPerformanceDeepDiveConversionDetails.funnelName,
                href: routes.dashboard.funnelPerformance.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId,
                  funnelId,
                  timeframe
                )
              },
              {
                label: defaultDetail,
                href: routes.dashboard.funnelSourcePerformance.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId,
                  funnelId,
                  sourceUrl,
                  firstPageVisited,
                  timeframe
                )
              }
            ]}
          />
        }
        paperProps={{ h: 'auto', mb: SPACING.sm }}
        headerProps={{
          title: (
            <Breadcrumbs
              mt={18}
              variant="large"
              items={[
                {
                  label: data.funnelPerformanceDeepDiveConversionDetails.funnelName,
                  href: routes.dashboard.funnelPerformance.path(
                    params.organizationId,
                    params.websiteId,
                    params.dashboardId,
                    funnelId,
                    timeframe
                  )
                },
                {
                  label: defaultDetail,
                  href: routes.dashboard.funnelSourcePerformance.path(
                    params.organizationId,
                    params.websiteId,
                    params.dashboardId,
                    funnelId,
                    sourceUrl,
                    firstPageVisited,
                    timeframe
                  )
                }
              ]}
            />
          ),
          /* eslint-disable-next-line i18next/no-literal-string */
          children: <DeepDiveSortDropdown sort={currentSort} useQueryParam="sort" />
        }}
      >
        <StatsList
          colProps={{ style: { flexGrow: 0 } }}
          style={{ whiteSpace: 'nowrap' }}
          mt={SPACING.lg}
          list={[
            {
              label: `${data.funnelPerformanceDeepDiveConversionDetails.funnelName} ${t('common.contacts')}`,
              value: data.funnelPerformanceDeepDiveConversionDetails.totalFunnelPerformanceConversionEvents
            },
            {
              label: t('website.detail.search'),
              value: data.funnelPerformanceDeepDiveConversionDetails.totalSearchTerms
            }
          ]}
        />

        <SourceDetailsTable
          data={data.funnelPerformanceDeepDiveConversionDetails}
          pagination={currentPagination.info}
        />
      </BaseCard>
    </>
  );
}

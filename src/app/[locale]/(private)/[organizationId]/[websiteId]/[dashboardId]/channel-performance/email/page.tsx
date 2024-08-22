import { getTranslations } from 'next-intl/server';

import { ChannelFiltersDashboardEnum, DashboardTimeframe } from '@/__generated__/graphql';
import { BaseCard } from '@/components/ui/base-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getCurrentPagination } from '@/components/ui/table/utils';
// eslint-disable-next-line max-len
import { fetchChannelPerformanceDeepDiveActivityDetails } from '@/lib/fetch-channel-performance-deep-dive-activity-details';
import { fetchChannelPerformanceDeepDiveOverview } from '@/lib/fetch-channel-performance-deep-dive-overview';
import { SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import BarChart from '../../components/bar-chart';
import DeepDiveStatsList from '../../components/deep-dive-stats-list';
import { DetailsTable } from '../../components/details-table';
import { DetailPage } from '../../components/details-table/types';
import { SearchParams } from '../types';

export default async function EmailStatisticsPage({
  params,
  searchParams = { timeframe: DashboardTimeframe.LastDay }
}: Readonly<{
  params: { organizationId: string; websiteId: string; dashboardId: string; dashboardTimeframe?: DashboardTimeframe };
  searchParams: SearchParams;
}>) {
  const { activityPageIndex, activityPageSize, timeframe } = searchParams;
  const currentPagination = getCurrentPagination({ pageIndex: activityPageIndex, pageSize: activityPageSize });

  const [t, channelPerformanceDeepDive, channelPerformanceDeepDiveActivityDetails] = await Promise.all([
    getTranslations(),
    fetchChannelPerformanceDeepDiveOverview(params.dashboardId, ChannelFiltersDashboardEnum.Email, timeframe),
    fetchChannelPerformanceDeepDiveActivityDetails(
      params.dashboardId,
      ChannelFiltersDashboardEnum.Email,
      timeframe,
      currentPagination.query
    )
  ]);

  // const channelPerformanceDeepDiveCampaigns = await fetchChannelPerformanceDeepDiveCampaigns(
  //   params.dashboardId,
  //   ChannelFiltersDashboardEnum.Social,
  //   searchParams.dashboardTimeframe
  // );

  return (
    <>
      <BaseCard
        /* eslint-disable i18next/no-literal-string */
        paperProps={{ h: 'auto', mb: SPACING.sm }}
        headerProps={{
          title: t('general.channels.email')
        }}
        topContent={
          <Breadcrumbs
            items={[
              {
                label: t('website.dashboards.title'),
                href: routes.dashboard.dashboard.path(params.organizationId, params.websiteId, params.dashboardId)
              },
              {
                label: t('dashboard.overview.performanceCard.title'),
                href: `${routes.dashboard.dashboard.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId
                )}#channel-performance`
              },
              {
                label: t('general.channels.email'),
                href: routes.dashboard.channelPerformance.email.path(
                  params.organizationId,
                  params.websiteId,
                  params.dashboardId
                )
              }
            ]}
          />
        }
      >
        <DeepDiveStatsList
          spend={channelPerformanceDeepDive?.channelPerformanceDeepDiveOverview.spend}
          costPerFunnel={
            channelPerformanceDeepDive
              ? channelPerformanceDeepDive.channelPerformanceDeepDiveOverview.customerFunnelsOverView.map((item) => ({
                  name: item.name,
                  costPer: item.costPer
                }))
              : []
          }
          currency={channelPerformanceDeepDive?.channelPerformanceDeepDiveOverview.currency || 'USD'}
          styleProps={{ mt: SPACING.lg, mb: SPACING.lg }}
        />
        <BarChart
          data={
            channelPerformanceDeepDive
              ? channelPerformanceDeepDive.channelPerformanceDeepDiveOverview.customerFunnelsOverView
              : []
          }
        />
      </BaseCard>
      {/* <BaseCard
        paperProps={{ h: 'auto', mb: SPACING.sm }}
        headerProps={{
          title: t('website.activity.campaigns')
        }}
      >
        <DetailSources
          sources={
            channelPerformanceDeepDiveCampaigns?.channelPerformanceDeepDiveCampaigns.campaigns?.map((campaign) => ({
              urlSourcesImages: [],
              title: campaign.name,
              data: campaign.customerFunnels.map((funnel) => ({ label: funnel.name, value: funnel.count.toString() }))
            })) || []
          }
        />
      </BaseCard> */}
      <DetailsTable
        variant={DetailPage.EMAIL}
        pagination={currentPagination.info}
        data={channelPerformanceDeepDiveActivityDetails}
      />
    </>
  );
}

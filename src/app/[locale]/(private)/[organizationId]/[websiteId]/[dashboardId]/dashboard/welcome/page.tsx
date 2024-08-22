import { getClient } from '@/lib/apollo/apollo-client';
import { getDashboardOverviewQuery } from '@/lib/apollo/queries/dashboard-overview';
import { fetchMeData } from '@/lib/fetch-me-data';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { DashboardPathParams } from '../types';

import { WelcomeCard } from './components/welcome-card';

export default async function Page({
  params
}: Readonly<{
  params: DashboardPathParams;
}>) {
  const { dashboardId } = params;

  const [user, dashboardOverviewResponse] = await Promise.all([
    fetchMeData(),
    getClient().query({
      query: getDashboardOverviewQuery,
      variables: {
        dashboardId,
        dashboardTimeframe: DashboardQueryParams.timeframe.default
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardOverviewQuery]
          }
        }
      }
    })
  ]);

  const dashboardOverviewData = dashboardOverviewResponse?.data;

  return <WelcomeCard name={user.me?.firstName ?? ''} dashboardOverview={dashboardOverviewData?.dashboardOverview} />;
}

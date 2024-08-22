import { getClient } from '@/lib/apollo/apollo-client';
import { getDashboardWebsiteActivityQuery } from '@/lib/apollo/queries/dashboard-website-activity';
import { DashboardQueryParams } from '@/types/constants/dashboard-query-params';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { DashboardPathParams } from '../types';

import WebSiteActivity from './components/website-activity';

export default async function Page({
  params
}: Readonly<{
  params: DashboardPathParams;
}>) {
  const { dashboardId } = params;

  const { data: dashboardWebsiteActivityData } = await getClient().query({
    query: getDashboardWebsiteActivityQuery,
    variables: {
      dashboardId,
      dashboardTimeframe: DashboardQueryParams.timeframe.default,
      pageViewsSorting: DashboardQueryParams.pagesSorting.default,
      take: 5
    },
    context: {
      fetchOptions: {
        next: {
          tags: [nextCacheTags.dashboardWebsiteActivityQuery]
        }
      }
    }
  });

  return <WebSiteActivity dashboardWebsiteActivityData={dashboardWebsiteActivityData?.dashboardWebsiteActivity} />;
}

// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { DashboardTimeframe, PageViewsSorting } from '@/__generated__/graphql';
import { getDashboardWebsiteActivityQuery } from '@/lib/apollo/queries/dashboard-website-activity';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

interface Props {
  dashboardId: string;
  dashboardTimeframe: DashboardTimeframe;
  pageViewsSorting: PageViewsSorting;
  take: number;
}
function run(params: Props) {
  return graphQLClient.request(getDashboardWebsiteActivityQuery, params);
}

export function useQueryWebsitePerformance(params: Props) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.websitePerformance(
      params.dashboardId,
      params.dashboardTimeframe,
      params.pageViewsSorting,
      params.take
    ),
    queryFn: () => run(params)
  });
}

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { CampaignSorting, CampaignStatusInput, DashboardTimeframe } from '@/__generated__/graphql';
import { getDashboardCampaignsQuery } from '@/lib/apollo/queries/dashboard-campaigns';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

export type PartialDashboardQueryParamsAlt = {
  dashboardId: string;
  take: number;
  skip?: number;
  sorting: CampaignSorting;
  status: CampaignStatusInput;
  dashboardTimeframe: DashboardTimeframe;
};

function run(params: PartialDashboardQueryParamsAlt, skip: number) {
  return graphQLClient.request(getDashboardCampaignsQuery, { ...params, skip });
}

export function useQueryPaginatedCampaigns(params: PartialDashboardQueryParamsAlt) {
  return useSuspenseInfiniteQuery({
    queryKey: dashboardKeys.campaignPaginated(
      params.dashboardId,
      params.dashboardTimeframe,
      params.status,
      params.sorting,
      params.take
    ),
    queryFn: ({ pageParam = 0 }) => run(params, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const hasMorePages = lastPage.dashboardCampaignsList.totalCampaigns > pages.length * params.take;
      const nextPage = hasMorePages ? pages.length * params.take : undefined;
      return nextPage;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.flat()
    }),
    initialPageParam: 1
  });
}

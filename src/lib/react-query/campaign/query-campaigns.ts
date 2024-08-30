// eslint-disable-next-line import/no-extraneous-dependencies

import { CampaignSorting, CampaignStatusInput, DashboardTimeframe } from '@/__generated__/graphql';
import { getDashboardCampaignsQuery } from '@/lib/apollo/queries/dashboard-campaigns';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

interface Props {
  dashboardId: string;
  dashboardTimeframe: DashboardTimeframe;
  sorting: CampaignSorting;
  status: CampaignStatusInput;
  take: number;
}
function run(params: Props) {
  return graphQLClient.request(getDashboardCampaignsQuery, params);
}

const options = (params: Props) => ({
  queryKey: dashboardKeys.campaignPaginated(
    params.dashboardId,
    params.dashboardTimeframe,
    params.status,
    params.sorting,
    params.take
  ),
  queryFn: () => run(params),
  staleTime: () => Infinity
});

export async function getQueryCampaigns(params: Props) {
  return getQueryClient().fetchQuery(options(params));
}

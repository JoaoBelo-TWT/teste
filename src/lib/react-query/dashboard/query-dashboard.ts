import { getDashboardQuery } from '@/lib/apollo/queries/dashboard';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(dashboardId: string) {
  return graphQLClient.request(getDashboardQuery, {
    dashboardId
  });
}

export async function getQueryDashboard(dashboardId: string) {
  return getQueryClient().fetchQuery({
    queryKey: dashboardKeys.single(dashboardId),
    queryFn: () => run(dashboardId)
  });
}

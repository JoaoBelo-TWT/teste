import { SortingOrder } from '@/__generated__/graphql';
import { getDashboardsQuery } from '@/lib/apollo/queries/dashboards';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(websiteId?: string, additionalParams = {}) {
  return graphQLClient.request(getDashboardsQuery, {
    first: 100,
    sorting: {
      field: 'createdAt',
      order: SortingOrder.Asc
    },
    filters: {
      websiteId: {
        eq: websiteId
      },
      ...additionalParams // Merge additional params
    }
  });
}

export async function getQueryDashboards(websiteId?: string, additionalParams = {}) {
  return getQueryClient().fetchQuery({
    queryKey: dashboardKeys.all,
    queryFn: () => run(websiteId, additionalParams),
    staleTime: () => Infinity
  });
}

import { SortingOrder } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { getDashboardsQuery } from '@/lib/apollo/queries/dashboards';

export const fetchDashboardsData = async (websiteId?: string, additionalParams = {}) => {
  try {
    const { data: dashboardsData } = await getClient().query({
      query: getDashboardsQuery,
      variables: {
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
      }
    });

    return dashboardsData;
  } catch (error) {
    return null;
  }
};

import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getDashboardBudgetQuery } from '../apollo/queries/dashboard-budget-goal';

export const fetchBudgetGoal = async (dashboardId: string) => {
  try {
    const { data: budgetGoalData } = await getClient().query({
      query: getDashboardBudgetQuery,
      variables: {
        dashboardId,
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardsQuery]
          }
        }
      }
    });

    return budgetGoalData;
  } catch (error) {
    return null;
  }
};

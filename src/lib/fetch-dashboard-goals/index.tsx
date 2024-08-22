import { GetOnboardingGoalsQuery } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { getOnboardingGoalsQuery } from '../apollo/queries/onboarding-goals';

export const fetchDashboardGoals = async (dashboardId: string) => {
  try {
    const { data: dashboardGoals } = await getClient().query<GetOnboardingGoalsQuery>({
      query: getOnboardingGoalsQuery,
      variables: {
        dashboardId
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.onboarding.goalsQuery]
          }
        }
      }
    });

    return dashboardGoals;
  } catch (error) {
    return null;
  }
};

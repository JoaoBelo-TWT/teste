// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getOnboardingGoalsQuery } from '@/lib/apollo/queries/onboarding-goals';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

import getQueryClient from '../client';

function run(dashboardId: string) {
  return graphQLClient.request(getOnboardingGoalsQuery, {
    dashboardId
  });
}

const options = (dashboardId: string) => ({
  queryKey: dashboardKeys.goals(dashboardId),
  queryFn: () => run(dashboardId)
});

export function useQueryGoals(websiteId: string) {
  return useSuspenseQuery(options(websiteId));
}
export async function getQueryGoals(websiteId: string) {
  return getQueryClient().fetchQuery(options(websiteId));
}

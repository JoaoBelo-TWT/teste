// eslint-disable-next-line import/no-extraneous-dependencies
import { useSuspenseQuery } from '@tanstack/react-query';

import { getFunnelStagesQuery } from '@/lib/apollo/queries/onboarding-funnel-stages';
import { graphQLClient } from '@/lib/graphql/client';
import { dashboardKeys } from '@/lib/react-query/keys';

function run(dashboardId: string) {
  return graphQLClient.request(getFunnelStagesQuery, {
    dashboardId,
    first: 100
  });
}

export function useQueryFunnelStages(dashboardId: string) {
  return useSuspenseQuery({
    queryKey: dashboardKeys.funnels(dashboardId),
    queryFn: () => run(dashboardId)
  });
}

import { ComboboxData } from '@mantine/core';

import { getClient } from '@/lib/apollo/apollo-client';
import { getDashboardActivityQuery } from '@/lib/apollo/queries/dashboard-activity-goal';
import { fetchFunnelStages } from '@/lib/fetch-funnel-stages';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import { DashboardPathParams } from '../types';

import ActivityGoalCard from './components/activity-goal-card';
import ActivityGoalEmptyState from './components/empty-state';

export default async function Page({
  params
}: Readonly<{
  params: DashboardPathParams;
}>) {
  const { dashboardId } = params;

  const [funnels, dashboardActivity] = await Promise.all([
    fetchFunnelStages(dashboardId),
    getClient().query({
      query: getDashboardActivityQuery,
      variables: { dashboardId },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardGoalQuery]
          }
        }
      }
    })
  ]);

  const customerFunnelStages: ComboboxData | undefined = funnels?.customerFunnelStages.edges.map((edge) => ({
    value: edge.node.id,
    label: edge.node.name
  }));

  return (
    <>
      {dashboardActivity?.data?.dashboardActivityGoal?.isSetup ? (
        <ActivityGoalCard dashboardActivityGoal={dashboardActivity?.data?.dashboardActivityGoal} />
      ) : (
        <ActivityGoalEmptyState params={params} customerFunnelStages={customerFunnelStages} />
      )}
    </>
  );
}

import { notFound } from 'next/navigation';

import { getClient } from '@/lib/apollo/apollo-client';
import { getDashboardQuery } from '@/lib/apollo/queries/dashboard';
import { nextCacheTags } from '@/types/constants/next-cache-tags';

import classes from './index.module.css';
import { DashboardPathParams } from './types';

export const dynamic = 'force-dynamic';

export default async function DashboardOverviewLayout({
  children,
  topbar,
  welcome,
  budgetGoal,
  activityGoal,
  channelPerformance,
  funnelPerformance,
  websitePerformance,
  campaignPerformance,
  params
}: Readonly<{
  params: DashboardPathParams;
  children: React.ReactNode;
  topbar: React.ReactNode;
  welcome: React.ReactNode;
  budgetGoal: React.ReactNode;
  activityGoal: React.ReactNode;
  channelPerformance: React.ReactNode;
  funnelPerformance: React.ReactNode;
  websitePerformance: React.ReactNode;
  campaignPerformance: React.ReactNode;
}>) {
  const { dashboardId } = params;

  const { error: dashboardError } = await getClient()
    .query({
      query: getDashboardQuery,
      variables: {
        dashboardId
      },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.dashboardQuery]
          }
        }
      }
    })
    .catch((error: unknown) => ({
      data: null,
      error
    }));

  if (dashboardError) {
    notFound();
  }

  return (
    <>
      {topbar}
      <div className={classes.dashboard}>
        <div className={classes['dashboard__card-group-container']}>
          <div className={classes['dashboard__welcome-card-container']}>{welcome}</div>
          <div className={classes['dashboard__goals-container']}>
            {budgetGoal}
            {activityGoal}
          </div>
        </div>
        {channelPerformance}
        {funnelPerformance}
        {websitePerformance}
        {campaignPerformance}
        {children}
      </div>
    </>
  );
}

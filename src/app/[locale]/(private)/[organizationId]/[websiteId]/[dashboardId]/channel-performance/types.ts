import { DashboardTimeframe } from '@/__generated__/graphql';

export interface SearchParams {
  timeframe: DashboardTimeframe;
  activityPageIndex?: number;
  activityPageSize?: number;
}

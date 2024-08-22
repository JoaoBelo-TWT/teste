import { gql } from '@/__generated__';

export const getChannelPerformanceDeepDiveOverviewQuery = gql(`
query GetChannelPerformanceDeepDiveOverview(
  $dashboardId: String!,
  $channelName: ChannelFiltersDashboardEnum!,
  $dashboardTimeframe: DashboardTimeframe!
  ) {
  channelPerformanceDeepDiveOverview(
    dashboardId: $dashboardId,
    channelName: $channelName,
    dashboardTimeframe: $dashboardTimeframe
  ) {
    currency
    customerFunnelsOverView {
      name
      organicCount
      paidCount
      totalCount
      costPer
      currency
    }
    spend
  }
}
`);

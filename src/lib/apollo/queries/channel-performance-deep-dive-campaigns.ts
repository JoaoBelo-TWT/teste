import { gql } from '@/__generated__';

export const getChannelPerformanceDeepDiveCampaignsQuery = gql(`
query GetChannelPerformanceDeepDiveCampaigns(
  $dashboardId: String!,
  $channelName: ChannelFiltersDashboardEnum!,
  $dashboardTimeframe: DashboardTimeframe!
  ) {
  channelPerformanceDeepDiveCampaigns(
    dashboardId: $dashboardId,
    channelName: $channelName,
    dashboardTimeframe: $dashboardTimeframe
  ) {
    campaigns {
        name
        customerFunnels {
          name
          count
      }
    }
  }
}
`);

import { gql } from '@/__generated__';

export const getChannelPerformanceDeepDiveActivityDetailsQuery = gql(`
query GetChannelPerformanceDeepDiveActivityDetails(
  $dashboardId: String!,
  $channelName: ChannelFiltersDashboardEnum!,
  $dashboardTimeframe: DashboardTimeframe!,
  $skip: Int!,
  $take: Int
  ) {
  channelPerformanceDeepDiveActivityDetails(
    dashboardId: $dashboardId,
    channelName: $channelName,
    dashboardTimeframe: $dashboardTimeframe,
    skip: $skip,
    take: $take
  ) {
    totalActivityDetails
    activityDetails {
      id
      region
      pageUrl
      email
      searchTerm
      customerFunnelStageName
    }
  }
}
`);

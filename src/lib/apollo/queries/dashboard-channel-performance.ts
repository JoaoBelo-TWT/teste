import { gql } from '@/__generated__';

export const getDashboardChanelPerformanceQuery = gql(`
  query GetDashboardChanelPerformance(
    $dashboardId: UUID!
    $dashboardTimeframe: DashboardTimeframe!
    $channelPerformanceSorting: ChannelPerformanceSorting!
  ) {
    dashboardChannelPerformance(
      dashboardId: $dashboardId
      dashboardTimeframe: $dashboardTimeframe
      channelPerformanceSorting: $channelPerformanceSorting
    ) {
      channelsPerformance {
        stageName
        name
        count
        stageId
        channels {
          name
          currency
          count
          spend
          perStage
        }
      }
      hasEvents
      isSetup
    }
  }
`);

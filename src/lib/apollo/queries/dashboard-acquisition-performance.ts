import { gql } from '@/__generated__';

export const getDashboardAcquisitionQuery = gql(`
  query DashboardAcquisitionPerformance(
    $dashboardId: UUID!
    $dashboardTimeframe: DashboardTimeframe!
    $funnelStageName: String
    $channel: Channels
  ) {
    dashboardAcquisitionPerformance(
      dashboardId: $dashboardId
      dashboardTimeframe: $dashboardTimeframe
      funnelStageName: $funnelStageName 
      channel: $channel
    ) {
        startDate
        isSetup
        endDate
        acquisitionPerformance {
          date
          count
        }
      }
  }
`);

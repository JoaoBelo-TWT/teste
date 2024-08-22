import { gql } from '@/__generated__';

export const getFunnelPerformanceDeepDiveQuery = gql(`
  query FunnelPerformanceDeepDive(
    $dashboardId: String!,
    $dashboardTimeframe: DashboardTimeframe!,
    $customerFunnelId: UUID!,
    $isFromCache: Boolean!,
    $take: Int,
    $skip: Int!,
    $funnelPerformanceSorting: FunnelPerformanceSorting!
  ) {
    funnelPerformanceDeepDive(
      dashboardId: $dashboardId,
      dashboardTimeframe: $dashboardTimeframe,
      customerFunnelId: $customerFunnelId,
      isFromCache: $isFromCache,
      take: $take,
      skip: $skip,
      funnelPerformanceSorting: $funnelPerformanceSorting
    ) {
      totalEvents
      totalConversions
      funnelName
      totalFunnelPerformanceConversions
      funnelPerformanceConversions {
        sourceUrl
        urlSourceImage
        firstPageVisited
        conversions
      }
    }
  }
`);

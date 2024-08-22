import { gql } from '@/__generated__';

export const getFunnelPerformanceDeepDiveConversionDetailsQuery = gql(`
  query FunnelPerformanceDeepDiveConversionDetails(
    $dashboardId: String!,
    $firstPageVisited: String!,
    $dashboardTimeframe: DashboardTimeframe!,
    $customerFunnelId: UUID!,
    $sourceUrl: String,
    $take: Int,
    $skip: Int!
  ) {
    funnelPerformanceDeepDiveConversionDetails(
      dashboardId: $dashboardId,
      firstPageVisited: $firstPageVisited,
      dashboardTimeframe: $dashboardTimeframe,
      customerFunnelId: $customerFunnelId,
      sourceUrl: $sourceUrl,
      take: $take,
      skip: $skip
    ) {
      totalFunnelPerformanceConversionEvents
      totalSearchTerms
      funnelName
      funnelPerformanceConversionEvents {
        region
        email
        firstPageVisited
        searchTerm
        channel
        timestamp
      }
    }
  }
`);

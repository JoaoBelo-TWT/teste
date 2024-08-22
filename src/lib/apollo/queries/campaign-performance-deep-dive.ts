import { gql } from '@/__generated__';

export const getCampaignPerformanceDeepDiveOverviewQuery = gql(`
  query CampaignPerformanceDeepDiveOverview(
    $dashboardId: String!,
    $dashboardTimeframe: DashboardTimeframe!,
    $campaignName: String!,
    $take: Int,
    $skip: Int!,
    $campaignPerformanceSorting: CampaignPerformanceSorting,
    $isFromCache: Boolean!
  ) {
    campaignPerformanceDeepDiveOverview(
      dashboardId: $dashboardId,
      dashboardTimeframe: $dashboardTimeframe,
      campaignName: $campaignName,
      take: $take,
      skip: $skip,
      campaignPerformanceSorting: $campaignPerformanceSorting,
      isFromCache: $isFromCache
    ) {
      totalVisits
      totalSpend
      firstStageTotals {
        total
        stageLabel
      }
      lastStageTotals {
        total
        stageLabel
      }
      topPerformer
      activity {
        sourceUrl
        firstPageVisited
        leadConversion
        customerConversion
      }
      totalActivity
      cpc {
        cost
        label
      }
      cpl {
        cost
        label
      }
    }
  }
`);

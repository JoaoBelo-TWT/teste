import { gql } from '@/__generated__';

export const getDashboardCampaignsQuery = gql(`
  query GetDashboardCampaigns(
    $dashboardId: UUID!
    $dashboardTimeframe: DashboardTimeframe!
    $status: CampaignStatusInput!
    $sorting: CampaignSorting!
    $take: Int
    $skip: Int
  ) {
    dashboardCampaignsList(
      dashboardId: $dashboardId
      dashboardTimeframe: $dashboardTimeframe
      status: $status
      sorting: $sorting
      take: $take
      skip: $skip
    ) {
      hasEvents
      totalVisits
      totalConversions
      totalCampaigns
      campaigns {
        name
        status
        startDate
        endDate
        visits
        leads {
          name
          count
        }
        customers {
          name
          count
        }
        spend
        cac
        currency
        urlSourcesImages
        
      }
    }
  }
`);

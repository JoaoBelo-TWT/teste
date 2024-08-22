import { gql } from '@/__generated__';

export const getDashboardOverviewQuery = gql(`
  query GetDashboardOverview(
    $dashboardId: UUID!
    $dashboardTimeframe: DashboardTimeframe!
  ) {
    dashboardOverview(
      dashboardId: $dashboardId
      dashboardTimeframe: $dashboardTimeframe
    ) {
      startDate
      endDate
      leads {
        count
        name
      }
      conversion
      cac
      websiteConversionRate
      cacCurrency
      newCustomers {
        count
        name
      }
      status
      isSetup
      hasEvents
    }
  }
`);

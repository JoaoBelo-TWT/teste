import { gql } from '@/__generated__';

export const getDashboardCustomerJourneyQuery = gql(`
  query GetDashboardCustomerJourney(
    $dashboardId: UUID!
    $dashboardTimeframe: DashboardTimeframe!
  ) {
    dashboardCustomerJourney(
      dashboardId: $dashboardId
      dashboardTimeframe: $dashboardTimeframe
    ) {
      dashboardId
      journeys {
        id
        name
        events {
          id
          name
        }
        conversionEvents
        conversionEventsPercentage
      }
      hasEvents
      isSetup
      period
    }
  }
`);

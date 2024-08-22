import { gql } from '@/__generated__';

export const getDashboardActivityQuery = gql(`
  query GetDashboardActivity(
    $dashboardId: UUID!
    ) {
    dashboardActivityGoal(
      dashboardId: $dashboardId
    ) {
      dashboardId
      totalNumberOfEvents
      currentNumberOfEvents
      completesInDays
      isSetup
      customerFunnelStageName
      activityGoalProgress {
        date
        value
      }
    }
  }
`);

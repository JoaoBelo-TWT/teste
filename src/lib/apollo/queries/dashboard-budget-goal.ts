import { gql } from '@/__generated__';

export const getDashboardBudgetQuery = gql(`
  query GetDashboardBudget(
    $dashboardId: UUID!
    ) {
    dashboardBudget(
        dashboardId: $dashboardId
    ) {
      dashboardId
      totalAmount
      usedAmount
      currency
      recurring
      recurringRepeat
      renewsIn
      isSetup
      budgetUsage {
        date
        amount
      }
    }
  }
`);

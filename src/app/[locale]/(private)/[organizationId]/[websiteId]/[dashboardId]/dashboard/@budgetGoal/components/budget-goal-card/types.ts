import { GetDashboardBudgetQuery } from '@/__generated__/graphql';

export interface BudgetGoalCardProps {
  dashboardBudget: GetDashboardBudgetQuery['dashboardBudget'];
}

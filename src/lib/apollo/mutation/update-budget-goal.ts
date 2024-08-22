import { gql } from '@/__generated__';

export const updateBudgetGoalMutation = gql(`
  mutation Mutation($updateBudgetGoalInput: UpdateBudgetGoalInput!) {
    updateBudgetGoal(updateBudgetGoalInput: $updateBudgetGoalInput) {
        recurring
        currency
        dashboardId
        id
        recurringRepeat
        value
    }
  }
`);

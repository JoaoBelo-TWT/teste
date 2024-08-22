import { gql } from '@/__generated__';

export const createBudgetGoalMutation = gql(`
  mutation CreateBudgetGoalMutation($createBudgetGoalInput: CreateBudgetGoalInput!) {
    createBudgetGoal(createBudgetGoalInput: $createBudgetGoalInput) {
        id
        dashboardId
        value
        currency
        recurring
        recurringRepeat
        createdAt
        updatedAt
    }
  }
`);

import { gql } from '@/__generated__';

export const removeBudgetGoalMutation = gql(`
  mutation RemoveBudgetGoalMutation($id: UUID!) {
    removeBudgetGoal(id: $id)
  }
`);

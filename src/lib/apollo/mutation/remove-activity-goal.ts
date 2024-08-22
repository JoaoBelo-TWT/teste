import { gql } from '@/__generated__';

export const removeActivityGoalMutation = gql(`
  mutation RemoveActivityGoalMutation($id: UUID!) {
    removeActivityGoal(id: $id)
  }
`);

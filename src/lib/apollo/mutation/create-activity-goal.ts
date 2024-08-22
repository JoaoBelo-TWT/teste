import { gql } from '@/__generated__';

export const createActivityGoalMutation = gql(`
  mutation CreateActivityGoalMutation($createActivityGoalInput: CreateActivityGoalInput!) {
    createActivityGoal(createActivityGoalInput: $createActivityGoalInput) {
      dashboardId
      numberOfEvents
    }
  }
`);

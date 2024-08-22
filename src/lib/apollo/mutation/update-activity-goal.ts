import { gql } from '@/__generated__';

export const updateActivityGoalMutation = gql(`
  mutation UpdateActivityGoalMutation($updateActivityGoalInput: UpdateActivityGoalInput!) {
    updateActivityGoal(updateActivityGoalInput: $updateActivityGoalInput) {
      customerFunnelStageId
      dashboardId
      id
      numberOfEvents
    }
  }
`);

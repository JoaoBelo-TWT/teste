import { gql } from '@/__generated__';

export const removeDashboardMutation = gql(`
    mutation RemoveDashboard($dashboardId: UUID!) {
        removeDashboard(id: $dashboardId)
    }
`);

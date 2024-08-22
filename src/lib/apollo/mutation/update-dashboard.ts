import { gql } from '@/__generated__';

export const updateDashboardMutation = gql(`
mutation UpdateDashboard($updateDashboardInput: UpdateDashboardInput!) {
    updateDashboard(updateDashboardInput: $updateDashboardInput){
    id
    name,
    websiteId,
    createdAt
    updatedAt
  }
}
`);

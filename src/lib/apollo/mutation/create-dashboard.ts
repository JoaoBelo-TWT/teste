import { gql } from '@/__generated__';

export const createDashboardMutation = gql(`
  mutation CreateDashboardMutation($createDashboardInput: CreateDashboardInput!) {
    createDashboard(createDashboardInput: $createDashboardInput) {
      id
      name
      createdAt
      updatedAt
    }
  }
`);

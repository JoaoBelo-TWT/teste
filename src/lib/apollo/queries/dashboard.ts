import { gql } from '@/__generated__';

export const getDashboardQuery = gql(`
  query GetDashboard(
    $dashboardId: UUID!
  ) {
    dashboard(
      id: $dashboardId
    ) {
      id
      websiteId
      name
      createdAt
      updatedAt
    }
  }
`);

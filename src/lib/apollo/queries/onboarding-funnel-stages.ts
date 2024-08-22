import { gql } from '@/__generated__';

export const getFunnelStagesQuery = gql(`
  query GetFunnelStages(
    $dashboardId: UUID!
    $first: Int!
    ) {
    customerFunnelStages(dashboardId: $dashboardId first: $first) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

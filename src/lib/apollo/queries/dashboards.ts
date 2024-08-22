import { gql } from '@/__generated__';

export const getDashboardsQuery = gql(`
  query GetDashboards(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $sorting: Sorting
    $filters: DashboardsFiltersInput
  ) {
    dashboards(
      first: $first
      after: $after
      last: $last
      before: $before
      sorting: $sorting
      filters: $filters
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          websiteId
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`);

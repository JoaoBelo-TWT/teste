import { gql } from '@/__generated__';

export const getOrganizationPermissions = gql(`
    query GetOrganizationPermissions(
        $filters: PermissionsFiltersInput, 
        $first: Int, 
        $last: Int, 
        $before: String, 
        $after: String, 
        $sorting: Sorting,
        $take: Int, 
        $skip: Int
        ) 
        {
            permissions (
              first: $first
              last: $last
              before: $before
              after: $after
              sorting: $sorting
              filters: $filters
              take: $take
              skip: $skip
              ) {
              totalTeamMembers
              edges {
                node {
                  id
                  invitationStatus
                  accessLevel
                  userId
                  user {
                    id
                    firstName
                    lastName
                    email
                  }
                }
              }
            }
        }
`);

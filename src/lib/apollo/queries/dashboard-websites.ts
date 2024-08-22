import { gql } from '@/__generated__';

export const getWebsitesQuery = gql(`
    query GetWebsites( 
        $before: String
        $after: String
        $first: Int
        $last: Int
        $sorting: Sorting
        $filters: WebsitesFiltersInput
    ) {
        websites(before: $before, after: $after, first: $first, last: $last, sorting: $sorting, filters: $filters) {
            edges {
    		    node {
                    id
                    name
                    defaultDashboardId
                    imageUrl
                }
            }
        }
    }
`);

import { gql } from '@/__generated__';

export const getOrganizationsQuery = gql(`
query GetOrganizations(
    $before: String
    $after: String
    $first: Int
    $last: Int
    $sorting: Sorting
    $filters: OrganizationsFiltersInput) {
    organizations(before: $before, after: $after, first: $first, last: $last, sorting: $sorting, filters: $filters) {
    	edges {
    		node {
    			id
    			name
                companySizeId
                companyIndustryId
                imageUrl
                defaultWebsiteId
                website {
                    defaultDashboardId
                }
    		}
    	}
    }
}
`);

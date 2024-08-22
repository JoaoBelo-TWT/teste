import { gql } from '@/__generated__';

export const removeWebsiteMutation = gql(`
    mutation RemoveWebsite($websiteId: UUID!) {
        removeWebsite(id: $websiteId)
    }
`);

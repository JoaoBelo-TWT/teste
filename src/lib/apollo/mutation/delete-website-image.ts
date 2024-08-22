import { gql } from '@/__generated__';

export const deleteWebsiteImageMutation = gql(`
    mutation DeleteWebsiteImage($deleteWebsiteImageInput: DeleteWebsiteImageInput!) {
        deleteWebsiteImage(deleteWebsiteImageInput: $deleteWebsiteImageInput) {
            id
        }
    }
`);

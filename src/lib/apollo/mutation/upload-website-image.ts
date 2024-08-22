import { gql } from '@/__generated__';

export const uploadWebsiteImageMutation = gql(`
    mutation UploadWebsiteImage($uploadWebsiteImageInput: UploadWebsiteImageInput!) {
        uploadWebsiteImage(uploadWebsiteImageInput: $uploadWebsiteImageInput) {
            id,
            imageUrl
        }
    }
`);

'use server';

import { getClient } from '@/lib/apollo/apollo-client';
import { deleteWebsiteImageMutation } from '@/lib/apollo/mutation/delete-website-image';

export async function deleteWebsiteImage(websiteId: string): Promise<void> {
  await getClient().mutate({
    mutation: deleteWebsiteImageMutation,
    variables: {
      deleteWebsiteImageInput: {
        websiteId
      }
    }
  });
}

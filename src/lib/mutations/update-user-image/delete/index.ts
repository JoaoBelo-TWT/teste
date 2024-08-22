'use server';

import { getClient } from '@/lib/apollo/apollo-client';
import { deleteUserImageMutation } from '@/lib/apollo/mutation/delete-user-image';

export async function deleteUserImage(userId: string): Promise<void> {
  await getClient().mutate({
    mutation: deleteUserImageMutation,
    variables: {
      deleteUserImageInput: {
        userId
      }
    }
  });
}

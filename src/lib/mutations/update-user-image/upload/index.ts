'use server';

import { UploadUserImageMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { uploadUserImageMutation } from '@/lib/apollo/mutation/upload-user-image';

export async function uploadUserImage(
  userId: string,
  imageBase64: string
): Promise<UploadUserImageMutation | null | undefined> {
  const { data } = await getClient().mutate({
    mutation: uploadUserImageMutation,
    variables: {
      uploadUserImageInput: {
        userId,
        imageBase64
      }
    }
  });
  return data;
}

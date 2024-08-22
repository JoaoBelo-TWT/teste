'use server';

import { UploadWebsiteImageMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { uploadWebsiteImageMutation } from '@/lib/apollo/mutation/upload-website-image';

export async function uploadWebsiteImage(
  websiteId: string,
  imageBase64: string
): Promise<UploadWebsiteImageMutation | null | undefined> {
  const { data } = await getClient().mutate({
    mutation: uploadWebsiteImageMutation,
    variables: {
      uploadWebsiteImageInput: {
        websiteId,
        imageBase64
      }
    }
  });
  return data;
}

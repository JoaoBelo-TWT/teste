'use server';

import { UploadOrganizationImageMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { uploadOrganizationImageMutation } from '@/lib/apollo/mutation/upload-organization-image';

export async function uploadOrganizationImage(
  organizationId: string,
  imageBase64: string
): Promise<UploadOrganizationImageMutation | null | undefined> {
  const { data } = await getClient().mutate({
    mutation: uploadOrganizationImageMutation,
    variables: {
      uploadOrganizationImageInput: {
        organizationId,
        imageBase64
      }
    }
  });
  return data;
}

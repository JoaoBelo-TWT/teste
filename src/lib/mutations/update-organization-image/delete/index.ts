'use server';

import { getClient } from '@/lib/apollo/apollo-client';
import { deleteOrganizationImageMutation } from '@/lib/apollo/mutation/delete-organization-image';

export async function deleteOrganizationImage(organizationId: string): Promise<void> {
  await getClient().mutate({
    mutation: deleteOrganizationImageMutation,
    variables: {
      deleteOrganizationImageInput: {
        organizationId
      }
    }
  });
}

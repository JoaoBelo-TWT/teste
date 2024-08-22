'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { CreatePermissionInput, CreatePermissionMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { createPermissionsMutation } from '@/lib/apollo/mutation/create-permissions';
import { CUSTOM_ERROR_CODES } from '@/resources/constants';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { getOriginalError } from '@/utils/errors/original-error';

export async function CreatePermissions(
  createPermissionInput: CreatePermissionInput
): Promise<ServerActionResponse<CreatePermissionMutation | null>> {
  const t = await getTranslations('actions.inviteTeamMembers');
  try {
    const { data } = await getClient().mutate({
      mutation: createPermissionsMutation,
      variables: {
        createPermissionInput
      }
    });

    revalidateTag(nextCacheTags.permissionsQuery);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    const originalError = getOriginalError(error);
    if (originalError && originalError.message === CUSTOM_ERROR_CODES.permissions.USER_BELONGS_TO_ORGANIZATION) {
      return { errorMessage: t('errorMessageUserBelongsToOrganization', { users: originalError.error }) };
    }

    return { errorMessage: t('errorMessage') };
  }
}

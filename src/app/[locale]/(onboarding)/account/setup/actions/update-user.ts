'use server';

import { FetchResult } from '@apollo/client';
import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import {
  CreateOrganizationInput,
  CreateOrganizationMutation,
  UpdateOrganizationInput,
  UpdateOrganizationMutation,
  UpdateUserInput,
  UpdateUserMutation
} from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { createOrganizationMutation } from '@/lib/apollo/mutation/create-organization';
import { updateOrganizationMutation } from '@/lib/apollo/mutation/update-organization';
import { updateUserMutation } from '@/lib/apollo/mutation/update-user';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function updateUser(
  updateUserInput: UpdateUserInput
): Promise<ServerActionResponse<FetchResult<UpdateUserMutation>>> {
  const t = await getTranslations('actions.updateUser');

  try {
    const data = await getClient().mutate({
      mutation: updateUserMutation,
      variables: {
        updateUserInput
      }
    });

    revalidateTag(nextCacheTags.accounts.me);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}

export async function createOrganization(
  createOrganizationInput: CreateOrganizationInput
): Promise<ServerActionResponse<FetchResult<CreateOrganizationMutation>>> {
  const t = await getTranslations('actions.createOrganization');

  try {
    const data = await getClient().mutate({
      mutation: createOrganizationMutation,
      variables: {
        createOrganizationInput
      }
    });

    revalidateTag(nextCacheTags.accounts.me);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}

export async function updateOrganization(
  updateOrganizationInput: UpdateOrganizationInput
): Promise<ServerActionResponse<FetchResult<UpdateOrganizationMutation>>> {
  const t = await getTranslations('actions.updateOrganization');

  try {
    const data = await getClient().mutate({
      mutation: updateOrganizationMutation,
      variables: {
        updateOrganizationInput
      }
    });

    revalidateTag(nextCacheTags.accounts.me);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}

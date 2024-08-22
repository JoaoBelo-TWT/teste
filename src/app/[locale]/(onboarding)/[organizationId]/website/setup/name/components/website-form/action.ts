'use server';

import { getTranslations } from 'next-intl/server';

import {
  CreateWebsiteInput,
  CreateWebsiteMutation,
} from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { createWebsiteMutation } from '@/lib/apollo/mutation/create-website';
import { ServerActionResponse } from '@/types/server-action-response';

export async function CreateWebsite(
  createWebsiteInput: CreateWebsiteInput
): Promise<ServerActionResponse<CreateWebsiteMutation | null | undefined>> {
  const t = await getTranslations('actions');

  try {
    const { data } = await getClient().mutate<CreateWebsiteMutation>({
      mutation: createWebsiteMutation,
      variables: {
        createWebsiteInput
      }
    });

    return {
      data,
      successMessage: t('createWebsite.successMessage')
    };
  } catch (error) {
    return { errorMessage: t('createWebsite.errorMessage') };
  }
}

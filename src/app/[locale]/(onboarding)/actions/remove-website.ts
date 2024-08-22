'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { MutationRemoveWebsiteArgs, RemoveWebsiteMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { removeWebsiteMutation } from '@/lib/apollo/mutation/remove-website';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function removeWebsite(
  id: MutationRemoveWebsiteArgs['id']
): Promise<ServerActionResponse<RemoveWebsiteMutation | null | undefined>> {
  const t = await getTranslations('common');

  try {
    const { data } = await getClient().mutate({
      mutation: removeWebsiteMutation,
      variables: {
        websiteId: id
      }
    });

    revalidateTag(nextCacheTags.websiteQuery);

    return {
      data,
      successMessage: t('success')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('error') };
  }
}

'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UpdateWebsiteInput, UpdateWebsiteMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { updateWebsiteMutation } from '@/lib/apollo/mutation/update-website';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

type RequiredNonNullable<T> = {
  [key in keyof T]-?: NonNullable<T[key]>;
};

export async function updateWebsiteName(
  updateWebsiteInput: RequiredNonNullable<Pick<UpdateWebsiteInput, 'id' | 'name'>>
): Promise<ServerActionResponse<UpdateWebsiteMutation | null | undefined>> {
  const t = await getTranslations('actions.updateWebsiteName');
  try {

    const { data } = await getClient().mutate({
      mutation: updateWebsiteMutation,
      variables: {
        updateWebsiteInput: {
          ...updateWebsiteInput,
          name: updateWebsiteInput.name
        }
      }
    });

    revalidateTag(nextCacheTags.websiteQuery);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}

'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UpdateDashboardInput, UpdateDashboardMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { updateDashboardMutation } from '@/lib/apollo/mutation/update-dashboard';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

type RequiredNonNullable<T> = {
  [key in keyof T]-?: NonNullable<T[key]>;
};

export async function updateDashboardName(
  updateDashboardInput: RequiredNonNullable<Pick<UpdateDashboardInput, 'id' | 'name'>>
): Promise<ServerActionResponse<UpdateDashboardMutation | null | undefined>> {
  const t = await getTranslations('actions.updateDashboardName');
  try {
    const { data } = await getClient().mutate({
      mutation: updateDashboardMutation,
      variables: {
        updateDashboardInput: {
          ...updateDashboardInput,
          name: updateDashboardInput.name
        }
      }
    });

    revalidateTag(nextCacheTags.dashboardQuery);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}

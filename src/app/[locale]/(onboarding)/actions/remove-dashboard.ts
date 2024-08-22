'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { MutationRemoveDashboardArgs, RemoveDashboardMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { removeDashboardMutation } from '@/lib/apollo/mutation/remove-dashboard';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function removeDashboard(
  id: MutationRemoveDashboardArgs['id']
): Promise<ServerActionResponse<RemoveDashboardMutation | null | undefined>> {
  const t = await getTranslations('common');

  try {
    const { data } = await getClient().mutate({
      mutation: removeDashboardMutation,
      variables: {
        dashboardId: id
      }
    });

    revalidateTag(nextCacheTags.dashboardQuery);
    revalidateTag(nextCacheTags.dashboardsQuery);

    return {
      data,
      successMessage: t('success')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('error') };
  }
}

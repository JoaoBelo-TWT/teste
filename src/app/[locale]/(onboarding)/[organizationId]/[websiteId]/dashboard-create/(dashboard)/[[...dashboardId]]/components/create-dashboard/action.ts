'use server';

import { getTranslations } from 'next-intl/server';

import { CreateDashboardInput, CreateDashboardMutationMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { createDashboardMutation } from '@/lib/apollo/mutation/create-dashboard';
import { ServerActionResponse } from '@/types/server-action-response';

export async function createDashboard({
  name,
  websiteId
}: CreateDashboardInput): Promise<ServerActionResponse<CreateDashboardMutationMutation | null | undefined>> {
  const t = await getTranslations('actions.createDashboard');
  try {
    const { data } = await getClient().mutate<CreateDashboardMutationMutation>({
      mutation: createDashboardMutation,
      variables: {
        createDashboardInput: {
          name,
          websiteId
        }
      }
    });

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}

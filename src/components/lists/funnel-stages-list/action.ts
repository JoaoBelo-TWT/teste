'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { UpsertCustomerFunnelStageInput, UpsertCustomerFunnelStageMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { upsertFunnelStagesMutation } from '@/lib/apollo/mutation/upsert-funnel-stages';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function UpsertFunnelStages(
  upsertCustomerFunnelStageInput: UpsertCustomerFunnelStageInput[]
): Promise<ServerActionResponse<UpsertCustomerFunnelStageMutation | null | undefined>> {
  const t = await getTranslations('actions.updateFunnelStage');

  try {
    const { data } = await getClient().mutate<UpsertCustomerFunnelStageMutation>({
      mutation: upsertFunnelStagesMutation,
      variables: {
        upsertCustomerFunnelStageInput
      }
    });

    revalidateTag(nextCacheTags.dashboardFunnelStagesQuery);
    revalidateTag(nextCacheTags.dashboardCustomerJourneyQuery);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);

    return { errorMessage: `${t('errorMessage')} ${upsertCustomerFunnelStageInput.at(0)?.name}` };
  }
}

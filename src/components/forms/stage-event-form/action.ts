'use server';

import { revalidateTag } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { EventType, UpdateCustomerFunnelStageInput, UpdateFunnelStageMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { updateFunnelStageMutation } from '@/lib/apollo/mutation/update-funnel-stage';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';
import { formatUrl } from '@/utils/format-url';

export async function UpdateCustomerFunnelStage(
  updateCustomerFunnelStageInput: UpdateCustomerFunnelStageInput
): Promise<ServerActionResponse<UpdateFunnelStageMutation | null | undefined>> {
  const t = await getTranslations('actions.updateCustomerFunnelStage');

  try {
    const formattedEvents = updateCustomerFunnelStageInput.customerFunnelStageEvents?.map((event) => {
      if (event.eventType === EventType.PageView) {
        return {
          ...event,
          customerFunnelStageEventConditions: event.customerFunnelStageEventConditions.map((condition) => ({
            ...condition,
            pageUrl: condition.pageUrl ? formatUrl(condition.pageUrl) : ''
          }))
        };
      }

      return event;
    });

    const { data } = await getClient().mutate<UpdateFunnelStageMutation>({
      mutation: updateFunnelStageMutation,
      variables: {
        updateCustomerFunnelStageInput: {
          ...updateCustomerFunnelStageInput,
          customerFunnelStageEvents: formattedEvents
        }
      }
    });

    revalidateTag(nextCacheTags.dashboardCreateCustomerFunnelStage);

    return {
      data,
      successMessage: t('successMessage')
    };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}

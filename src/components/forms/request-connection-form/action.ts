'use server';

import { getTranslations } from 'next-intl/server';

import { SendConnectionsRecommendationEmailMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { sendConnectionsRecommendationEmailMutation } from '@/lib/apollo/mutation/email-recommend-connection';
import { ServerActionResponse } from '@/types/server-action-response';

import { RequestConnectionInput } from './types';

export async function RequestConnection({
  requestedConnection
}: RequestConnectionInput): Promise<ServerActionResponse<SendConnectionsRecommendationEmailMutation>> {
  const t = await getTranslations('onboarding.setup.step3');
  try {
    await getClient().mutate<SendConnectionsRecommendationEmailMutation>({
      mutation: sendConnectionsRecommendationEmailMutation,
      variables: {
        sendConnectionsRecommendationEmailInput: {
          requestedConnection
        }
      }
    });
    return {
      successMessage: t('successMessage')
    };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}

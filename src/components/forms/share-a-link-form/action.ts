'use server';

import { getTranslations } from 'next-intl/server';

import { SendShareALinkSetupEmailMutation } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { sendShareALinkEmailMutation } from '@/lib/apollo/mutation/email-share-a-link';
import { ServerActionResponse } from '@/types/server-action-response';

import { ShareALinkInput } from './types';

export async function RequestShareALink({
  recipients,
  url
}: ShareALinkInput): Promise<ServerActionResponse<SendShareALinkSetupEmailMutation>> {
  const t = await getTranslations('modals.shareALink');
  try {
    await getClient().mutate<SendShareALinkSetupEmailMutation>({
      mutation: sendShareALinkEmailMutation,
      variables: {
        sendShareALinkSetupEmailInput: {
          recipients,
          url
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

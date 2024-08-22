'use server';

import { getSession } from '@auth0/nextjs-auth0';
import { getTranslations } from 'next-intl/server';

import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

export async function auth0ResendVerificationEmailJob(): Promise<ServerActionResponse<undefined>> {
  const t = await getTranslations('actions.resendVerificationEmailJob');

  try {
    const session = await getSession();
    const userId = session?.user?.sub as string;

    const tokenRes = (await (
      await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`
        })
      })
    ).json()) as { access_token: string };

    await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/jobs/verification-email`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenRes.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId
      })
    });

    return {
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}

'use server';

import { getSession } from '@auth0/nextjs-auth0';
import { getTranslations } from 'next-intl/server';

import { ServerActionResponse } from '@/types/server-action-response';
import { captureError } from '@/utils/errors/capture-error';

interface Auth0User {
  created_at: string;
  email: string;
  email_verified: boolean;
  given_name: string;
  family_name: string;
  identities: {
    user_id: string;
    provider: string;
    connection: string;
    isSocial: boolean;
  }[];
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  user_id: string;
  last_ip: string;
  last_login: string;
  logins_count: number;
}

export async function auth0GetUser(): Promise<ServerActionResponse<Auth0User>> {
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

    const userRes = (await (
      await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenRes.access_token}`,
          'Content-Type': 'application/json'
        }
      })
    ).json()) as Auth0User;

    return {
      data: userRes,
      successMessage: t('successMessage')
    };
  } catch (error) {
    captureError(error);
    return { errorMessage: t('errorMessage') };
  }
}

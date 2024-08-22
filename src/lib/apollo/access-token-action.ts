'use server';

import { GetAccessTokenResult, getAccessToken } from '@auth0/nextjs-auth0';

import { captureError } from '@/utils/errors/capture-error';

export async function getUserAccessToken(): Promise<GetAccessTokenResult> {
  return getAccessToken().catch((error) => {
    if (error instanceof Error && error.message !== 'The user does not have a valid session.') {
      captureError(error);
    }

    return { accessToken: undefined };
  });
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { handleAuth, handleLogin, handleProfile } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

import { captureError } from '@/utils/errors/capture-error';

function getAuthorizationParamsFromSearchParams(req: NextApiRequest) {
  const authorizationParams: Record<string, string> = {};

  if (req.url) {
    const { searchParams } = new URL(req.url);

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of searchParams) {
      authorizationParams[key] = value;
    }
  }

  return authorizationParams;
}

export const GET = handleAuth({
  login: (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return handleLogin(req, res, {
        authorizationParams: { ...getAuthorizationParamsFromSearchParams(req) }
      });
    } catch (error) {
      captureError(error);
      return new Response('Unexpected error occurred in login', { status: 500 });
    }
  },
  signup: (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return handleLogin(req, res, {
        authorizationParams: {
          screen_hint: 'signup',
          ...getAuthorizationParamsFromSearchParams(req)
        }
      });
    } catch (error) {
      captureError(error);
      return new Response('Unexpected error occurred in signup', { status: 500 });
    }
  },
  // enabling the refetch so that when we call getSession it is updated
  profile: handleProfile({
    refetch: true
  })
});

import { getSession } from '@auth0/nextjs-auth0/edge';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { locales, DEFAULT_LOCALE } from './i18n';
import { routes } from './routes/routes';

const intlMiddleware = createMiddleware({ locales, defaultLocale: DEFAULT_LOCALE });

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const session = await getSession(req, response);
  const currentTimestamp = dayjs();

  const expireDate = session?.accessTokenExpiresAt ? dayjs(session.accessTokenExpiresAt * 1000) : undefined;
  const nextUrl = req.nextUrl.pathname;

  if (expireDate?.isBefore(currentTimestamp)) {
    return NextResponse.redirect(new URL(routes.api.logout.path, req.url));
  }

  if (
    session?.user &&
    !session?.user?.email_verified &&
    !nextUrl.includes(routes.verifyEmail.path) &&
    // we need to exclude this page as well because the first getSession call isn't up to date
    !nextUrl.includes(routes.emailVerified.path)
  ) {
    return NextResponse.redirect(new URL(routes.verifyEmail.path, req.url));
  }

  // const userData = await fetchGetMeQuery();
  // const hasPermissions = validateUserPermissionByRole({ url: nextUrl, userData });
  // if (!hasPermissions) {
  //   return NextResponse.redirect(new URL(routes.homePage.path, req.url));
  // }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    // eslint-disable-next-line i18next/no-literal-string
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!api|health|_next|_vercel|.*\\..*).*)'
  ]
};

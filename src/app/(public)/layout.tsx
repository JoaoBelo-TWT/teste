import { ColorSchemeScript } from '@mantine/core';
import { GoogleTagManager } from '@next/third-parties/google';

import { AuthUnprotectedRoutes } from '@/components/wrappers/auth-unprotected-routes';

import { Providers } from '../providers';

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Providers>
          <AuthUnprotectedRoutes>{children}</AuthUnprotectedRoutes>
        </Providers>
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER as string} />
    </html>
  );
}

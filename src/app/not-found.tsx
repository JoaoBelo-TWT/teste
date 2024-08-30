'use client';

import ErrorNotFound from '@/components/sections/error';

import { Providers } from './providers';

export default function NotFound() {
  return (
    <html>
      <body>
        <Providers>
          <ErrorNotFound fullScreen goBack />
        </Providers>
      </body>
    </html>
  );
}

'use client';

import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr';
import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error {...error.props} />
        <button onClick={() => reset()}>
          <ArrowClockwise />
        </button>
      </body>
    </html>
  );
}

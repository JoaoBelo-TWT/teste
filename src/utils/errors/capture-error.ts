import * as Sentry from '@sentry/nextjs';

export function captureError(error: unknown) {
  Sentry.captureException(error);
}

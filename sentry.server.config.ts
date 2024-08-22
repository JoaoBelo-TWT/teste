/* eslint-disable no-restricted-syntax */
// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // eslint-disable-next-line i18next/no-literal-string
  environment: process.env.NEXT_PUBLIC_ENV || 'local',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.2,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  beforeSend: (event) => {
    if (event?.exception?.values) {
      for (const exception of event.exception.values) {
        if (exception?.type === 'ApolloError' && exception?.value?.includes?.('Unauthorized')) {
          return null;
        }
      }
    }
    return event;
  }
});

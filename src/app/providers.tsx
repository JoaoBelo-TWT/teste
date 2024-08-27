'use client';

import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import postHog from 'posthog-js';
import { PostHogProvider, usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

import { ToastContainer } from '@/components/ui/toast';
import { AuthLoadingWrapper } from '@/components/wrappers/loading-wrapper';
import { ModalsProvider } from '@/context/modal/modal';
import getQueryClient from '@/lib/react-query/client';

import { theme } from '../../theme';

// eslint-disable-next-line i18next/no-literal-string
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  postHog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // eslint-disable-next-line i18next/no-literal-string
    person_profiles: 'identified_only',
    capture_pageview: true
  });
}

export const PostHogSessionSetter = () => {
  const user = useUser();
  const postHogHook = usePostHog();
  useEffect(() => {
    if (user.user?.sub && user.isLoading && !postHogHook._isIdentified()) {
      postHogHook.identify(user.user.sub, {
        email: user.user?.email,
        name: user.user?.name
      });
    }
  }, [user, postHogHook]);
  return null;
};

export function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient();

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <PostHogProvider client={postHog}>
            <MantineProvider theme={theme}>
              <ToastContainer />
              <ModalsProvider />
              <PostHogSessionSetter />
              <AuthLoadingWrapper>{children}</AuthLoadingWrapper>
            </MantineProvider>
          </PostHogProvider>
        </ReactQueryStreamedHydration>
      </QueryClientProvider>
    </UserProvider>
  );
}

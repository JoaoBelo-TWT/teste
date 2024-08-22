'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';

import { SpinnerFullPage } from '@/components/ui/spinner-full-page';

type LoadingWrapperProps = {
  children: React.ReactNode;
};

export function AuthLoadingWrapper({ children }: Readonly<LoadingWrapperProps>) {
  const session = useUser();

  if (session.isLoading) {
    return <SpinnerFullPage color={'var(--mantine-color-blue-9)'} />;
  }

  return <>{children}</>;
}

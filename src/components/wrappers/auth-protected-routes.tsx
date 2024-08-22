import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

import { routes } from '@/routes/routes';

type AuthProtectedRoutesProps = {
  children: ReactNode;
};

export async function AuthProtectedRoutes({ children }: Readonly<AuthProtectedRoutesProps>) {
  const session = await getSession();

  if (!session) {
    redirect(routes.api.login.path);
  }

  return <>{children}</>;
}

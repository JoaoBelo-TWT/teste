import { redirect } from 'next/navigation';

import { AccessLevel } from '@/__generated__/graphql';
import { useUserAccessLevel } from '@/hooks/user-access-level/check-user-access-level';
import { routes } from '@/routes/routes';

export const dynamic = 'force-dynamic';

export default async function OnboardingLayout({
  params,
  children
}: Readonly<{
  children: React.ReactNode;
  params: { organizationId: string; websiteId: string };
}>) {
  const { organizationId } = params;

  const userAccessLevel = await useUserAccessLevel({ organizationId });

  if (userAccessLevel !== AccessLevel.Admin) {
    redirect(routes.homePage.path);
  }

  return children;
}

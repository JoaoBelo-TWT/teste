import { AuthProtectedRoutes } from '@/components/wrappers/auth-protected-routes';

export const dynamic = 'force-dynamic';

export default function OnboardingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthProtectedRoutes>{children}</AuthProtectedRoutes>;
}

import { AuthProtectedRoutes } from '@/components/wrappers/auth-protected-routes';
import { OnboardingRedirect } from '@/components/wrappers/onboarding-redirect';

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProtectedRoutes>
      <OnboardingRedirect>
        {children}
      </OnboardingRedirect>
    </AuthProtectedRoutes>
  );
}

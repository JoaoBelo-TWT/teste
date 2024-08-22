import { DashboardCreateCloseButton } from '@/app/[locale]/(onboarding)/components/dashboard-create-close-button';
import { BackButton } from '@/components/navigation/back-button';
import { routes } from '@/routes/routes';

import classes from './index.module.css';

export function Navigation({
  children,
  dashboardId,
  withSolidBackground = false
}: Readonly<{
  children?: React.ReactNode;
  organizationId: string;
  websiteId: string;
  dashboardId?: string;
  withSolidBackground?: boolean;
}>) {
  return (
    <div className={classes.navigation}>
      <div className={classes.navigation__container} data-solid={withSolidBackground}>
        <BackButton />
        {children}
        <DashboardCreateCloseButton dashboardId={dashboardId} clearOnboardingStep href={routes.homePage.path} />
      </div>
      <div className={classes.navigation__placeholder} />
    </div>
  );
}

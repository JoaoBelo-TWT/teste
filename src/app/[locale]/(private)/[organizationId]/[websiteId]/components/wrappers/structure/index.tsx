import { GlobalSideNav } from '@/components/navigation/global-side-nav';

import { Content } from '../content';

import classes from './index.module.css';

export function Structure({
  children,
  websiteId,
  organizationId
}: Readonly<{
  websiteId?: string;
  organizationId?: string;
  dashboardId?: string;
  children: React.ReactNode;
}>) {
  return (
    <div className={classes.structure}>
      <GlobalSideNav organizationId={organizationId} websiteId={websiteId} />
      <Content>{children}</Content>
    </div>
  );
}

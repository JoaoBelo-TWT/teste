'use client';

import { BackButton } from '@/components/navigation/back-button';
import { LogoutButton } from '@/components/navigation/logout-button';

import classes from './index.module.css';

export function SplitContainerHeader({ backButtonHref }: Readonly<{ backButtonHref: string | undefined }>) {
  return (
    <div className={classes.container__header}>
      <BackButton />
      <LogoutButton backButtonHref={backButtonHref} />
    </div>
  );
}

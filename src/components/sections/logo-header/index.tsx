import { X } from '@phosphor-icons/react/dist/ssr/X';
import { ReactElement } from 'react';

import { DashboardCreateCloseButton } from '@/app/[locale]/(onboarding)/components/dashboard-create-close-button';
import { BackButton } from '@/components/navigation/back-button';
import { IconButton } from '@/components/ui/icon-button';

import classes from './index.module.css';

export function LogoHeader({
  displayLogo = false,
  backButtonRoute,
  noBackButton,
  backButtonAction,
  closeButtonAction,
  rightContent,
  backToDashboard,
  leftContent
}: Readonly<{
  displayLogo?: boolean;
  backButtonRoute?: string;
  noBackButton?: boolean;
  backButtonAction?: () => void;
  closeButtonAction?: () => void;
  rightContent?: ReactElement;
  leftContent?: ReactElement;
  backToDashboard?: boolean;
}>) {
  return (
    <div className={classes['logo-header']}>
      {leftContent}
      {!noBackButton && !leftContent && <BackButton route={backButtonRoute} extraOnClickAction={backButtonAction} />}
      {displayLogo && (
        <img
          height={42}
          width={100}
          className={classes['logo-header__logo']}
          src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}logos/source-text-logo.svg`}
          alt={'text logo'}
        />
      )}
      {rightContent}
      {closeButtonAction && !rightContent && (
        <IconButton w={40} h={'100%'} variant="transparent" onClick={closeButtonAction}>
          <X size={16} />
        </IconButton>
      )}
      {backToDashboard && <DashboardCreateCloseButton />}
    </div>
  );
}

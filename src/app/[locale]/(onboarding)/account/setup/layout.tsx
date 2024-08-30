import React from 'react';

import { getMe } from '@/lib/react-query/user/query-me';

import { SplitContentContainer } from '../../components/container';

import classes from './index.module.css';

export const dynamic = 'force-dynamic';

export default async function AccountSectionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getMe();

  return (
    <SplitContentContainer isOnboarding={user.me.currentOnboardingPath !== undefined}>
      <div className={classes.setup__container}>
        <div className={classes['setup--content']}>
          <div className={classes['setup-container']}>
            <div className={classes.setup__logo}>
              <img
                width={100}
                height={41}
                src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}logos/source-text-logo.svg`}
                alt={'Source Logo'}
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </SplitContentContainer>
  );
}

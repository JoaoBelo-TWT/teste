import clsx from 'clsx';

import { routes } from '@/routes/routes';

import { SplitContainerHeader } from './header';
import classes from './index.module.css';

export const dynamic = 'force-dynamic';

export function SplitContentContainer({
  children,
  withHeader = true,
  isOnboarding
}: Readonly<{
  children: React.ReactNode;
  withHeader?: boolean;
  isOnboarding?: boolean;
}>) {
  const closeRoute = isOnboarding ? undefined : routes.homePage.path;

  return (
    <div className={classes.container}>
      {withHeader && <SplitContainerHeader backButtonHref={closeRoute} />}
      <div className={clsx(classes.container__left, classes['container__left--blue-bg'])}>
        <img
          width={600}
          height={1000}
          className={classes['container__left--image']}
          src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/wave.webp`}
          alt={'Wave'}
        />
      </div>
      <div className={classes.container__right}>{children}</div>
    </div>
  );
}

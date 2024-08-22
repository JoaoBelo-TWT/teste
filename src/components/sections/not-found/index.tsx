import { Text, Title } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { routes } from '@/routes/routes';

import classes from './index.module.css';

export default async function NotFound({
  fullScreen = false,
  goBack = false
}: Readonly<{
  fullScreen?: boolean;
  goBack?: boolean;
}>) {
  const t = await getTranslations();
  const content = (
    <>
      <div className={classes['not-found__text']}>
        <Title order={3}>{t('notFound.title')}</Title>
        <Text>{t('notFound.description')}</Text>
      </div>
      <Link href={routes.homePage.path}>
        <Button size="large" variant="filled">
          {goBack ? t('notFound.goBack') : t('notFound.button')}
        </Button>
      </Link>
    </>
  );

  if (fullScreen) return <div className={clsx(fullScreen && classes['not-found__full-screen'])}>{content}</div>;

  return <div className={classes['not-found__wrapper']}>{content}</div>;
}

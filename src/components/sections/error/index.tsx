import { Text, Title } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { routes } from '@/routes/routes';

import classes from './index.module.css';

export default function ErrorNotFound({
  fullScreen = false,
  goBack = false
}: Readonly<{
  fullScreen?: boolean;
  goBack?: boolean;
}>) {
  const t = useTranslations();
  const content = (
    <>
      <div className={classes.error__text}>
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

  if (fullScreen) return <div className={clsx(fullScreen && classes['error__full-screen'])}>{content}</div>;

  return <div className={classes.error__wrapper}>{content}</div>;
}

import { Paper, Text } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { StatsList } from '@/components/ui/stats-list';

import classes from './index.module.css';
import type { StatusCardProps } from './types';

export function StatusCard({
  title,
  color,
  channelName,
  channelCount,
  spend,
  perChannel,
  href
}: Readonly<StatusCardProps>) {
  const t = useTranslations('dashboard.overview.performanceCard.statusCard');

  const statusCard = (
    <Paper
      bg={color}
      classNames={{
        root: clsx(classes['status-card__root'], href ? classes['status-card__root--with-hover'] : '')
      }}
    >
      <Text fz="stat3" lh="body2">
        {title}
      </Text>
      <StatsList
        w={'100%'}
        grow
        list={[
          { label: channelName ?? t('sql'), value: channelCount },
          { label: t('spend'), value: spend },
          { label: t('costPer'), value: perChannel }
        ]}
      />
    </Paper>
  );

  if (href) {
    return (
      <Link className={classes['status-card__link']} href={href}>
        {statusCard}
      </Link>
    );
  }

  return statusCard;
}

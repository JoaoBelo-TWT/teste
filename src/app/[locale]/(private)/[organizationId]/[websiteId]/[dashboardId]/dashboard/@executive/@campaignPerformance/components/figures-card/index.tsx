import { Paper, Text } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';

import { Avatar } from '@/components/ui/avatar';
import { CampaignStatus } from '@/components/ui/campaign-status';
import { StatsList } from '@/components/ui/stats-list';

import classes from './index.module.css';
import { FiguresCardProps } from './types';

export function FiguresCard({
  urlSourcesImages,
  status,
  title,
  additionalAvatars,
  dateInterval,
  data,
  href
}: Readonly<FiguresCardProps>) {
  const avatars = urlSourcesImages.map((url) => <Avatar size={32} key={url} src={url} alt="Source image" />);

  const content = (
    <Paper
      classNames={{ root: clsx(classes['figures-card__root'], href && classes['figures-card__root--with-hover']) }}
    >
      <div className={classes['figures-card__header']}>
        <div className={classes['figures-card__header--title-container']}>
          <Text w={'100%'} c="var(--brand-navy-color)" lh="body2" fz="stat3" fw={400} truncate="end">
            {title}
          </Text>
          <CampaignStatus status={status} dateInterval={dateInterval} />
        </div>
        <div className={classes['figures-card__header--avatars-container']}>
          <Avatar.Group>{avatars}</Avatar.Group>
          {additionalAvatars !== 0 && <Text>+{additionalAvatars}</Text>}
        </div>
      </div>
      <div className={classes['figures-card__figures-container']}>
        <StatsList list={data} colProps={{ span: 'content' }} />
      </div>
    </Paper>
  );

  if (href) {
    return (
      <Link style={{ color: 'inherit', textDecoration: 'none' }} href={href}>
        {content}
      </Link>
    );
  }
  return content;
}

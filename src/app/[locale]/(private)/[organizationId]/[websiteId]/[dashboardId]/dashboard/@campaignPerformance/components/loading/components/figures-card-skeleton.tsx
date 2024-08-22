'use client';

import { Paper, Skeleton } from '@mantine/core';

import { StatsList } from '@/components/ui/stats-list';

import figuresCardClasses from '../../figures-card/index.module.css';
import classes from '../index.module.css';

export function FiguresCardSkeleton() {
  const avatars = Array.from({ length: 4 }, (_, index) => (
    <div key={index} className={classes.loading__avatar}>
      <Skeleton height={28} circle />
    </div>
  ));

  return (
    <Paper classNames={{ root: figuresCardClasses['figures-card__root'] }}>
      <div className={figuresCardClasses['figures-card__header']}>
        <div className={figuresCardClasses['figures-card__header--title-container']}>
          <Skeleton height={28} width={200} />
          <div className={figuresCardClasses['figures-card__header--status-container']}>
            <Skeleton height={14} width={50} />
            <Skeleton height={14} width={10} />
            <Skeleton height={14} width={100} />
          </div>
        </div>
        <div className={figuresCardClasses['figures-card__header--avatars-container']}>
          {avatars}
          <Skeleton height={18} width={20} />
        </div>
        <div className={figuresCardClasses['figures-card__header--figures-container']}>
          <StatsList
            mt={55}
            list={[
              { value: 0, label: '' },
              { value: 0, label: '' },
              { value: 0, label: '' }
            ]}
            loading
          />
        </div>
      </div>
    </Paper>
  );
}

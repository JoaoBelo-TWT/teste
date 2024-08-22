import { Paper } from '@mantine/core';
import clsx from 'clsx';

import { SPACING } from '@/resources/constants';

import { Header } from '../header';

import classes from './index.module.css';
import { BaseCardProps } from './types';

export function BaseCard({ children, headerProps, paperProps, topContent, id }: Readonly<BaseCardProps>) {
  return (
    <Paper
      id={id}
      classNames={{
        root: clsx(classes['base-card__root'], Boolean(topContent) && classes['base-card__root--top-margin'])
      }}
      shadow={paperProps?.shadow ? paperProps?.shadow : 'xs'}
      {...paperProps}
    >
      {topContent}
      {headerProps && (
        <Header titleProps={{ mt: topContent ? SPACING.sm : 0 }} title={headerProps.title}>
          {headerProps.children}
        </Header>
      )}
      {children}
    </Paper>
  );
}

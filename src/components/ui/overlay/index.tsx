import { Title } from '@mantine/core';
import { ReactElement } from 'react';

import classes from './index.module.css';

export function Overlay({ title, endContent }: Readonly<{ title: string; endContent?: ReactElement }>) {
  return (
    <div className={classes.overlay}>
      <div className={classes.overlay__background} />
      <Title className={classes.overlay__text} order={2} c={'var(--mantine-color-dark-7)'}>
        {title}
      </Title>
      {endContent}
    </div>
  );
}

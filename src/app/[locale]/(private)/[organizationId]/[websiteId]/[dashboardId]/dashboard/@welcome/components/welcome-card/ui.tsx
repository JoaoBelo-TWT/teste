'use client';

import { Paper, Title, Text } from '@mantine/core';
import clsx from 'clsx';

import { CardListItem } from '../card-list-item';

import classes from './index.module.css';
import { WelcomeCardPropsUI } from './types';

export function WelcomeCardUI({
  background,
  caption,
  heroMessage,
  description,
  bottomCards,
  ctaButton,
  variant = 'default'
}: Readonly<WelcomeCardPropsUI>) {
  return (
    <Paper
      className={clsx(classes['welcome-card__root'], {
        [classes['welcome-card__root--empty']]: variant === 'empty'
      })}
    >
      {background}
      <div className={classes['welcome-card__title']}>
        <Text fz="caption2" lh="body2" tt="uppercase">
          {caption}
        </Text>
        <Title tt="uppercase">{heroMessage}</Title>
        <div className={classes['welcome-card__cta-container']}>
          {description && (
            <Text fz="xl" lh="body2" c="dark.7">
              {description}
            </Text>
          )}
          {ctaButton}
        </div>
      </div>
      <div
        className={clsx(classes['welcome-card__list-container'], {
          [classes['welcome-card__list-container--empty']]: variant === 'empty'
        })}
      >
        {bottomCards.map((card) => (
          <CardListItem key={card.label} label={card.label} value={card.value} />
        ))}
      </div>
    </Paper>
  );
}

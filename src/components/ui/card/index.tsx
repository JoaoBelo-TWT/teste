'use client';

import { Card as MantineCard, CardSection, Text, Tooltip } from '@mantine/core';
import Link from 'next/link';

import { SPACING } from '@/resources/constants';

import { LabelChip } from '../label-chip';

import classes from './index.module.css';
import { CardProps } from './types';

export function Card({
  imageSrc,
  imageAtl,
  title,
  description,
  widgets,
  imageBgColor,
  href,
  tooltip,
  ...rest
}: Readonly<CardProps>) {
  const component = href ? Link : 'div';

  const cardContent = (
    <MantineCard
      // @ts-ignore - during build it assigns the wrong type
      href={href}
      // @ts-ignore - MantineCard accepts both but the types aren't aligning
      component={component}
      padding={0}
      shadow="var(--shadow)"
      withBorder
      radius="12px"
      classNames={{ root: classes.card__root }}
      maw="288px"
      {...rest}
    >
      <CardSection bg={imageBgColor} classNames={{ section: classes.card__section }}>
        <LabelChip className={classes.card__chip} label={`${widgets}`} />
        <div className={classes['card__image-container']}>
          <img className={classes.card__image} width={500} height={500} src={imageSrc} alt={imageAtl} />
        </div>
      </CardSection>
      <CardSection pt="16px" pb="32px" pr="24px" pl="24px">
        <Text fz="stat3" lh="stat3">
          {title}
        </Text>
        <Text fz="body2" lh="body2">
          {description}
        </Text>
      </CardSection>
    </MantineCard>
  );

  return tooltip ? (
    <Tooltip.Floating multiline w={300} p={SPACING.sm} label={tooltip}>
      {cardContent}
    </Tooltip.Floating>
  ) : (
    cardContent
  );
}

import { Flex, Text, Title } from '@mantine/core';
import { ArrowClockwise } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';

import { SPACING } from '@/resources/constants';

import { BaseCard } from '../base-card';
import { Button } from '../button';

import classes from './index.module.css';
import { ErrorCardProps } from './types';

export function ErrorCard({ children, message, reset, headerProps, paperProps }: Readonly<ErrorCardProps>) {
  const t = useTranslations();

  return (
    <BaseCard
      paperProps={{
        classNames: { root: classes['error-card__root'] },
        ...paperProps
      }}
      {...headerProps}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}gradients/Conversion_Coral.svg`}
        alt="Background"
        className={classes['error-card__image']}
      />
      <Flex direction="column" align="center" justify="center" gap={SPACING.sm}>
        <Title order={3} ta="center">
          {t('components.errorCard.title')}
        </Title>
        {message && (
          <Text c={'var(--mantine-color-dark-0)'} ta="center">
            {message}
          </Text>
        )}
        {children}
        <Button bg={'white'} c="black" leftSection={<ArrowClockwise size={16} />} onClick={() => reset()}>
          {t('common.reload')}
        </Button>
      </Flex>
    </BaseCard>
  );
}

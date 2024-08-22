'use client';

import { Text } from '@mantine/core';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { toCamelCase } from '@/utils/strings/to-camel-case';

import classes from './index.module.css';
import { StatusChipProps } from './types';

export function StatusChip({ label, status, loading, variant = 'default' }: Readonly<StatusChipProps>) {
  const t = useTranslations();
  return (
    <div
      data-dot={status as string}
      className={clsx(classes['status-chip__container'], classes[`status-chip__container--${variant}`])}
    >
      {status && (
        <div
          className={clsx(
            classes['status-chip__dot'],
            loading
              ? classes['status-chip__dot--default']
              : classes[`status-chip__dot--${toCamelCase(status.toLowerCase())}`]
          )}
        />
      )}
      <Text size="body2" c="var(--mantine-color-dark-8)">
        {loading ? t('common.loadingText') : label}
      </Text>
    </div>
  );
}

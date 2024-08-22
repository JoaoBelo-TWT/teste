'use client';

import { Flex, Text } from '@mantine/core';
import Flag from 'react-flagkit';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';

export function RoundFlag({ countryCode, label }: { countryCode?: string | null; label: string }) {
  return (
    <Flex align="center" gap={SPACING.xs}>
      {countryCode && (
        <Flex className={classes['round-flag']} align="center" justify="center">
          <Flag size={46} country={countryCode} />
        </Flex>
      )}
      <Text size="body2">{label}</Text>
    </Flex>
  );
}

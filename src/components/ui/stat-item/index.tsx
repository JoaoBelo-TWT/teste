import { Flex, Skeleton, Text } from '@mantine/core';

import { SPACING } from '@/resources/constants';

import { Avatar } from '../avatar';

import { StatItemProps } from './types';

export function StatItem({ label, value, variant = 'default', loading, ...rest }: StatItemProps) {
  if (variant === 'avatar') {
    return (
      <>
        <Avatar src={typeof value === 'string' ? value : undefined} size={26} mb={7} />
        <Text size="caption2" tt="uppercase">
          {label}
        </Text>
      </>
    );
  }

  return (
    <Flex gap={variant !== 'default' ? 0 : SPACING.xxs} direction="column" {...rest}>
      {loading ? (
        <>
          <Skeleton
            mb={variant !== 'default' ? 12 : 5}
            w={variant !== 'default' ? 55 : 34}
            h={variant !== 'default' ? 35 : 25}
          />
          <Skeleton w={variant !== 'default' ? 75 : 50} h={15} />
        </>
      ) : (
        <>
          <Text size={variant !== 'default' ? 'stat2' : 'stat3'} fw={400}>
            {value}
          </Text>
          <Text size="caption2" tt="uppercase">
            {label}
          </Text>
        </>
      )}
    </Flex>
  );
}

import { Flex, Skeleton, Box } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';

import classes from '../acquisition-performance/index.module.css';

export function AcquisitionPerformanceSkeleton() {
  return (
    <BaseCard
      headerProps={{
        title: (
          <Box>
            <Skeleton height={32} width={350} mb={4} />
            <Skeleton height={19} width={80} />
          </Box>
        ),
        children: (
          <Flex h={61} gap={10} align="center">
            <Skeleton height={44} width={150} radius={'xl'} />
            <Skeleton height={44} width={110} radius={'xl'} />
          </Flex>
        )
      }}
    >
      <div className={classes['acquisition-performance__container']}>
        <Skeleton height={353} width="100%" />
      </div>
    </BaseCard>
  );
}

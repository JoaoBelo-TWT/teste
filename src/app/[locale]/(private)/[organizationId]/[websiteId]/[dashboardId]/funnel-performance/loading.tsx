import { Skeleton } from '@mantine/core';

import { BaseCard } from '@/components/ui/base-card';
import { LoadingBreadcrumbs } from '@/components/ui/breadcrumbs/loading';
import { StatsList } from '@/components/ui/stats-list';
import { SPACING } from '@/resources/constants';

export default function LoadingFunnelsDeepDive() {
  return (
    <>
      <BaseCard
        topContent={<LoadingBreadcrumbs />}
        paperProps={{ h: 'auto', mb: SPACING.xs }}
        headerProps={{
          title: <Skeleton h={40} w={120} mt={SPACING.md} />,
          children: <Skeleton radius={100} h={44} w={153} mt={SPACING.md} />
        }}
      >
        <StatsList
          mt={42}
          variant="large"
          list={[
            { value: 0, label: '' },
            { value: 0, label: '' }
          ]}
          loading
        />
        <Skeleton mt={50} h={400} w="100%" radius={10} />
      </BaseCard>
    </>
  );
}

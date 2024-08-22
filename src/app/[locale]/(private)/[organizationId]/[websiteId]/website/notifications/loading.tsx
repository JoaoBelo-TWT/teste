import { Flex, Skeleton } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { BaseCard } from '@/components/ui/base-card';
import { SPACING } from '@/resources/constants';

export default async function NotificationsPageLoading() {
  const t = await getTranslations();
  return (
    <Flex w="100%">
      <BaseCard headerProps={{ title: t('general.navigation.notifications') }}>
        <Skeleton mb={SPACING.sm} mt={SPACING.md} w="100%" h={100} />
        <Skeleton mb={SPACING.sm} w="100%" h={105} />
        <Skeleton mb={SPACING.sm} w="100%" h={105} />
        <Skeleton mb={SPACING.sm} w="100%" h={105} />
        <Skeleton mb={SPACING.sm} w="100%" h={105} />
        <Skeleton mb={SPACING.sm} w="100%" h={105} />
        <Flex direction="column" align="center" justify="center" mt={SPACING.md}>
          <Skeleton mb={SPACING.sm} radius="xl" h={44} w={120} />
        </Flex>
      </BaseCard>
    </Flex>
  );
}

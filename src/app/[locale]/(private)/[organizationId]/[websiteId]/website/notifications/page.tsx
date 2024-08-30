import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { BaseCard } from '@/components/ui/base-card';

import NotificationsList from './components/list';

export default async function NotificationsPage() {
  const t = await getTranslations();

  return (
    <Flex w="100%">
      <BaseCard headerProps={{ title: t('general.navigation.notifications') }}>
        <NotificationsList />
      </BaseCard>
    </Flex>
  );
}

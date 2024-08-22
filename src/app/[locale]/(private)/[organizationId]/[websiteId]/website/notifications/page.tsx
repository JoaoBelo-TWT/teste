import { Flex } from '@mantine/core';
import { getTranslations } from 'next-intl/server';

import { BaseCard } from '@/components/ui/base-card';
import { fetchNotifications } from '@/lib/fetch-notifications';

import EmptyNotifications from './components/empty';
import NotificationsList from './components/list';

export default async function NotificationsPage({
  params
}: Readonly<{ params: { websiteId: string; organizationId: string } }>) {
  const t = await getTranslations();
  const notificationsData = await fetchNotifications(params.websiteId, 6);

  return (
    <Flex w="100%">
      <BaseCard headerProps={{ title: t('general.navigation.notifications') }}>
        {!notificationsData?.data.notifications || notificationsData?.data.notifications.edges.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <NotificationsList notificationsData={notificationsData?.data.notifications} />
        )}
      </BaseCard>
    </Flex>
  );
}

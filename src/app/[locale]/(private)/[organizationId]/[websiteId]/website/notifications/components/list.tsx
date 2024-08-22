'use client';

import { useSuspenseQuery } from '@apollo/client';
import { Box, Flex } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';

import { NotificationCard } from '@/components/ui/notification-card';
import { useNavigationStore } from '@/context/navigation/store';
import { useFormatPastDate } from '@/hooks/use-format-past-date';
import { getWebsiteNotificationsQuery } from '@/lib/apollo/queries/website-notifications';
import { SPACING } from '@/resources/constants';

import { DashboardPathParams } from '../../../[dashboardId]/dashboard/types';

import { ShowMoreButton } from './show-more-button';
import { NotificationsListProps } from './types';

export default function NotificationsList({ notificationsData }: Readonly<NotificationsListProps>) {
  const { websiteId } = useParams<DashboardPathParams>();
  const { filters } = useNavigationStore();
  const { formatPastDate } = useFormatPastDate();
  const { data: notificationsClient, fetchMore } = useSuspenseQuery(getWebsiteNotificationsQuery, {
    variables: {
      websiteId,
      take: filters.notifications || 6
    }
  });

  useEffect(() => {
    fetchMore({
      variables: {
        take: filters.notifications
      }
    });
  }, [filters.notifications, fetchMore]);

  const websiteNotifications = useMemo(
    () => notificationsClient?.notifications ?? notificationsData,
    [notificationsClient?.notifications, notificationsData]
  );

  const cards = useMemo(
    () =>
      websiteNotifications?.edges.map((notification) => (
        <NotificationCard
          mb={SPACING.sm}
          key={notification.node.id}
          type={notification.node.notificationType}
          title={notification.node.title}
          message={notification.node.message}
          createdAt={formatPastDate(notification.node.createdAt)}
        />
      )),
    [websiteNotifications?.edges, formatPastDate]
  );

  const showMoreButton = useMemo(
    () => websiteNotifications.pageInfo.hasNextPage,
    [websiteNotifications.pageInfo.hasNextPage]
  );

  return (
    <Box mt={SPACING.md}>
      {cards}
      {showMoreButton && (
        <Flex direction="column" align="center" justify="center" mt={SPACING.md}>
          <ShowMoreButton />
        </Flex>
      )}
    </Box>
  );
}

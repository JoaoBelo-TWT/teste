'use client';

import { Box, Button, Flex } from '@mantine/core';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { NotificationCard } from '@/components/ui/notification-card';
import { useFormatPastDate } from '@/hooks/use-format-past-date';
import { useQueryPaginatedNotifications } from '@/lib/react-query/notification/query-paginated-notifications';
import { SPACING } from '@/resources/constants';

import { DashboardPathParams } from '../../../[dashboardId]/dashboard/types';

import EmptyNotifications from './empty';

export default function NotificationsList() {
  const t = useTranslations();
  const { websiteId } = useParams<DashboardPathParams>();
  const { formatPastDate } = useFormatPastDate();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useQueryPaginatedNotifications({
    websiteId,
    first: 6
  });

  const cards = useMemo(
    () =>
      data.pages.map((notification) => (
        <NotificationCard
          mb={SPACING.sm}
          key={notification.node.id}
          type={notification.node.notificationType}
          title={notification.node.title}
          message={notification.node.message}
          createdAt={formatPastDate(notification.node.createdAt)}
        />
      )),
    [data.pages, formatPastDate]
  );

  if (!data.pages.length) {
    return <EmptyNotifications />;
  }

  return (
    <Box mt={SPACING.md}>
      {cards}
      {hasNextPage && (
        <Flex direction="column" align="center" justify="center" mt={SPACING.md}>
          <Button size="medium" variant="outline" onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
            {t('common.showMore')}
          </Button>
        </Flex>
      )}
    </Box>
  );
}

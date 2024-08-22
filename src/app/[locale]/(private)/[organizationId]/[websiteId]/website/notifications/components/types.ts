import { GetNotificationsQuery } from '@/__generated__/graphql';

export interface NotificationsListProps {
  notificationsData: GetNotificationsQuery['notifications'];
}

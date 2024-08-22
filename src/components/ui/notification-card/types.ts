import { NotificationType } from '@/__generated__/graphql';

export interface Notification {
  type?: NotificationType | 'default';
  message: string;
  title: string;
  createdAt: string;
  showDot?: boolean;
}

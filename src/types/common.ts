import { STAT_VARIANT } from '@/resources/constants';

export interface EmptyStateProps {
  variant?: 'no-goals' | 'no-data';
  dashboardId: string;
  websiteId: string;
  organizationId: string;
}

export type StatVariantType = (typeof STAT_VARIANT)[keyof typeof STAT_VARIANT];

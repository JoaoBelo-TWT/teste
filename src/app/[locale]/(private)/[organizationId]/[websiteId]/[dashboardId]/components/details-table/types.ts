import { PaginationState } from '@tanstack/react-table';

import { GetChannelPerformanceDeepDiveActivityDetailsQuery } from '@/__generated__/graphql';

/* eslint-disable i18next/no-literal-string */
export const DetailPage = {
  DIRECT: 'direct',
  SEARCH: 'search',
  SOCIAL: 'social',
  REFERRALS: 'referrals',
  EMAIL: 'email'
} as const;

export type DetailPageType = (typeof DetailPage)[keyof typeof DetailPage];

export interface DetailsPageProps {
  variant: DetailPageType;
  pagination: PaginationState;
  data: GetChannelPerformanceDeepDiveActivityDetailsQuery | null;
}

export type ItemProps = {
  id: string;
  source?: string;
  sourceImage?: string;
  region: string;
  country?: string;
  email: string;
  pageUrl?: string;
  stage: string;
  searchTerm?: string;
};

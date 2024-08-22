import { ReactNode } from 'react';

import { GetDashboardOverviewQuery } from '@/__generated__/graphql';

export interface WelcomeCardProps {
  dashboardOverview: GetDashboardOverviewQuery['dashboardOverview'];
  name: string;
}

export interface CardProps {
  label: string;
  value: string;
}
export interface WelcomeCardPropsUI {
  background?: ReactNode;
  caption: string;
  heroMessage: string;
  bottomCards: CardProps[];
  description?: string;
  ctaButton?: ReactNode;
  variant?: 'default' | 'empty';
}

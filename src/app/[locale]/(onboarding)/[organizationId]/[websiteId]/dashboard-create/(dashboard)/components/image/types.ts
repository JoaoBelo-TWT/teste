import { BoxProps } from '@mantine/core';

import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

export type OnboardingContainerProps = {
  children: React.ReactNode;
  organizationId: string;
  websiteId: string;
  dashboardId?: string;
  navigation?: boolean;
  boxProps?: BoxProps;
};

export type RightColumnConfig = {
  [key in OnboardingFlowType]: {
    imageSrc: string;
    bgClass: string;
    alt: string;
  };
};

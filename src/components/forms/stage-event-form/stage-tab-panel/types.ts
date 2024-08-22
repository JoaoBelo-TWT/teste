import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

export type StageTabPanelProps = {
  name: string;
  currentStageId: string;
  dashboardId: string;
  websiteId: string;
  nextStageId?: string;
  flow: OnboardingFlowType;
};

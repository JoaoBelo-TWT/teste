import { OnboardingFlowType } from '../enums/new-dashboard-query-params';
import { QueryParamsObject } from '../query-params-object';

export type GoalsModalType = 'activity' | 'budget';

export type OnboardingQueryParamsProps = {
  flow: OnboardingFlowType;
  modal?: GoalsModalType;
};

export const OnboardingQueryParams: QueryParamsObject<OnboardingQueryParamsProps> = {
  flow: {
    key: 'flow',
    default: OnboardingFlowType.EXECUTIVE
  }
};

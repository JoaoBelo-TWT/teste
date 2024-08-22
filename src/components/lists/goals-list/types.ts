import { ActivityGoal, BudgetGoal } from '@/__generated__/graphql';

export type ItemProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  hideChildren?: boolean;
};

export type GoalsListProps = {
  dashboardId: string;
  budget?: BudgetGoal;
  activity?: ActivityGoal;
  isEdit?: boolean;
  viewOnly?: boolean;
  isOnboarding?: boolean;
};

import { ComboboxData } from '@mantine/core';

import { ActivityGoal } from '@/__generated__/graphql';

export type ActivityGoalFormProps = {
  activityGoal: ActivityGoal;
  dashboardId: string;
  customerFunnelStages: ComboboxData;
};

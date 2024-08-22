import { CustomerFunnelStageEventCondition, EventType, GetStageQuery } from '@/__generated__/graphql';
/* eslint-disable max-len */
import { UpdateStageEventsFormData } from '@/components/forms/stage-event-form/schema';
import { StageEventsData } from '@/components/forms/stage-event-form/types';

export const transformStageData = (queryData: GetStageQuery): StageEventsData | null => {
  const customerFunnelStageEvent = queryData?.customerFunnelStage.customerFunnelStageEvents?.[0];

  if (!customerFunnelStageEvent) return null;

  const initialValues = {
    pageViewConditions: [] as Partial<CustomerFunnelStageEventCondition>[],
    actionConditions: [] as Partial<CustomerFunnelStageEventCondition>[]
  };

  const conditions = customerFunnelStageEvent.customerFunnelStageEventConditions?.reduce(
    (acc, { pageUrl, visitorType, startingUrl, destinationUrl, destinationUrlCondition, startingUrlCondition }) => {
      const isPageView = customerFunnelStageEvent.eventType === EventType.PageView;

      if (isPageView) {
        acc.pageViewConditions.push({ pageUrl, visitorType });
      } else {
        acc.actionConditions.push({ startingUrl, destinationUrl, destinationUrlCondition, startingUrlCondition });
      }
      return acc;
    },
    initialValues
  );

  const values = {
    name: customerFunnelStageEvent.name,
    ...conditions
  } as UpdateStageEventsFormData;

  return { eventType: customerFunnelStageEvent.eventType, values };
};

import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { EventType } from '@/__generated__/graphql';
import { UpdateStageEventsFormData } from '@/components/forms/stage-event-form/schema';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

export type StageEventsData = { values: UpdateStageEventsFormData; eventType: EventType };

export type StageEventFormProps = {
  funnelStageId: string;
  nextStageId?: string;
  dashboardId?: string;
  data: StageEventsData | null;
  flow?: OnboardingFlowType;
  isOnboarding?: boolean;
  isOnEditModal?: boolean;
  hideSubmitButton?: boolean;
};

export type TouchedFields = {
  destinationUrlCondition?: boolean;
  startingUrlCondition?: boolean;
  startingUrl?: boolean;
  destinationUrl?: boolean;
}[];

export interface TabProps {
  register: UseFormRegister<UpdateStageEventsFormData>;
  control: Control<UpdateStageEventsFormData>;
  errors: FieldErrors<UpdateStageEventsFormData>;
  touchedFields?: boolean | TouchedFields;
}

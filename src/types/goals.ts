import { z } from 'zod';

import { RecurringRepeat, VisitorType } from '@/__generated__/graphql';
import { TFunction } from '@/types/t-function';

export const VisitorTypes = z.nativeEnum(VisitorType);

export const ActivityGoalSchema = (t: TFunction) =>
  z.object({
    numberOfEvents: z
      .number({
        required_error: t('validation.numberOfEvents'),
        invalid_type_error: t('validation.mustBeNumber')
      })
      .int(t('validation.mustBeNumber'))
      .min(1, { message: t('validation.positiveNumber') }),
    customerFunnelStageId: z
      .string()
      .min(1, { message: t('validation.requiredField', { fieldName: 'Customer funnel stage' }) })
  });

export type ActivityGoalFormData = z.infer<ReturnType<typeof ActivityGoalSchema>>;

export const RecurringRepeatType = z.nativeEnum(RecurringRepeat);
export const BudgetGoalSchema = (t: TFunction) =>
  z.object({
    recurring: z.boolean(),
    value: z
      .number({
        required_error: t('validation.budget'),
        invalid_type_error: t('validation.positiveNumber')
      })
      .int(t('validation.mustBeNumber'))
      .min(1, { message: t('validation.positiveNumber') })
      .max(99999999, { message: t('validation.maxValue') }),
    recurringRepeat: RecurringRepeatType
  });

export type BudgetGoalFormData = z.infer<ReturnType<typeof BudgetGoalSchema>>;

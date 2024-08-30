import { z } from 'zod';

import { Channels, ExpensesCategory, RecurringRepeat } from '@/__generated__/graphql';
import { TFunction } from '@/types/t-function';

const RECURRING_REPEAT = 'recurringRepeat';

export const AddExpenseSchema = (t: TFunction) =>
  z
    .object({
      amount: z.number().min(1, t('validation.amount')),
      name: z.string().min(1, t('validation.requiredField', { fieldName: 'Description' })),
      category: z.nativeEnum(ExpensesCategory, { required_error: t('validation.category') }),
      channels: z.array(z.nativeEnum(Channels), {
        required_error: t('validation.requiredFieldPlural', { fieldName: t('modals.createExpense.channelsLabel') })
      }),
      recurring: z.boolean().optional().default(false),
      recurringRepeat: z.nativeEnum(RecurringRepeat).optional()
    })
    // check if recurring is true, then recurringRepeat is required
    .refine(
      (schema) => {
        if (schema.recurring && !schema.recurringRepeat) {
          return false;
        }

        return true;
      },
      {
        message: t('validation.requiredField', { fieldName: 'Expense term' }),
        path: [RECURRING_REPEAT]
      }
    );

export type AddExpenseFormData = z.infer<ReturnType<typeof AddExpenseSchema>>;

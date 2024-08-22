import { z } from 'zod';

import { TFunction } from '@/types/t-function';

export const ConnectGoogleAddsSchema = (t: TFunction) =>
  z.object({
    customerId: z
      .string()
      .regex(/^\d{3}-\d{3}-\d{4}$/, {
        message: t('validation.invalidFormat')
      })
      .min(1, { message: t('validation.requiredField') })
  });

export type ConnectGoogleAddsFormData = z.infer<ReturnType<typeof ConnectGoogleAddsSchema>>;

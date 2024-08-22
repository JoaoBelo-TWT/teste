import { z } from 'zod';

import { TFunction } from '@/types/t-function';

export const RequestConnectionSchema = (t: TFunction) =>
  z.object({
    requestedConnection: z
      .string()
      .min(1, { message: t('validation.requiredField', { fieldName: 'Requested connection' }) })
  });

export type RequestConnectionFormData = z.infer<ReturnType<typeof RequestConnectionSchema>>;

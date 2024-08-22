import { z } from 'zod';

import { TFunction } from '@/types/t-function';

export const Step1Schema = (t: TFunction) =>
  z.object({
    firstName: z.string().min(3, t('validation.firstName')),
    lastName: z.string().min(3, t('validation.lastName')),
    companyRoleId: z.string().min(1, t('validation.role'))
  });

export type Step1FormData = z.infer<ReturnType<typeof Step1Schema>>;

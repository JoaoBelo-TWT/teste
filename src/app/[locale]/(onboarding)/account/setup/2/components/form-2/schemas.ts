import { z } from 'zod';

import { TFunction } from '@/types/t-function';

export const Step2Schema = (t: TFunction) =>
  z.object({
    companyIndustryId: z.string().min(1, t('validation.industry')),
    companySizeId: z.string().min(1, t('validation.requiredField', { fieldName: 'Company size' })),
    name: z.string().min(3, t('validation.company'))
  });

export type Step2FormData = z.infer<ReturnType<typeof Step2Schema>>;

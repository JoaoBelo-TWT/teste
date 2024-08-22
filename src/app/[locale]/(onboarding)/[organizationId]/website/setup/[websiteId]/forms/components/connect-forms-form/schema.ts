import { z } from 'zod';

import { TFunction } from '@/types/t-function';
import { UrlSchema } from '@/utils/custom-validations/url-schema';

export const ConnectFormsFormSchema = (t: TFunction) =>
  z.object({
    forms: z.array(
      z.object({
        url: UrlSchema,
        field: z
          .string()
          .min(1, { message: t('validation.requiredField', { fieldName: t('onboarding.setup.step4.fieldLabel') }) })
      })
    )
  });

export type ConnectFormsFormData = z.infer<ReturnType<typeof ConnectFormsFormSchema>>;

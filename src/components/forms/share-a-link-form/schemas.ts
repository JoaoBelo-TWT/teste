import { z } from 'zod';

import { TFunction } from '@/types/t-function';

export const ShareALinkSchema = (t: TFunction) =>
  z.object({
    recipients: z.array(
      z.object({
        assignTo: z
          .string()
          .min(1, { message: t('validation.requiredField', { fieldName: t('modals.shareALink.assignTo') }) }),
        email: z
          .string()
          .email({ message: t('validation.email') })
          .min(1, { message: t('validation.requiredField', { fieldName: t('modals.shareALink.email') }) }),
        message: z
          .string()
          .min(1, { message: t('validation.requiredField', { fieldName: t('modals.shareALink.message') }) })
      })
    )
  });

export type ShareALinkFormData = z.infer<ReturnType<typeof ShareALinkSchema>>;

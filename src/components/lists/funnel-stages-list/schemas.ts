import { z } from 'zod';

import { TFunction } from '@/types/t-function';

export const CreateFunnelSchema = (t: TFunction) =>
  z.object({
    stages: z
      .array(
        z.object({
          dashboardId: z.string().min(1, t('validation.dashboardId')),
          name: z.string().min(1, t('validation.funnelName')),
          id: z.string().nullable().optional()
        })
      )
      .min(1)
  });

export type CreateFunnelFormData = z.infer<ReturnType<typeof CreateFunnelSchema>>;

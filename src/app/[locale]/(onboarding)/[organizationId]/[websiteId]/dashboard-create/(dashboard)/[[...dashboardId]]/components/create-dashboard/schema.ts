import { z } from 'zod';

import { TFunction } from '@/types/t-function';

/** Create */
export const CreateDashboardSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(3, t('validation.dashboardName')).max(50, t('validation.lessThan50Characters'))
  });

export type CreateDashboardFormData = z.infer<ReturnType<typeof CreateDashboardSchema>>;

import { z } from 'zod';

import { TFunction } from '@/types/t-function';

const MAX_FILE_SIZE = 800000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const websiteFormSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(2, t('validation.websiteName')),
    image: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, t('validation.fileSize'))
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), t('validation.fileType'))
      .nullable(),
    organizationId: z.string()
  });

export type WebsiteFormData = z.infer<ReturnType<typeof websiteFormSchema>>;

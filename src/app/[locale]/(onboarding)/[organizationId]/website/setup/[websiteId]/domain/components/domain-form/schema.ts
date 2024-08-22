import { z } from 'zod';

import { UrlSchema } from '@/utils/custom-validations/url-schema';

export const DomainFormSchema = z.object({
  domain: UrlSchema,
  id: z.string()
});

export type DomainFormData = z.infer<typeof DomainFormSchema>;

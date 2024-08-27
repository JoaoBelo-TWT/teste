import { z } from 'zod';

import { TFunction } from '@/types/t-function';

const INVALID_URL = 'Invalid URL';

export const UrlSchema = z
  .string()
  .regex(/^(https?:\/\/)?(www\.)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/, INVALID_URL)
  .min(1, { message: INVALID_URL });

export const RefinedUrlSchema = (t: TFunction) =>
  z
    .string()
    .min(1, { message: t('validation.invalidUrl') }) // Ensure the string is not empty
    /* eslint-disable i18next/no-literal-string */
    .refine((url) => url.startsWith('https://'), { message: t('validation.missingHttps') })
    .refine((url) => /^https:\/\/www\.[\w-]+(\.[\w-]+)+(\/[\w-./?%&=]*)?$/.test(url), { message: INVALID_URL });

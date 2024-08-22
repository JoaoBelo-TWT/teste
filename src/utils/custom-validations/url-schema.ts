import { z } from 'zod';

const INVALID_URL = 'Invalid URL';

export const UrlSchema = z
  .string()
  .regex(/^(https?:\/\/)?(www\.)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/, INVALID_URL)
  .min(1, { message: INVALID_URL });

import { z } from 'zod';

import { AccessLevel } from '@/__generated__/graphql';
import { TFunction } from '@/types/t-function';

export const InviteMembersSchema = (t: TFunction) =>
  z.object({
    organizationId: z.string(),
    permissions: z.array(
      z.object({
        email: z
          .string({ required_error: t('validation.requiredField', { fieldName: 'email' }) })
          .email(t('validation.email')).trim(),
        accessLevel: z.nativeEnum(AccessLevel)
      })
    )
  });

export type InviteMembersFormData = z.infer<ReturnType<typeof InviteMembersSchema>>;

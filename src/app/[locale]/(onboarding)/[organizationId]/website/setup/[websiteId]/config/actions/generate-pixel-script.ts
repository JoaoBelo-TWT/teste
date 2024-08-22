'use server';

import { getTranslations } from 'next-intl/server';

import { getClient } from '@/lib/apollo/apollo-client';
import { generatePixelScriptQuery } from '@/lib/apollo/queries/generate-pixel-script';
import { nextCacheTags } from '@/types/constants/next-cache-tags';
import { ServerActionResponse } from '@/types/server-action-response';

export async function generatePixelScript(websiteId: string): Promise<ServerActionResponse<string>> {
  const t = await getTranslations();

  try {
    await getClient().query({
      query: generatePixelScriptQuery,
      variables: { websiteId },
      context: {
        fetchOptions: {
          next: {
            tags: [nextCacheTags.generatePixelScriptQuery]
          }
        }
      }
    });

    return { successMessage: t('actions.generatePixelScript.successMessage') };
  } catch (error) {
    return { errorMessage: t('actions.generatePixelScript.errorMessage') };
  }
}

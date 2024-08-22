'use server';

import { getTranslations } from 'next-intl/server';

import { fetchSourceConnectionStatus } from '@/lib/fetch-connection-status';
import { fetchHubspotConnectionStatus } from '@/lib/fetch-hubspot-connection-status';
import { ConnectionStatus } from '@/types/connection';
import { ServerActionResponse } from '@/types/server-action-response';

export async function GetScript(url: string | null | undefined): Promise<ServerActionResponse<string>> {
  const t = await getTranslations('actions.getSnippet');

  try {
    if (url) {
      const response = await fetch(url);
      const html = await response.text();

      if (response.ok) {
        return { data: html };
      }
    }

    return { errorMessage: t('errorMessage') };
  } catch (error) {
    return { errorMessage: t('errorMessage') };
  }
}

export async function getSourceConnectionStatus(websiteId: string): Promise<boolean> {
  return fetchSourceConnectionStatus(websiteId);
}

export async function getHubspotConnectionStatus(websiteId: string): Promise<ConnectionStatus> {
  return fetchHubspotConnectionStatus(websiteId);
}

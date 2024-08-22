import { fetchWebsitesData } from '@/lib/fetch-websites';

import { WebsiteButton } from './website-button';

export async function WebsiteButtonWrapper({
  organizationId,
  activeWebsiteId
}: Readonly<{ organizationId: string; activeWebsiteId: string }>) {
  const data = await fetchWebsitesData(organizationId);
  return data ? <WebsiteButton data={data} organizationId={organizationId} activeWebsiteId={activeWebsiteId} /> : null;
}

import { WebsiteButton } from './website-button';

export function WebsiteButtonWrapper({
  organizationId,
  activeWebsiteId
}: Readonly<{ organizationId: string; activeWebsiteId: string }>) {
  return <WebsiteButton organizationId={organizationId} activeWebsiteId={activeWebsiteId} />;
}

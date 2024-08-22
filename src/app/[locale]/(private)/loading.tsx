import { SpinnerFullPage } from '@/components/ui/spinner-full-page';

import { Structure } from './[organizationId]/[websiteId]/components/wrappers/structure';

export default function LoadingHome() {
  return (
    <Structure>
      <SpinnerFullPage />
    </Structure>
  );
}

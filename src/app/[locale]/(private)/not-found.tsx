import NotFound from '@/components/sections/not-found';

import { Structure } from './[organizationId]/[websiteId]/components/wrappers/structure';

export default function NotFound404() {
  return (
    <Structure>
      <NotFound />
    </Structure>
  );
}

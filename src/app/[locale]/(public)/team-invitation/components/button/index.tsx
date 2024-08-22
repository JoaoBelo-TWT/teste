'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';

export function AuthorizedTeamInvitationButton({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Button size="md" variant="filled" onClick={() => setLoading(true)} loading={loading}>
      {children}
    </Button>
  );
}

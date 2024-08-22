'use client';

import { Plus } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { AccessLevel } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

export function InviteTeamMembersButton({
  currentUserAccessLevel
}: Readonly<{
  currentUserAccessLevel: AccessLevel | undefined;
}>) {
  const t = useTranslations('organization-settings');
  const { setModal } = useModal();

  return (
    <Button
      disabled={currentUserAccessLevel !== AccessLevel.Admin}
      size="medium"
      variant="filled"
      leftSection={<Plus size={16} />}
      onClick={() => setModal(MODALS.INVITE_MEMBERS)}
      px={20}
    >
      {t('inviteTeamMembers')}
    </Button>
  );
}

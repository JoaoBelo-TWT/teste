'use client';

import { Trash } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

export function RemoveTeamMemberButton({ name, permissionId }: Readonly<{ name: string; permissionId?: string }>) {
  const t = useTranslations('organization-settings.teamMembersTable');
  const { setData, setModal } = useModal();

  return (
    <IconButton
      variant="transparent"
      onClick={() => {
        setModal(MODALS.REMOVE_TEAM_MEMBER);
        setData({ name, permissionId });
      }}
    >
      <Tooltip label={t('removeButton')} w={'fit-content'}>
        <Trash color="var(--mantine-color-dark-9)" size={24} />
      </Tooltip>
    </IconButton>
  );
}

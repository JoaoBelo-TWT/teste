'use client';

import { useTranslations } from 'next-intl';

import { ModalHeader } from '@/components/modals/modal-header';

import { InviteTeamMembersForm } from '../invite-team-members-form';

export function InviteTeamMembersModal() {
  const t = useTranslations('organization-settings');

  return (
    <>
      <ModalHeader title={t('inviteTeamMembers')} />
      <InviteTeamMembersForm />
    </>
  );
}

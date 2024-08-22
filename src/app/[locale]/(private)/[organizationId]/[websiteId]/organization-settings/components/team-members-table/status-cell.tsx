import { Divider } from '@mantine/core';
import { ArrowClockwise } from '@phosphor-icons/react/dist/ssr';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { AccessLevel, MembersInvitationStatus } from '@/__generated__/graphql';
import { Dot } from '@/components/ui/dot';
import { IconButton } from '@/components/ui/icon-button';
import { Tooltip } from '@/components/ui/tooltip';
import { showResponseToast } from '@/utils/server-actions/show-response-toast';

import { CreatePermissions } from '../invite-team-members-form/action';

import classes from './index.module.css';

export function StatusCell({
  email,
  accessLevel,
  status
}: Readonly<{ email: string; accessLevel: AccessLevel; status: MembersInvitationStatus | undefined }>) {
  const params = useParams<{ organizationId: string; dashboardId: string; websiteId: string }>();
  const t = useTranslations('organization-settings');
  const isActive = status === MembersInvitationStatus.Active;

  const sessionStorageKey = `invite-resend-disabled-${email}-${params.organizationId}`;

  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(
    () => sessionStorage.getItem(sessionStorageKey) === 'true'
  );

  const resendInvite = async () => {
    setButtonDisabled(true);
    /* eslint-disable i18next/no-literal-string */
    sessionStorage.setItem(sessionStorageKey, 'true');

    try {
      const response = await CreatePermissions({
        organizationId: params.organizationId,
        permissions: [{ email, accessLevel }]
      });

      showResponseToast({ response, showSuccessMessages: !!response?.successMessage });
    } catch {
      // Handle errors if needed, but do not re-enable the button
    }
  };

  return (
    <div className={classes['team-members-table__status-cell']}>
      <Dot color={isActive ? 'green' : 'orange'} />
      {isActive ? t('memberStatus.active') : t('memberStatus.inviteSent')}
      {!isActive && (
        <div className={classes['team-members-table__resent-container']}>
          <Divider orientation="vertical" />
          <Tooltip label={t('resendInvite')}>
            <IconButton onClick={resendInvite} disabled={isButtonDisabled} variant="subtle">
              <ArrowClockwise size={24} />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

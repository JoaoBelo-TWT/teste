'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { routes } from '@/routes/routes';
import { getQueryParamIfDefined } from '@/utils/query-params/get-query-param-if-defined';

export function UnauthorizedTeamInvitation({
  email,
  organizationName,
  organizationImage
}: Readonly<{ email: string; organizationName?: string; organizationImage?: string }>) {
  const t = useTranslations();
  const router = useRouter();
  const [loading, setIsLoading] = useState<boolean>();

  const handleJoin = () => {
    setIsLoading(true);
    router.push(
      `${routes.api.signup.path}?${getQueryParamIfDefined('login_hint', email)}` +
        `${getQueryParamIfDefined('organizationName', organizationName, true)}` +
        `${getQueryParamIfDefined('organizationImage', organizationImage, true)}`
    );
  };

  return (
    <Button size="md" variant="filled" onClick={handleJoin} loading={loading}>
      {t('onboarding.teamInvitation.button')}
    </Button>
  );
}

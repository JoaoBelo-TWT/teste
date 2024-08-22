'use client';

import { ArrowsClockwise, Clock } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { toaster } from '@/components/ui/toast';
import { routes } from '@/routes/routes';

import { auth0GetUser } from '../action/auth0-get-user';
import { auth0ResendVerificationEmailJob } from '../action/auth0-resend-verification-email-job';

export function ResendEmailButton() {
  const t = useTranslations();
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);

  useEffect(() => {
    if (isDisabled) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    setCountdown(60);
    return undefined;
  }, [isDisabled]);

  const handleResendEmail = () => {
    setIsDisabled(true);

    auth0GetUser()
      .then((res) => {
        if (res.data?.email_verified) {
          toaster.success({ title: t('general.emailVerified.description') });
          router.push(routes.emailVerified.path);
        } else {
          auth0ResendVerificationEmailJob();
        }
      })
      .catch(() => {
        auth0ResendVerificationEmailJob();
      });

    setTimeout(() => setIsDisabled(false), 60000);
  };

  const buttonRightSection = isDisabled ? (
    <>
      <Clock style={{ marginRight: '5px' }} />
      <span>{countdown}</span>
    </>
  ) : (
    <ArrowsClockwise size={16} />
  );

  return (
    <Button variant="transparent" rightSection={buttonRightSection} onClick={handleResendEmail} disabled={isDisabled}>
      {t('general.verifyEmail.resendEmail')}
    </Button>
  );
}

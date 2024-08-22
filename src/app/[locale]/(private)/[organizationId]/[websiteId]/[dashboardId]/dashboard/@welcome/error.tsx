'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { ErrorCard } from '@/components/ui/error-card';
import { captureError } from '@/utils/errors/capture-error';

export default function ErrorComponent({
  error,
  reset
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  const t = useTranslations('dashboard.overview.welcomeCard');

  useEffect(() => {
    captureError(error);
  }, [error]);

  return <ErrorCard message={t('error')} reset={reset} />;
}

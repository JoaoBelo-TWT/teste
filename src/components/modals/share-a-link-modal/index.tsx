'use client';

import { useTranslations } from 'next-intl';

import { ShareALinkForm } from '@/components/forms/share-a-link-form';
import { ModalHeader } from '@/components/modals/modal-header';

export function ShareALinkModal() {
  const t = useTranslations('modals.shareALink');

  return (
    <>
      <ModalHeader title={t('title')} />
      <ShareALinkForm />
    </>
  );
}

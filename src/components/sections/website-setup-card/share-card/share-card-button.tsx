'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

import classes from './index.module.css';

export function ShareCardButton({ websiteId }: Readonly<{ websiteId?: string }>) {
  const t = useTranslations('onboarding.setup.step6');
  const { setModal, setData } = useModal();
  const protocolAndHost = `${window.location.protocol}//${window.location.host}`;
  const snippetUrl = `${process.env.NEXT_PUBLIC_SOURCE_PIXEL_URL}/${websiteId}/sourcepixel.min.js`;

  const publicPageFullLink = useMemo(
    () => `${protocolAndHost}/share?websiteId=${websiteId}&snippetUrl=${snippetUrl}`,
    [protocolAndHost, snippetUrl, websiteId]
  );

  return (
    <div className={classes['share-card__button-container']}>
      <Button
        miw={144}
        size="medium"
        variant="outline"
        onClick={() => {
          setData({ url: publicPageFullLink });
          setModal(MODALS.SHARE_A_LINK);
        }}
        loading={!websiteId}
      >
        {t('shareLinkButton')}
      </Button>
    </div>
  );
}

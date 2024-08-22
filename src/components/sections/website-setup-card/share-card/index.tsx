import { Flex, Text } from '@mantine/core';
import { Info } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';
import { ShareCardButton } from './share-card-button';

export function ShareCard({ websiteId }: Readonly<{ websiteId?: string }>) {
  const t = useTranslations('onboarding.setup.step6');

  return (
    <div className={classes['share-card']}>
      <div className={classes['share-card__text']}>
        <Flex gap={6} justify="center" align="center" fw={500}>
          <Info size={SPACING.md} />
          <Text fz="heading2" fw={500}>
            {t('needHelpQuestion')}
          </Text>
        </Flex>
        <Text fz="body2" lh="heading4" c="dark.7">
          {t('needHelpResponse')}
        </Text>
      </div>
      <div className={classes['share-card__button']}>
        <ShareCardButton websiteId={websiteId} />
      </div>
    </div>
  );
}

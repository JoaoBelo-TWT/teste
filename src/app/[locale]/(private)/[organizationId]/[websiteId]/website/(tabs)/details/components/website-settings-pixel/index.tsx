'use client';

import { CodeHighlight } from '@mantine/code-highlight';
import { Box, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { GetWebsiteQuery, SelectorsQuery } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { ItemCard } from '@/components/ui/item-card';
import { useModal } from '@/context/modal';
import { MODALS, SPACING } from '@/resources/constants';
import { beautifyUrl } from '@/utils/formatters/beutify-url';
import { buildPixelUrl } from '@/utils/pixel';

export function WebsiteSettingsPixel({
  websiteData,
  websiteSelectors
}: {
  websiteData: GetWebsiteQuery;
  websiteSelectors: SelectorsQuery | null | undefined;
}) {
  const t = useTranslations();
  const { setModal, setData } = useModal();

  return (
    <Box>
      <Text mt={SPACING.md} c="dark.7">
        {t('website.details.pixel.description')}
      </Text>

      <Text c="dark.7" mt={SPACING.md}>
        {t('website.details.pixel.header')}
      </Text>

      <CodeHighlight
        code={buildPixelUrl(websiteData.website.id)}
        // eslint-disable-next-line i18next/no-literal-string
        display="grid"
        mb={SPACING.md}
        mt={SPACING.sm}
        w="100%"
      />
      <ItemCard
        w="100%"
        mb={SPACING.sm}
        itemImage={websiteData.website.imageUrl ?? '/logo.webp'}
        itemName={t('website.details.pixel.card.title')}
        itemDescription={t('website.details.pixel.card.description')}
        avatarProps={{ name: beautifyUrl(websiteData.website.domain)?.charAt(0) }}
        rightContent={
          <Button
            variant="light"
            size="small"
            onClick={() => {
              setData({
                websiteSelectors,
                websiteId: websiteData.website.id,
                organizationId: websiteData.website.organizationId
              });
              setModal(MODALS.UPSERT_QUERY_SELECTORS);
            }}
          >
            {t('website.details.pixel.card.button')}
          </Button>
        }
      />
    </Box>
  );
}

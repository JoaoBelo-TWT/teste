'use client';

import { useCombobox, Text } from '@mantine/core';
import { Plus } from '@phosphor-icons/react';
import { Check } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { GetWebsitesQuery } from '@/__generated__/graphql';
import { Avatar } from '@/components/ui/avatar';
import { Dropdown } from '@/components/ui/dropdown';
import { DropdownData } from '@/components/ui/dropdown/types';
import { IconButton } from '@/components/ui/icon-button';
import { DATA_TEST_IDS, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';

import classes from '../index.module.css';

export function WebsiteButton({
  data,
  organizationId,
  activeWebsiteId
}: Readonly<{ data: GetWebsitesQuery; organizationId: string; activeWebsiteId: string }>) {
  const t = useTranslations('common');
  const combobox = useCombobox({
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    }
  });

  const activeWebsite = data.websites.edges.find((edge) => edge.node.id === activeWebsiteId);

  const dropdownData: DropdownData = data.websites.edges.map((edge) => ({
    value: edge.node.id,
    comboboxOptions: {
      active: edge.node.id === activeWebsiteId
    },
    href: edge.node.defaultDashboardId
      ? routes.dashboard.homePage.path(organizationId, edge.node.id, edge.node.defaultDashboardId)
      : routes.dashboard.new.path(organizationId, edge.node.id),
    label: (
      <>
        <div className={classes['global-side-nav__option-description']}>
          <Avatar radius="xl" size={SPACING.md} src={edge.node.imageUrl} />
          <Text fz="heading4" lh="body2">
            {edge.node.name}
          </Text>
        </div>
        {edge.node.id === activeWebsiteId && <Check size={16} />}
      </>
    )
  }));

  const connectWebsiteOption = {
    value: 'add-website-data',
    href: routes.website.setup.start.path(organizationId),
    label: (
      <>
        <div className={classes['global-side-nav__option-description']}>
          <Plus />
          <Text fz="heading4" lh="body2">
            {t('addWebsite')}
          </Text>
        </div>
      </>
    )
  };

  return (
    <Dropdown
      data-testid={DATA_TEST_IDS.WEBSITES_DROPDOWN}
      headerLabel={t('websites')}
      store={combobox}
      data={[...dropdownData, connectWebsiteOption]}
      dropdownPadding={0}
      position="right-end"
    >
      <IconButton radius="md" size={32} variant="subtle" onClick={() => combobox.toggleDropdown()}>
        <Avatar radius="md" size={SPACING.lg} src={activeWebsite?.node.imageUrl} alt={t('websites')} />
      </IconButton>
    </Dropdown>
  );
}

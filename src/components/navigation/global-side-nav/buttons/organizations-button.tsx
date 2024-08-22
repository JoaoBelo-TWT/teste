'use client';

import { useCombobox, Text, Flex } from '@mantine/core';
import { Check, SignOut, Newspaper, UserCircle, UserCirclePlus, Gear } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { ReactElement, useCallback } from 'react';

import { GetOrganizationsQuery } from '@/__generated__/graphql';
import { Avatar } from '@/components/ui/avatar';
import { Dropdown } from '@/components/ui/dropdown';
import { DropdownData } from '@/components/ui/dropdown/types';
import { IconButton } from '@/components/ui/icon-button';
import { useModal } from '@/context/modal';
import { DATA_TEST_IDS, MODALS, SPACING } from '@/resources/constants';
import { routes } from '@/routes/routes';
import { getStringAcronym } from '@/utils/strings/get-string-acronym';

import classes from '../index.module.css';

export function OrganizationButton({
  activeOrganizationId,
  websiteId,
  organizationId,
  data,
  name,
  role
}: Readonly<{
  activeOrganizationId: string;
  data: GetOrganizationsQuery;
  name: string;
  role?: string;
  websiteId: string;
  organizationId: string;
}>) {
  const t = useTranslations();
  const { setModal } = useModal();

  const abbreviation = name && getStringAcronym({ value: name });
  const combobox = useCombobox({
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    }
  });

  const organizationData: DropdownData = data.organizations.edges.map((edge) => ({
    value: edge.node.id,
    comboboxOptions: {
      active: edge.node.id === activeOrganizationId
    },
    href:
      edge.node.defaultWebsiteId && edge.node.website
        ? routes.dashboard.dashboard.path(
            edge.node.id,
            edge.node.defaultWebsiteId,
            edge.node.website.defaultDashboardId
          )
        : routes.website.setup.start.path(activeOrganizationId),
    label: (
      <>
        <div className={classes['global-side-nav__option-description']}>
          <Avatar radius="sm" size={32} src={edge.node.imageUrl} alt={edge.node.name} />
          <Text fz="heading4" lh="body2">
            {edge.node.name}
          </Text>
        </div>
        {edge.node.id === activeOrganizationId && <Check size={16} />}
      </>
    )
  }));

  const renderLabel = useCallback(
    (icon: ReactElement, label: string) => (
      <Flex gap={SPACING.xs}>
        {icon}
        <Text fz="heading4" lh="body2">
          {label}
        </Text>
      </Flex>
    ),
    []
  );

  const dropdownData = [
    ...organizationData,
    {
      disabled: true,
      value: 'inviteMembers',
      href: '',
      preFetch: false,
      label: renderLabel(<UserCirclePlus size={16} />, t('common.inviteMembers'))
    },
    {
      value: 'organizationSettings',
      href: routes.organizationSettings.organizationDetails.path(organizationId, websiteId),
      preFetch: false,
      label: renderLabel(<Gear size={16} />, t('common.organizationSettings'))
    },
    {
      value: 'personalSettings',
      href: routes.personalSettings.path(organizationId, websiteId),
      preFetch: false,
      label: renderLabel(<UserCircle size={16} />, t('common.personalSettings'))
    },
    {
      disabled: true,
      value: 'billing',
      href: '',
      preFetch: false,
      label: renderLabel(<Newspaper size={16} />, t('common.billing'))
    },
    {
      onClick: () => setModal(MODALS.LOGOUT),
      value: 'logout',
      preFetch: false,
      label: renderLabel(<SignOut size={16} />, t('common.logout'))
    }
  ];

  return (
    <div className={classes['global-side-nav__wrapper']}>
      <Dropdown
        data-testid={DATA_TEST_IDS.ORGANIZATION_DROPDOWN}
        onDropdownClickAny={() => combobox.closeDropdown()}
        headerLabel={
          <div className={classes['global-side-nav__user-header']}>
            <IconButton
              size={32}
              bg="var(--flat-orange-color)"
              variant="filled"
              onClick={() => combobox.toggleDropdown()}
            >
              <Text fz="xs" lh="body2" c="dark.9">
                {abbreviation}
              </Text>
            </IconButton>
            <Flex direction="column">
              <Text fz="heading2" fw={500} c="white">
                {name}
              </Text>
              <Text className={classes['global-side-nav__role']} fz="caption2" c="dark.0">
                {role ?? t('common.user')}
              </Text>
            </Flex>
          </div>
        }
        store={combobox}
        data={dropdownData}
        dropdownPadding={0}
        position="right-end"
      >
        <IconButton size={32} bg="var(--flat-orange-color)" variant="filled" onClick={() => combobox.toggleDropdown()}>
          <Text fz="caption2" lh="body2" c="dark.9">
            {abbreviation}
          </Text>
        </IconButton>
      </Dropdown>
      {data.organizations.edges.map(
        (edge) =>
          edge.node.id === activeOrganizationId && (
            <Avatar
              key={edge.node.id}
              className={classes['global-side-nav__organization-icon']}
              radius="xs"
              size={13}
              src={edge.node.imageUrl}
            />
          )
      )}
    </div>
  );
}

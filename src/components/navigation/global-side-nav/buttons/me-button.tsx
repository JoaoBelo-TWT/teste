'use client';

import { Text, useCombobox } from '@mantine/core';
import { SignOut } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';

import { Dropdown } from '@/components/ui/dropdown';
import { DropdownData } from '@/components/ui/dropdown/types';
import { IconButton } from '@/components/ui/icon-button';
import { routes } from '@/routes/routes';

export function MeButton({ nameAbbreviation }: Readonly<{ nameAbbreviation: string }>) {
  const t = useTranslations('common');

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });

  const dropdownData: DropdownData = [
    {
      value: 'logout',
      href: routes.api.logout.path,
      preFetch: false,
      label: (
        <>
          <SignOut size={16} />
          <Text fz="heading4" lh="body2">
            {t('logout')}
          </Text>
        </>
      )
    }
  ];

  return (
    <Dropdown
      headerLabel={t('account')}
      store={combobox}
      data={dropdownData}
      dropdownPadding={0}
      position="right"
      withArrow
    >
      <IconButton size={32} bg="var(--flat-orange-color)" variant="filled" onClick={() => combobox.toggleDropdown()}>
        <Text fz="caption2" lh="body2" c="dark.9">
          {nameAbbreviation}
        </Text>
      </IconButton>
    </Dropdown>
  );
}

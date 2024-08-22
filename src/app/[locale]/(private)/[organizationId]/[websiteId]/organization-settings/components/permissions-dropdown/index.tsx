'use client';

import { Text, useCombobox } from '@mantine/core';
import { CaretDown, CaretUp, Check } from '@phosphor-icons/react/dist/ssr';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AccessLevel } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dropdown } from '@/components/ui/dropdown';
import { useModal } from '@/context/modal';
import { MODALS } from '@/resources/constants';

import classes from './index.module.css';

export function PermissionsDropdown({
  value,
  disabled,
  permissionId,
  name
}: Readonly<{ value: AccessLevel; disabled: boolean; permissionId?: string; name: string }>) {
  const t = useTranslations('organization-settings');
  const [activeOption, setActiveOption] = useState<AccessLevel>(value);
  const [confirmedOption, setConfirmedOption] = useState<AccessLevel>(value);
  const { setModal, destroyModal, setData } = useModal();

  const comboboxPermissions = useCombobox({
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        comboboxPermissions.selectActiveOption();
      } else {
        comboboxPermissions.updateSelectedOptionIndex('active');
      }
    }
  });

  const optionTemplate = useCallback(
    (accessLevel: AccessLevel, title: string, description: string) => (
      <>
        <div className={classes['permissions-dropdown__container']}>
          <Text fz="body2" c="dark.0" lh="body2">
            {title}
          </Text>
          <Text fz="body2" c="dark.4" lh="body2">
            {description}
          </Text>
        </div>
        {activeOption === accessLevel && <Check size={16} />}
      </>
    ),
    [activeOption]
  );

  const permissionOptions = useMemo(
    () => [
      {
        value: AccessLevel.Read,
        label: optionTemplate(
          AccessLevel.Read,
          t('permissionsOptions.viewOnly.title'),
          t('permissionsOptions.viewOnly.description')
        )
      },
      {
        value: AccessLevel.Write,
        label: optionTemplate(
          AccessLevel.Write,
          t('permissionsOptions.editor.title'),
          t('permissionsOptions.editor.description')
        )
      },
      {
        value: AccessLevel.Admin,
        label: optionTemplate(
          AccessLevel.Admin,
          t('permissionsOptions.admin.title'),
          t('permissionsOptions.admin.description')
        )
      }
    ],
    [optionTemplate, t]
  );

  const permissionsLabels: { [key in AccessLevel]: string } = useMemo(
    () => ({
      [AccessLevel.Read]: t('permissionsOptions.viewOnly.title'),
      [AccessLevel.Write]: t('permissionsOptions.editor.title'),
      [AccessLevel.Admin]: t('permissionsOptions.admin.title')
    }),
    [t]
  );

  const activePermission = useMemo(() => {
    const permission = permissionOptions.find((permissionOption) => permissionOption.value === confirmedOption)?.value;
    if (permission) {
      return permissionsLabels[permission];
    }
    return AccessLevel.Read;
  }, [permissionOptions, permissionsLabels, confirmedOption]);

  const handleOnOptionSubmit = (option: string) => {
    setActiveOption(option as AccessLevel);
    comboboxPermissions.closeDropdown();
    setModal(MODALS.CHANGE_USER_PERMISSIONS);
  };

  const onCancel = useCallback(() => {
    setActiveOption(confirmedOption);
    destroyModal();
  }, [confirmedOption, setActiveOption, destroyModal]);

  const onConfirm = useCallback(() => {
    setConfirmedOption(activeOption);
    destroyModal();
  }, [activeOption, setConfirmedOption, destroyModal]);

  useEffect(() => {
    setData({ onConfirm, onCancel, permissionId, name, accessLevel: activeOption });
  }, [onConfirm, onCancel, permissionId, name, activeOption, setData]);

  return (
    <Dropdown
      store={comboboxPermissions}
      data={permissionOptions}
      headerLabel={t('permissionsTitle')}
      onOptionSubmit={handleOnOptionSubmit}
    >
      <Button
        disabled={disabled}
        px={20}
        variant="light"
        size="small"
        rightSection={comboboxPermissions.dropdownOpened ? <CaretUp size={16} /> : <CaretDown size={16} />}
        onClick={() => comboboxPermissions.toggleDropdown()}
      >
        {activePermission}
      </Button>
    </Dropdown>
  );
}

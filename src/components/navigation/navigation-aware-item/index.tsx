'use client';

import { useCombobox } from '@mantine/core';
import { usePathname } from 'next/navigation';
import React, { useCallback, useState, useEffect } from 'react';

import { Dropdown } from '@/components/ui/dropdown';
import { createTestId } from '@/utils/create-test-id';

import { IconButton } from '../icon-button';
import { IconButtonProps } from '../icon-button/types';

import classes from './index.module.css';

export function NavigationAwareItem({
  children,
  dropdownData,
  label,
  headerLabel,
  ...props
}: Readonly<IconButtonProps>) {
  const pathname = usePathname();
  const isActive = props.regex ? RegExp(props.regex).exec(pathname) : pathname === props.href;
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const combobox = useCombobox({
    onDropdownOpen: (eventSource) => {
      if (eventSource === 'keyboard') {
        combobox.selectActiveOption();
      } else {
        combobox.updateSelectedOptionIndex('active');
      }
    }
  });

  useEffect(() => {
    if (isHovering) {
      combobox.openDropdown();
    }
  }, [isHovering, combobox]);

  const handleMouseLeave = () => {
    setTimeout(() => {
      combobox.closeDropdown();
    }, 350);
  };

  const handleDropdownMouseEnter = () => {
    setIsHovering(true);
  };

  const handleDropdownMouseLeave = () => {
    combobox.closeDropdown();
    setIsHovering(false);
  };

  const renderIcon = useCallback(
    (openOnClick?: boolean, testId?: string) => (
      <IconButton
        size={48}
        radius="100px"
        classNames={{ root: classes['navigation-aware-item__root'] }}
        variant={isActive ? 'filled' : 'subtle'}
        color="var(--mantine-color-dark-9)"
        onClick={() => openOnClick && combobox.openDropdown()}
        data-testid={createTestId(testId)}
        {...props}
      >
        {children}
      </IconButton>
    ),
    [children, combobox, isActive, props]
  );

  if (label) {
    return (
      <Dropdown
        store={combobox}
        data={[{ label, value: '' }]}
        dropdownPadding={0}
        position="right"
        onMouseLeave={() => combobox.closeDropdown()}
        onMouseEnter={() => combobox.openDropdown()}
        viewOnly
        noPadding={!headerLabel}
      >
        <div>{renderIcon(undefined, label)}</div>
      </Dropdown>
    );
  }

  if (dropdownData) {
    return (
      <Dropdown
        headerLabel={headerLabel}
        store={combobox}
        data={dropdownData}
        dropdownPadding={0}
        position="right-start"
        onMouseEnter={() => combobox.openDropdown()}
        onMouseLeave={handleMouseLeave}
        onDropdownMouseEnter={handleDropdownMouseEnter}
        onDropdownMouseLeave={handleDropdownMouseLeave}
        viewOnly={false}
        noPadding={!headerLabel}
        maxDropdownHeight={120}
      >
        <div>{renderIcon(true, headerLabel)}</div>
      </Dropdown>
    );
  }

  return renderIcon(undefined, label);
}

'use client';

import {
  Text,
  Combobox,
  ComboboxEmpty,
  ComboboxHeader,
  ComboboxOption,
  ComboboxTarget,
  ComboboxOptions,
  ComboboxDropdown,
  ScrollAreaAutosize,
  Flex
} from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { SPACING } from '@/resources/constants';

import classes from './index.module.css';
import { DropdownProps } from './types';
import { useWindowScrollListener } from './useWindowScrollListener';

export function Dropdown({
  data,
  children,
  headerLabel,
  isLightMode = false,
  closeOnPageScroll = true,
  onMouseLeave,
  onMouseEnter,
  onDropdownMouseLeave,
  onDropdownMouseEnter,
  onDropdownClickAny,
  noPadding,
  viewOnly = false,
  onClick,
  maxDropdownHeight,
  ...props
}: Readonly<DropdownProps>) {
  const t = useTranslations();

  const options = useMemo(
    () =>
      data.map(
        (
          {
            value,
            label,
            href,
            comboboxOptions,
            disabled,
            onClick: OnClickOption,
            rightContent,
            leftContent,
            preFetch = true
          },
          index
        ) =>
          href ? (
            <Link
              href={href}
              key={value + index}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
              prefetch={preFetch}
              passHref
            >
              <ComboboxOption disabled={disabled} value={value} data-light-mode={isLightMode} {...comboboxOptions}>
                <Flex align="center" justify="space-between" w="100%">
                  <Flex align="center" gap={SPACING.sm}>
                    {leftContent}
                    {label}
                  </Flex>
                  {rightContent}
                </Flex>
              </ComboboxOption>
            </Link>
          ) : (
            <ComboboxOption
              disabled={disabled}
              value={value}
              key={value + index}
              data-light-mode={isLightMode}
              onClick={OnClickOption}
            >
              <Flex align="center" justify="space-between" w="100%">
                <Flex align="center" gap={SPACING.sm}>
                  {leftContent}
                  {label}
                </Flex>
                {rightContent}
              </Flex>
            </ComboboxOption>
          )
      ),
    [data, isLightMode]
  );

  useWindowScrollListener({
    enabled: closeOnPageScroll && !!props.store?.dropdownOpened,
    onScroll: () => {
      props.store?.closeDropdown();
    }
  });

  return (
    <div
      className={classes['dropdown__button-wrapper']}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      tabIndex={0}
      role="button"
    >
      <Combobox
        data-light-mode={isLightMode}
        classNames={{
          dropdown: clsx(classes.dropdown__dropdown, {
            [classes['dropdown__dropdown--no-padding']]: noPadding
          }),
          header: classes.dropdown__header,
          option: classes.dropdown__option
        }}
        width={'auto'}
        {...props}
      >
        <ComboboxTarget>{children}</ComboboxTarget>
        <ComboboxDropdown
          onClick={onDropdownClickAny}
          onMouseLeave={onDropdownMouseLeave}
          onMouseEnter={onDropdownMouseEnter}
          data-light-mode={isLightMode}
          className={clsx(viewOnly && classes['dropdown__dropdown--view-only'])}
        >
          <ComboboxOptions data-light-mode={isLightMode}>
            {typeof headerLabel === 'string' ? (
              <ComboboxHeader>
                <Text fz="heading4" lh="body2">
                  {headerLabel}
                </Text>
              </ComboboxHeader>
            ) : (
              headerLabel
            )}
            <ScrollAreaAutosize mah={maxDropdownHeight ?? 350} type="scroll">
              {options.length !== 0 ? options : <ComboboxEmpty>{t('common.nothingFound')}</ComboboxEmpty>}
            </ScrollAreaAutosize>
          </ComboboxOptions>
        </ComboboxDropdown>
      </Combobox>
    </div>
  );
}

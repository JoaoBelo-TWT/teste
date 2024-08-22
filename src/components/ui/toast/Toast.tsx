import { Flex, Text } from '@mantine/core';
import { X, CheckCircle, Info, WarningCircle } from '@phosphor-icons/react/dist/ssr';

import { IconButton } from '@/components/ui/icon-button';
import { SPACING } from '@/resources/constants';

import classes from './index.module.css';
import { ToastProps, ToastVariant } from './types';

const variantToConfig = {
  [ToastVariant.Info]: {
    Icon: Info,
    iconColor: 'var(--mantine-color-dark-9)'
  },
  [ToastVariant.Success]: {
    Icon: CheckCircle,
    iconColor: 'var(--mantine-color-dark-9)'
  },
  [ToastVariant.Error]: {
    Icon: WarningCircle,
    iconColor: 'var(--mantine-color-dark-1)'
  }
};

export const Toast = ({ title, description, variant, onCloseClick }: Readonly<ToastProps>) => {
  const variantConfig = variantToConfig[variant];
  const IconComponent = variantConfig.Icon;

  return (
    <div className={classes.toast}>
      <Flex align="center" gap={SPACING.sm}>
        <div
          className={classes['toast__icon-container']}
          style={{ background: `var(--toast-icon-${variant}-background)` }}
        >
          <IconComponent size={20} color={variantConfig.iconColor} className={classes.toast__icon} />
        </div>
        <Flex align="center" justify="space-between" gap={SPACING.xxs} flex={1}>
          <div className={classes.toast__info}>
            <Text fz="heading4" lh="heading4" fw={500} c="var(--mantine-color-dark-1)">
              {title}
            </Text>
            {description && (
              <Text fz="caption2" lh="caption2" c="var(--mantine-color-dark-1)">
                {description}
              </Text>
            )}
          </div>
          <IconButton variant="transparent" onClick={onCloseClick}>
            <X size={18} fill="white" />
          </IconButton>
        </Flex>
      </Flex>
    </div>
  );
};

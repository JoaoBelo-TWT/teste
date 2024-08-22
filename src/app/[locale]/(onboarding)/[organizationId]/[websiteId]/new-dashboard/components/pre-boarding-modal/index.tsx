'use client';

import { Flex, Modal, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { LOCAL_STORAGE_ONBOARD_MODAL, SPACING } from '@/resources/constants';

import { PreBoardingModalImage } from '../pre-boarding-modal-image';
import { PreBoardingModalPagination } from '../pre-boarding-modal-pagination';

import classes from './index.module.css';
import { useArrowsNavigation } from './useArrowsNavigation';

export const PreBoardingModal = () => {
  const t = useTranslations('dashboard.new.preBoardingModal');
  const isMobile = useMediaQuery('(max-width: 52em)', true, {
    getInitialValueInEffect: false
  });
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const data = useMemo(
    () => [
      {
        id: 'marketing',
        title: t('cards.marketing.title'),
        description: t('cards.marketing.description'),
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}pre-boarding/marketing.webp`,
        imageAlt: t('cards.marketing.imageAlt'),
        backgroundColor: `var(--color-orange-soft)`
      },
      {
        id: 'preset',
        title: t('cards.presetDashboard.title'),
        description: t('cards.presetDashboard.description'),
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}pre-boarding/preset-dashboard.webp`,
        imageAlt: t('cards.presetDashboard.imageAlt'),
        backgroundColor: `var(--color-dark-blue-soft)`
      },
      {
        id: 'it-hassle',
        title: t('cards.itHassle.title'),
        description: t('cards.itHassle.description'),
        imgSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}pre-boarding/it-hassle.webp`,
        imageAlt: t('cards.itHassle.imageAlt'),
        backgroundColor: `var(--color-brown-soft)`
      }
    ],
    [t]
  );

  const activeItem = data[activeItemIndex];
  const isLastItem = activeItemIndex === data.length - 1;

  const onGoNextPress = useCallback(() => {
    if (isLastItem) {
      localStorage.setItem(LOCAL_STORAGE_ONBOARD_MODAL, '1');
      setIsOpen(false);
      return;
    }

    setActiveItemIndex((prevState) => prevState + 1);
  }, [isLastItem]);

  const onGoPrevPress = useCallback(() => {
    if (activeItemIndex > 0) {
      setActiveItemIndex((prevState) => prevState - 1);
    }
  }, [activeItemIndex]);

  useArrowsNavigation({ goNext: onGoNextPress, goPrev: onGoPrevPress });

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_ONBOARD_MODAL) === '1') {
      setIsOpen(false);
    }
  }, []);

  return (
    <Modal
      mah="100%"
      size="auto"
      radius={24}
      opened={isOpen}
      onClose={() => {}}
      withCloseButton={false}
      padding={0}
      centered
      transitionProps={{ transition: 'fade', duration: 200 }}
      fullScreen={isMobile}
    >
      <div className={classes['pre-boarding-modal__content']}>
        <div className={clsx(classes['pre-boarding-modal__section'], classes['pre-boarding-modal__section--left'])}>
          <PreBoardingModalPagination data={data} activeIndex={activeItemIndex} onClick={setActiveItemIndex} />
          <Text className={classes['pre-boarding-modal__title']}>{activeItem.title}</Text>
          <Text fz="body1" lh="body2" className={classes['pre-boarding-modal__description']}>
            {activeItem.description}
          </Text>

          <Flex gap={SPACING.xxs} mt="auto">
            <Button
              variant="transparent"
              size="medium"
              bg="transparent"
              onClick={onGoPrevPress}
              disabled={activeItemIndex === 0}
            >
              {t('prevButton')}
            </Button>
            <Button variant="filled" size="medium" onClick={onGoNextPress}>
              {t(`${isLastItem ? 'doneButton' : 'nextButton'}`)}
            </Button>
          </Flex>
        </div>
        <div
          className={clsx(classes['pre-boarding-modal__section'], classes['pre-boarding-modal__section--right'])}
          style={{ backgroundColor: activeItem.backgroundColor }}
        >
          <PreBoardingModalImage key={activeItem.id} src={activeItem.imgSrc} alt={activeItem.imageAlt} />
        </div>
      </div>
    </Modal>
  );
};

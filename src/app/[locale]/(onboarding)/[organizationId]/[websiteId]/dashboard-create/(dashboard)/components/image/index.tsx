'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

import { OnboardingQueryParams } from '@/types/constants/onboarding-query-params';
import { OnboardingFlowType } from '@/types/enums/new-dashboard-query-params';

import classes from './index.module.css';
import { RightColumnConfig } from './types';

export const dynamic = 'force-dynamic';

export function OnboardingImage({ flow }: { flow?: OnboardingFlowType }) {
  const searchParams = useSearchParams();
  const queryFlow = searchParams.get(OnboardingQueryParams.flow.key);
  const onboardingFlow = (queryFlow as OnboardingFlowType) ?? OnboardingQueryParams.flow.default;

  const rightColumnConfig: RightColumnConfig = {
    [OnboardingFlowType.EXECUTIVE]: {
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/hot_air_balloon.webp`,
      alt: 'Hot ballon',
      bgClass: 'image__right--orange-bg'
    },
    [OnboardingFlowType.PAID]: {
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/pig.webp`,
      alt: 'Pig',
      bgClass: 'image__right--pink-bg'
    },
    [OnboardingFlowType.CAMPAIGN]: {
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/flag.webp`,
      alt: 'Flag',
      bgClass: 'image__right--green-bg'
    },
    [OnboardingFlowType.CHAT]: {
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/chat.webp`,
      alt: 'Chat',
      bgClass: 'image__right--blue-bg'
    },
    [OnboardingFlowType.WEBSITE]: {
      imageSrc: `${process.env.NEXT_PUBLIC_IMAGES_HOST_URL}cards/donut.webp`,
      alt: 'Donut',
      bgClass: 'image__right--green-flat-bg'
    }
  };

  return (
    <div className={clsx(classes.image__right, classes[rightColumnConfig[flow ?? onboardingFlow].bgClass])}>
      <img
        height={1000}
        width={1000}
        className={classes['image__right--image']}
        src={rightColumnConfig[flow ?? onboardingFlow].imageSrc}
        alt={rightColumnConfig[flow ?? onboardingFlow].alt}
      />
    </div>
  );
}

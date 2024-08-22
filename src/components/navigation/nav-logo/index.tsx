'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';

import { DATA_TEST_IDS } from '@/resources/constants';

import classes from './index.module.css';

const PLACEHOLDER_LOGO = '/logo.svg';

const colors = [`green`, `pink`, `blue`, `orange`];

export const NavLogo = ({ href }: { href: string }) => {
  const [activeColorIndex, setActiveColorIndex] = useState<number>(0);

  const onMouseEnter = () => {
    setActiveColorIndex((prevState) => (prevState === colors.length - 1 ? 0 : prevState + 1));
  };

  return (
    <Link
      data-testid={DATA_TEST_IDS.MAIN_DASHBOARD}
      href={href}
      className={clsx(classes['nav-logo'], classes[`nav-logo--${colors[activeColorIndex]}`])}
      onMouseEnter={onMouseEnter}
    >
      <img src={PLACEHOLDER_LOGO} width={32} height={32} alt="Source Logo" className={classes['nav-logo__img']} />
    </Link>
  );
};

'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { ToastContainer as BaseToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './index.module.css';

export const ToastContainer = () => {
  const pathname = usePathname();
  const hasSideBar = pathname.includes('dashboard/');

  return (
    <BaseToastContainer
      position="bottom-left"
      autoClose={5000}
      limit={1}
      hideProgressBar={true}
      closeButton={false}
      bodyClassName={classes['toast-container__body']}
      toastClassName={classes['toast-container__item']}
      className={clsx(classes['toast-container'], hasSideBar && classes['toast-container--with-side-bar'])}
    />
  );
};

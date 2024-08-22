import { Id, ToastOptions } from 'react-toastify';

export enum ToastVariant {
  Success = 'success',
  Error = 'error',
  Info = 'info'
}

export interface ToastProps {
  title: string;
  description?: string;
  variant: `${ToastVariant}`;
  onCloseClick: () => void;
}

type ToasterVariantFunction = (
  contentProps: Omit<ToastProps, 'onCloseClick' | 'variant'>,
  toastProps?: ToastOptions
) => Id;

export interface Toaster {
  (contentProps: Omit<ToastProps, 'onCloseClick'>, toastProps?: ToastOptions): Id;
  success: ToasterVariantFunction;
  info: ToasterVariantFunction;
  error: ToasterVariantFunction;
}

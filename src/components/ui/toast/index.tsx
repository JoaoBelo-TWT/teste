import { toast } from 'react-toastify';

import { Toast } from './Toast';
import { ToastVariant, Toaster } from './types';

export { ToastContainer } from './toast-container';

export const toaster: Toaster = (contentProps, toastProps) =>
  toast(({ closeToast }) => <Toast {...contentProps} onCloseClick={closeToast} />, toastProps);

toaster.success = (contentProps, toastProps) => toaster({ ...contentProps, variant: ToastVariant.Success }, toastProps);

toaster.info = (contentProps, toastProps) => toaster({ ...contentProps, variant: ToastVariant.Info }, toastProps);

toaster.error = (contentProps, toastProps) => toaster({ ...contentProps, variant: ToastVariant.Error }, toastProps);

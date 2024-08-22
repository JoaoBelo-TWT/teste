import { useTranslations } from 'next-intl';

import { toaster } from '@/components/ui/toast';

export function useUrlParamsToToast() {
  const t = useTranslations();
  const callbacks = [
    // hubspot params
    {
      param: 'HUBSPOT_AUTHORIZATION_FAILED',
      description: t('website.connections.toasts.error.hubspotAuthFailed'),
      type: 'error'
    },
    {
      param: 'HUBSPOT_CALLBACK_URL_NOT_ALLOWED',
      description: t('website.connections.toasts.error.hubspotCallbackNotAllowed'),
      type: 'error'
    },
    {
      param: 'HUBSPOT_AUTHORIZATION_CALLBACK_FAILED',
      description: t('website.connections.toasts.error.hubspotCallbackFailed'),
      type: 'error'
    },
    {
      param: 'HUBSPOT_AUTHORIZATION_SUCCESS',
      description: t('website.connections.toasts.success.hubspotAuthSuccess'),
      type: 'success'
    },
    // salesforce params
    {
      param: 'SALESFORCE_AUTHORIZATION_FAILED',
      description: t('website.connections.toasts.error.salesforceAuthorizationFailed'),
      type: 'error'
    },
    {
      param: 'SALESFORCE_CALLBACK_URL_NOT_ALLOWED',
      description: t('website.connections.toasts.error.salesforceCallbackUrlNotAllowed'),
      type: 'error'
    },
    {
      param: 'SALESFORCE_AUTHORIZATION_CALLBACK_FAILED',
      description: t('website.connections.toasts.error.salesforceAuthorizationCallbackFailed'),
      type: 'error'
    },
    {
      param: 'SALESFORCE_QUERY_FAILED',
      description: t('website.connections.toasts.error.salesforceQueryFailed'),
      type: 'error'
    },
    {
      param: 'SALESFORCE_AUTHORIZATION_SUCCESS',
      description: t('website.connections.toasts.success.salesforceAuthSuccess'),
      type: 'success'
    },
    // Meta params
    {
      param: 'META_AUTHORIZATION_FAILED',
      description: t('website.connections.toasts.error.metaAuthFailed'),
      type: 'error'
    },
    {
      param: 'META_CALLBACK_URL_NOT_ALLOWED',
      description: t('website.connections.toasts.error.metaCallbackNotAllowed'),
      type: 'error'
    },
    {
      param: 'META_AUTHORIZATION_CALLBACK_FAILED',
      description: t('website.connections.toasts.error.metaCallbackFailed'),
      type: 'error'
    },
    {
      param: 'META_AUTHORIZATION_SUCCESS',
      description: t('website.connections.toasts.success.metaAuthSuccess'),
      type: 'success'
    },
    // Google params
    {
      param: 'GOOGLE_ADS_AUTHORIZATION_FAILED',
      description: t('website.connections.toasts.error.googleAuthFailed'),
      type: 'error'
    },
    {
      param: 'GOOGLE_ADS_CALLBACK_URL_NOT_ALLOWED',
      description: t('website.connections.toasts.error.googleCallbackNotAllowed'),
      type: 'error'
    },
    {
      param: 'GOOGLE_ADS_AUTHORIZATION_CALLBACK_FAILED',
      description: t('website.connections.toasts.error.googleCallbackFailed'),
      type: 'error'
    },
    {
      param: 'GOOGLE_ADS_AUTHORIZATION_SUCCESS',
      description: t('website.connections.toasts.success.googleAuthSuccess'),
      type: 'success'
    }
  ];

  const setToast = (param?: string) => {
    const matchedCallback = callbacks.find((callback) => callback.param === param);

    if (matchedCallback?.type === 'success') {
      toaster.success({
        title: matchedCallback?.description
      });
    }

    if (matchedCallback?.type === 'error') {
      toaster.error({
        title: matchedCallback?.description
      });
    }
  };

  return { setToast };
}

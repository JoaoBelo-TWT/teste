import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { toaster } from '@/components/ui/toast';
import { fetchSourceConnectionStatus } from '@/lib/fetch-connection-status';

const useSourceConnectionStatus = (websiteId: string): { connected: boolean | undefined; isLoading: boolean } => {
  const [isSourceConnected, setIsSourceConnected] = useState<boolean | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const t = useTranslations();

  const fetchConnectionStatus = useCallback(async () => {
    try {
      const status = await fetchSourceConnectionStatus(websiteId);
      setIsSourceConnected(status);
    } catch (error) {
      toaster.error({ title: t('common.errorGeneral') });
    } finally {
      setIsLoading(false);
    }
  }, [t, websiteId]);

  fetchConnectionStatus();

  return { connected: isSourceConnected, isLoading };
};

export default useSourceConnectionStatus;

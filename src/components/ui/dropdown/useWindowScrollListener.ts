import { useEffect } from 'react';

import { throttle } from '@/utils/functions';

interface UseWindowScrollListenerParams {
  enabled?: boolean;
  onScroll: () => void;
}

export const useWindowScrollListener = ({ enabled = false, onScroll }: UseWindowScrollListenerParams) => {
  useEffect(() => {
    const internalOnScroll = throttle(onScroll, 200);

    if (enabled) {
      window.addEventListener(`scroll`, internalOnScroll, { passive: true });
    }

    return () => {
      window.removeEventListener(`scroll`, internalOnScroll);
    };
  }, [onScroll, enabled]);
};

import { useState, useEffect } from 'react';

import { WAIT_TIME_DELAY } from '@/resources/constants';

type UseDoActionParams = {
  action: boolean;
  delayInMilliseconds?: number;
  initialState?: boolean;
};

/* hook to return a delayed boolean change */
export const useDelay = ({
  action,
  delayInMilliseconds = WAIT_TIME_DELAY,
  initialState = false
}: UseDoActionParams): boolean => {
  const [actionDelayed, setActionDelayed] = useState<boolean>(initialState);

  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      if (action) {
        setActionDelayed(action);
      }
    }, delayInMilliseconds);

    if (!action) setActionDelayed(action);

    return () => clearTimeout(timer);
  }, [action, delayInMilliseconds]);

  return actionDelayed;
};

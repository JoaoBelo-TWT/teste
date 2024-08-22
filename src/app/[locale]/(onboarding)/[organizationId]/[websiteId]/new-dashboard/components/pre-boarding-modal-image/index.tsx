import clsx from 'clsx';
import { useState } from 'react';

import classes from './index.module.css';

export const PreBoardingModalImage = ({ src, alt }: Readonly<{ src: string; alt: string }>) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  return (
    <img
      onLoad={() => setIsLoaded(true)}
      src={src}
      alt={alt}
      className={clsx(classes['pre-boarding-modal-image'], isLoaded ? classes['pre-boarding-modal-image--loaded'] : '')}
    />
  );
};

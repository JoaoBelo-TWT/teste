import { useEffect } from 'react';

export const useArrowsNavigation = ({ goPrev, goNext }: { goNext: () => void; goPrev: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goNext();
      } else if (event.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener(`keydown`, handleKeyDown);

    return () => {
      window.removeEventListener(`keydown`, handleKeyDown);
    };
  }, [goNext, goPrev]);
};

import { useEffect, useRef } from 'react';

/**
 * A custom React hook that triggers a useEffect once when a condition becomes true.
 */
export function useEffectOnceWhen(effect: () => void, condition: boolean, reset: boolean = false): void {
  const completedEffect = useRef(false);

  useEffect(() => {
    /**
     * If reset is true, completedEffect is reset to false.
     * The effect can be triggered again if the condition becomes true.
     */
    if (reset) {
      completedEffect.current = false;
    }
  }, [reset]);

  useEffect(() => {
    /**
     * If the effect has already been completed, or the condition is not yet true,
     * we don't execute the effect.
     */
    if (completedEffect.current || !condition) {
      return;
    }

    /**
     * Once the condition becomes true, we set completedEffect to true
     * and execute the effect function.
     */
    completedEffect.current = true;

    effect();
  }, [effect, condition]);
}

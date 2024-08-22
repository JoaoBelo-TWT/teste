export const debounce = <F extends (...args: unknown[]) => unknown>(fn: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearInterval(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const throttle = <F extends (...args: unknown[]) => unknown>(fn: F, delay: number) => {
  let shouldWait = false;

  return (...args: Parameters<F>) => {
    if (shouldWait) return;

    fn(...args);
    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
};

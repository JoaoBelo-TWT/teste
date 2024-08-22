export type QueryParamsObject<T> = {
  [K in keyof T]: {
    key: K;
    default: T[K];
  };
};

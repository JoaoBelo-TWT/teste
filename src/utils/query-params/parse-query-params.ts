import { QueryParamsObject } from '@/types/query-params-object';

export function parseQueryParams<T>(searchParams: T, queryParamsObject: QueryParamsObject<T>): T {
  const parsedParams: T = {} as T;

  Object.keys(queryParamsObject).forEach((key) => {
    const typedKey = key as keyof T;
    parsedParams[typedKey] = searchParams?.[typedKey] ?? queryParamsObject?.[typedKey]?.default;
  });

  return parsedParams;
}

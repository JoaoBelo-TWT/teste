export function getQueryParamIfDefined(key: string, value?: string | null, renderAnd?: boolean) {
  return value ? `${renderAnd ? '&' : ''}${key}=${encodeURIComponent(value)}` : '';
}

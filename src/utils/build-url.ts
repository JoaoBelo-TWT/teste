interface GetUrlParams {
  url: string;
  params: Record<string, string>;
}

export function buildUrlWithParams({ url, params }: GetUrlParams): string {
  const baseUrl = new URL(decodeURIComponent(url));
  Object.entries(params).forEach(([key, value]) => {
    baseUrl.searchParams.append(key, value);
  });

  return decodeURIComponent(baseUrl.href);
}

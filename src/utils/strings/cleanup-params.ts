export const cleanupParams = (queryParamsString: URLSearchParams | null, tabHref: string) => {
  if (!queryParamsString || queryParamsString.toString() === '') return tabHref;

  const url = new URL(tabHref, window.location.origin);
  const combinedParams = new URLSearchParams(queryParamsString);

  // Overwrite params with the ones from passedHref, use the latest ones
  url.searchParams.forEach((value, key) => {
    combinedParams.set(key, value);
  });

  // Construct the final URL with combined params
  url.search = combinedParams.toString();

  return url.toString().replace(window.location.origin, '');
};

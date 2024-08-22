/**
 * Formats a URL by adding a protocol if missing and optionally removing query parameters.
 * @throws {Error} If the URL format is invalid.
 */
export const formatUrl = (url: string, { fallbackProtocol = 'https', removeQueryParameters = true } = {}) => {
  const urlWithPrefix = url.includes('://') ? url : `${fallbackProtocol}://${url}`;

  const parsedUrl = new URL(urlWithPrefix);

  if (removeQueryParameters) parsedUrl.search = '';

  return parsedUrl.toString();
};

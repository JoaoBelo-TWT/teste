export function beautifyUrl(url?: string | null): string | null {
  if (!url) {
    return null;
  }
  // Remove 'http://' or 'https://'
  let newUrl = url.replace(/^https?:\/\//, '');

  // Remove trailing slash if it exists
  if (newUrl.endsWith('/')) {
    newUrl = newUrl.slice(0, -1);
  }

  return newUrl;
}

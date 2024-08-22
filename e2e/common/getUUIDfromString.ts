export function getUUIDfromString(str: string | null) {
  if (str === null) {
    return null;
  }
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g;
  const match = str.match(uuidRegex);
  return match ? match[0] : null;
}

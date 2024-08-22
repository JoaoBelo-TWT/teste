import { GetMeQuery } from '@/__generated__/graphql';
import { Roles, Routes } from '@/routes/routes';

interface MatchResult {
  foundMatch: boolean;
  allowedPermissions?: Roles[];
  hasPublicAccess?: boolean;
}

/* Removes the language prefix from the URL if it exists.
   It replaces the language prefix, which is a two-letter word followed by a slash (/),
   with just a single slash (/). */
export function removeLanguagePrefix(url: string): string {
  return url.replace(/^\/\w{2}(\/|$)/, '/');
}

/* This function matches a given url string with a specified pattern.
   It replaces the placeholders '[id]' in the pattern with regex patterns
   that match UUIDs and then checks if the url string matches the pattern. */
export function matchUrlWithPattern(url: string, pattern: string) {
  const escapedPattern = pattern
    // Escape forward slashes to use them as literal characters in the regex.
    .replace(/\//g, '\\/')
    // Replace '[id]' placeholders with regex patterns for UUIDs.
    .replace(/\[id\]/g, '[0-9A-Fa-f-]+')
    .replace(/\[id\]/g, '[0-9A-Fa-f-]+')
    .replace(/\[id\]/g, '[0-9A-Fa-f-]+');
  // Create a regex object with the modified pattern and perform a case-insensitive match.
  // eslint-disable-next-line i18next/no-literal-string
  const regex = new RegExp(`^${escapedPattern}$`, 'i');

  return regex.test(url);
}

/* This function extracts UUIDs from a given URL string using a regex pattern. */
export function extractUUIDsFromUrl(url: string): string[] {
  const uuidPattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
  const uuids = url.match(uuidPattern) || [];

  return uuids;
}

/* This function checks if a user has the required permissions based on their organizationId. */
export function doesUserHavePermissions(userInfo: GetMeQuery, url: string, allowedPermissions: Roles[]): boolean {
  const userPermissions = userInfo?.me?.permissions;

  if (!userPermissions) {
    return false;
  }

  const uuids = extractUUIDsFromUrl(url);

  // Check if any of the UUIDs in the list matches the user's permissions
  // and the allowed permissions.
  return uuids.some((uuid) => {
    const permission = userPermissions.find((perm) => perm.organizationId === uuid);
    return permission && allowedPermissions.includes(permission.accessLevel as Roles);
  });
}

/* This function matches a given URL with the routes defined in a routes list.
   It recursively searches through nested routes until it finds a match,
   returning whether a match was found and the allowed permissions for the matched route. */
export function matchUrlOnRoutes(routesList: Routes, url: string): MatchResult {
  let result: MatchResult = { foundMatch: false, allowedPermissions: [], hasPublicAccess: false };

  Object.keys(routesList).some((key) => {
    const route = routesList[key];

    if (route.path && route.pattern) {
      if (matchUrlWithPattern(url, route.pattern as string)) {
        result = {
          foundMatch: true,
          allowedPermissions: route.allowedRoles as Roles[],
          hasPublicAccess: !!route?.publicAccess
        };
        return true;
      }
    } else {
      const innerResult = matchUrlOnRoutes(route as Routes, url);
      if (innerResult.foundMatch) {
        result = {
          foundMatch: true,
          allowedPermissions: innerResult.allowedPermissions ?? [],
          hasPublicAccess: innerResult?.hasPublicAccess
        };
        return true;
      }
    }

    return false;
  });

  return result;
}

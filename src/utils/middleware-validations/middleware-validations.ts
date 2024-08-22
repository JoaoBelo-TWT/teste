import { GetMeQuery } from '@/__generated__/graphql';
import { routes } from '@/routes/routes';

import {
  doesUserHavePermissions,
  matchUrlOnRoutes,
  removeLanguagePrefix
} from '../user-permissions/user-permissions';

interface ValidateUserPermissionByRoleProps {
  url: string;
  userData?: GetMeQuery | null;
}

export function validateUserPermissionByRole({ url, userData }: ValidateUserPermissionByRoleProps): boolean {
  const urlWithoutLangPrefix = removeLanguagePrefix(url);
  const resultMatchedRoute = matchUrlOnRoutes(routes, urlWithoutLangPrefix);

  if (resultMatchedRoute?.hasPublicAccess) {
    return true;
  }

  if (!userData) {
    return false;
  }

  if (resultMatchedRoute.foundMatch) {
    if (resultMatchedRoute.allowedPermissions) {
      const userResult = doesUserHavePermissions(userData, urlWithoutLangPrefix, resultMatchedRoute.allowedPermissions);
      if (userResult) {
        return true;
      }
    }
  }

  return false;
}

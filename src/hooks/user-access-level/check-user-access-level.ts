import { AccessLevel } from '@/__generated__/graphql';
import { getMe } from '@/lib/react-query/user/query-me';

interface UserAccessLevelProps {
  organizationId: string;
}

export async function useUserAccessLevel({ organizationId }: UserAccessLevelProps): Promise<AccessLevel | undefined> {
  try {
    const user = await getMe();

    const result = user.me?.permissions
      ?.find((entry) => entry.organizationId === organizationId)
      ?.accessLevel?.toUpperCase() as AccessLevel;

    return result;
  } catch (error) {
    return undefined;
  }
}

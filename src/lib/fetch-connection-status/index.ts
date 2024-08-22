import { IsWebsiteConnectedQuery } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { getSourceConnectionStatusQuery } from '@/lib/apollo/queries/website-connection-status';

export async function fetchSourceConnectionStatus(websiteId: string): Promise<boolean> {
  const { data } = await getClient().query<IsWebsiteConnectedQuery>({
    query: getSourceConnectionStatusQuery,
    variables: {
      websiteId
    }
  });

  try {
    return data.isWebsiteConnected;
  } catch (error) {
    return false;
  }
}

import { IsHubspotConnectedQuery } from '@/__generated__/graphql';
import { getClient } from '@/lib/apollo/apollo-client';
import { ConnectionStatus } from '@/types/connection';
import { convertToConnectionStatus } from '@/utils/connection-status-converter';

import { getHubspotConnectionStatusQuery } from '../apollo/queries/website-hubspot-connection-status';

export async function fetchHubspotConnectionStatus(websiteId: string): Promise<ConnectionStatus> {
  try {
    const { data } = await getClient().query<IsHubspotConnectedQuery>({
      query: getHubspotConnectionStatusQuery,
      variables: {
        websiteId
      }
    });
    return convertToConnectionStatus(data.isHubspotConnected);
  } catch (error) {
    return convertToConnectionStatus(null);
  }
}

import { getClient } from '@/lib/apollo/apollo-client';

import { getWebsiteNotificationsQuery } from '../apollo/queries/website-notifications';

export const fetchNotifications = async (websiteId: string, take?: number) => {
  try {
    const data = await getClient().query({
      query: getWebsiteNotificationsQuery,
      variables: {
        websiteId,
        take: take ?? 6
      }
    });
    return data;
  } catch (error) {
    return null;
  }
};

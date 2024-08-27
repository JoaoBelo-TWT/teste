// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLClient } from 'graphql-request';

import { getUserAccessToken } from '../apollo/access-token-action';

const getToken = () => Promise.resolve(getUserAccessToken());

export const graphQLClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_SOURCE_API_URL}/graphql`, {
  requestMiddleware: async (request) => {
    const token = await getToken();
    return {
      ...request,
      headers: {
        ...request.headers,
        authorization: `Bearer ${token.accessToken}`
      }
    };
  }
});

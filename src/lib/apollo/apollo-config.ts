import { HttpLink, from, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr';
import { Kind, OperationTypeNode } from 'graphql';
import { createClient } from 'graphql-ws';

import { captureError } from '@/utils/errors/capture-error';

import { getUserAccessToken } from './access-token-action';

const authorizationLink = setContext(async (_, { headers }) => {
  const { accessToken } = await getUserAccessToken();

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: `Bearer ${accessToken}`
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      if (message !== 'Unauthorized') {
        captureError(
          new Error(
            // eslint-disable-next-line max-len
            `[GraphQL error]: Message: ${message}, Location: ${locations?.toString() ?? ''}, Path: ${path?.toString() ?? ''}`
          )
        );
      }
    });

  if (networkError) captureError(networkError);
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: new URL(
      '/graphql',
      process.env.NEXT_PUBLIC_SOURCE_API_URL?.replace('https', 'wss').replace('http', 'ws')
    ).toString(),
    connectionParams: async () => {
      const { accessToken } = await getUserAccessToken();

      return {
        authorization: `Bearer ${accessToken}`
      };
    }
  })
);

// This is the chain's terminating link.
const httpLink = new HttpLink({
  uri: new URL('/graphql', process.env.NEXT_PUBLIC_SOURCE_API_URL).toString()
});

/**
 * This link is used to split the request based on the operation type.
 * If the operation is a subscription, it will be sent to the wsLink.
 * If it is a query or mutation, it will be sent to the httpLink.
 */
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === Kind.OPERATION_DEFINITION && definition.operation === OperationTypeNode.SUBSCRIPTION;
  },
  wsLink,
  from([authorizationLink, httpLink])
);

// Generate the client
export function makeClient() {
  return new NextSSRApolloClient({
    queryDeduplication: true,
    ssrForceFetchDelay: 100,
    ssrMode: typeof window === 'undefined',
    link:
      typeof window === 'undefined'
        ? from([
            new SSRMultipartLink({
              stripDefer: true
            }),
            authorizationLink,
            errorLink,
            httpLink
          ])
        : from([errorLink, splitLink]),
    defaultOptions: {
      // apollo client uses the cache for updating data when using subscribe to more so we can't use no-cache
      // https://github.com/apollographql/apollo-feature-requests/issues/384
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none'
      },
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none'
      },
      mutate: {
        errorPolicy: 'none'
      }
    },
    cache: new NextSSRInMemoryCache()
  });
}

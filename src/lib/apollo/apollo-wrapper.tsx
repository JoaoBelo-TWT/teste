'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';

import { makeClient } from './apollo-config';

export function ApolloWrapper({ children }: Readonly<React.PropsWithChildren>) {
  return <ApolloNextAppProvider makeClient={() => makeClient()}>{children}</ApolloNextAppProvider>;
}

import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import { makeClient } from './apollo-config';

export const { getClient } = registerApolloClient(() => makeClient());

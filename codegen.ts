// eslint-disable-next-line import/no-extraneous-dependencies
import { CodegenConfig } from '@graphql-codegen/cli';

import 'dotenv/config';

/*
 * This file is used by the GraphQL Code Generator to generate TypeScript types
 * for our GraphQL queries and mutations.
 *
 * See https://graphql-code-generator.com/docs/getting-started/installation for
 * more information.
 *
 * The generated types are used by the Apollo Client to type check our queries
 * and mutations.
 *
 * See https://www.apollographql.com/docs/react/data/queries/#typescript for
 * more information.
 *
 * The generated types are also used by the Relay Style Pagination cache
 * normalization.
 *
 * See https://www.apollographql.com/docs/react/pagination/relay-style/#normalization
 * for more information.
 */
const config: CodegenConfig = {
  schema: new URL('/graphql', process.env.NEXT_PUBLIC_SOURCE_API_URL).toString(),
  documents: ['src/lib/apollo/**/*.ts?(x)'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql'
      },
      plugins: [],
      config: {
        defaultScalarType: 'unknown',
        scalars: {
          UUID: 'string',
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
          Date: 'string'
        },
        strictScalars: true
      }
    }
  }
};

export default config;

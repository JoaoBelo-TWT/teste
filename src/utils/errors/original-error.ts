import { ApolloError } from '@apollo/client';

interface OriginalError {
  message: string;
  error?: string;
  statusCode?: number;
}

interface GraphQLError {
  message: string;
  path?: string[];
  locations?: { line: number; column: number }[];
  extensions?: {
    originalError?: OriginalError;
  };
}

export function getOriginalError(error: unknown): OriginalError | undefined {
  if (error instanceof ApolloError && error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0] as GraphQLError;
    return graphQLError.extensions?.originalError;
  }
  return undefined;
}

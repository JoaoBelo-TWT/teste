import { ReactNode } from 'react';

import { ApolloWrapper } from '@/lib/apollo/apollo-wrapper';

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}

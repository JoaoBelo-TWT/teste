import { SimpleGrid, type SimpleGridProps } from '@mantine/core';

// This Grid component has a default behavior according to figma design
// but it is possible to override those default props if necessary when using the component
export function Grid({ children, ...props }: SimpleGridProps) {
  return (
    <SimpleGrid cols={{ base: 4, md: 8, lg: 12 }} spacing={{ base: 8, md: 0 }} {...props}>
      {children}
    </SimpleGrid>
  );
}

export function mapToLabelValue<
  T extends {
    edges: Array<{ node: { id: string; name: string; __typename?: string } & Record<string, unknown> }>;
  }
>(dataStructure: T): Array<{ label: string; value: string }> {
  return dataStructure.edges.map(({ node }) => ({
    label: node.name,
    value: node.id
  }));
}

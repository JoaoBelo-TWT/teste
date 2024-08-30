export type TableRowData = {
  page: { text: string; imageSrc?: string };
  views: number;
  conversions: number;
};

export type TableCardProps = {
  headers: string[];
  data: TableRowData[];
  websiteUrl?: string | null;
};

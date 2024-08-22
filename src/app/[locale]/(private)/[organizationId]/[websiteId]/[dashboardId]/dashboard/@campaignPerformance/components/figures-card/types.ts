export type Figure = {
  label: string;
  value: string;
};

export type FiguresCardProps = {
  title: string;
  status?: string;
  dateInterval?: string;
  urlSourcesImages: string[];
  additionalAvatars?: number;
  data: Figure[];
  href?: string;
};

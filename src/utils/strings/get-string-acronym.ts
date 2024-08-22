export type GetStringAcronymParams = {
  value: string;
};

export function getStringAcronym({ value }: GetStringAcronymParams): string {
  if (!value) {
    return '';
  }

  const words = value.split(' ');
  const acronym = words.reduce((acc, word) => acc + word[0], '');

  return acronym;
}

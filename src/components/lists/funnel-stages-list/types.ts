import type { FieldValues, UseFieldArrayRemove, UseFormRegister } from 'react-hook-form';

export type ItemProps<T extends FieldValues> = {
  id?: string;
  editInlineInput?: boolean;
  index: number;
  onRemove: UseFieldArrayRemove;
  value: T[keyof T];
  register: UseFormRegister<T>;
  errorMessage?: string;
  disableDelete?: boolean;
  useModalsToEdit?: boolean;
  formAction?: () => void;
  viewOnly?: boolean;
  loading?: boolean;
};

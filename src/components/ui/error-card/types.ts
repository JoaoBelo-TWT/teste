import { BaseCardProps } from '../base-card/types';

export type ErrorCardProps = BaseCardProps & {
  message?: string;
  reset: () => void;
};

import { Spinner } from '@/components/ui/spinner';

import classes from './index.module.css';

export function SpinnerFullPage({ color }: Readonly<{ color?: string }>) {
  return (
    <div className={classes['spinner-full-page']}>
      <Spinner color={color} />
    </div>
  );
}

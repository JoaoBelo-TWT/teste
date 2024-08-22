import { ProgressIcon } from '@/components/ui/progress-icon';

import classes from './index.module.css';

export const Stepper = ({
  firstStepCompleted,
  secondStepCompleted
}: Readonly<{ firstStepCompleted: boolean; secondStepCompleted: boolean }>) => (
  <div className={classes.stepper}>
    <ProgressIcon isComplete={firstStepCompleted} />
    <div className={classes.stepper__divider} />
    <ProgressIcon isComplete={secondStepCompleted} />
  </div>
);

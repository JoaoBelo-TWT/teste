import { useFormStatus } from 'react-dom';

import { Button } from '../button';
import { ButtonProps } from '../button/types';

export function ButtonForm(props: Readonly<ButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} {...props}>
      {props.children}
    </Button>
  );
}

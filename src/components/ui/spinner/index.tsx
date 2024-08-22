import { ClipLoader } from 'react-spinners';

import { theme } from '../../../../theme';

const DEFAULT_COLOR = theme?.colors?.purple?.[6];

export function Spinner({ color = DEFAULT_COLOR }: Readonly<{ color?: string }>) {
  return (
    <div>
      <ClipLoader color={color} size={100} />
    </div>
  );
}

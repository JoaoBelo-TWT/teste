import NotFound from '../../components/sections/not-found';
import { Providers } from '../providers';

export default function NotFound404() {
  return (
    <Providers>
      <NotFound fullScreen goBack />
    </Providers>
  );
}

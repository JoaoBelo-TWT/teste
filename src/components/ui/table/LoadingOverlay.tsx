import { LoadingOverlay } from '@mantine/core';

import { Spinner } from '../spinner';

export const TableLoadingOverlay = ({ isVisible }: { isVisible: boolean }) => (
  <LoadingOverlay visible={isVisible} zIndex={1000} loaderProps={{ children: <Spinner /> }} />
);

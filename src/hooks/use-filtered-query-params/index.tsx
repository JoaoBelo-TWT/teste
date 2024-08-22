import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

type UseFilteredQueryParamsProps = {
  preserveQueryParams: string[] | undefined;
};

const useFilteredQueryParams = ({ preserveQueryParams }: UseFilteredQueryParamsProps) => {
  const searchParams = useSearchParams();
  const filteredQueryParams = useMemo(() => {
    if (!preserveQueryParams || preserveQueryParams.length === 0) return null;

    const filteredParams = new URLSearchParams();
    preserveQueryParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) filteredParams.set(param, value);
    });

    return filteredParams;
  }, [preserveQueryParams, searchParams]);

  return filteredQueryParams;
};

export default useFilteredQueryParams;

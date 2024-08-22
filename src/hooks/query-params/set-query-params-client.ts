import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SetQueryParamParams {
  name: string;
  value?: string | number | null;
}

export function useSetQueryParamClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQueryParam = ({ name, value }: SetQueryParamParams) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!value) {
      current.delete(name);
    } else {
      current.set(name, value.toString());
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`, {
      scroll: false
    });
  };

  return { setQueryParam };
}

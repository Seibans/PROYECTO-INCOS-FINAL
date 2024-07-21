"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/*
 * refetchOnWindowFocus: Cuando sales de tu app y luego vuelves React Query vuelve hacer la petición de la data.
 * refetchOnMount: Cuando el componente se vuelve a montar entonces volverá a hacer la petición.
 * retry: Número de veces que se volverá a intentar la petición.
*/
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

export const ReactQueryClientProvider = ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
		{children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)
import Loader from 'components/Loader';
import UserProvider from 'contexts/userContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from 'react-query';

import type { AppProps } from 'next/app';

import 'styles/app.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [queryClient] = useState<QueryClient>(new QueryClient());

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydrate}>
        <UserProvider>
          {pageLoading ? <Loader /> : <Component {...pageProps} />}
        </UserProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;

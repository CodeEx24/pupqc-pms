import '@/styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
  'Mgo+DSMBaFt+QHFqVkFrWU5HaV1CX2BZf1N8R2FTeldgBShNYlxTR3ZbQl5iSHxXckNhWntd;Mgo+DSMBPh8sVXJ1S0d+X1ZPc0BBQmFJfFBmRGNTfVx6cVxWESFaRnZdQV1nSX1Sd0dnXXlcdHxW;ORg4AjUWIQA/Gnt2VFhhQlJDfVpdXnxLflF1VWJZdVxyflBPcC0sT3RfQF5jTX5Qd0RhXXtYcnJXQg==;MTU5ODI4MkAzMjMxMmUzMTJlMzMzN1hNam5OYnNkZjdiY2ZWM2tMMXViS1lraDZ1NnFwak4xSnZUVjJCdEx0WHM9;MTU5ODI4M0AzMjMxMmUzMTJlMzMzN0JaZ3AvbEVxMENkSUdrYjFDQUdOYk8xT1pCZzRJNWpWUURPR0tOcUtHbUU9;NRAiBiAaIQQuGjN/V0d+XU9HcVRHQmBWfFN0RnNYf1Rydl9DaUwgOX1dQl9gSXpTdURiW3tadndXRmQ=;MTU5ODI4NUAzMjMxMmUzMTJlMzMzN1Zqd2VKM3d2blAvUEczTGVrbFVic0I0WHFpMTE1WTNud0NQaW0wMFNSRDA9;MTU5ODI4NkAzMjMxMmUzMTJlMzMzN0RjTnR5VDhIQ0Vxd3RQejVvVklrZlY3VjJkRFoyZ29udXNwM3Z4NU00bGs9;Mgo+DSMBMAY9C3t2VFhhQlJDfVpdXnxLflF1VWJZdVxyflBPcC0sT3RfQF5jTX5Qd0RhXXtYc3xVQg==;MTU5ODI4OEAzMjMxMmUzMTJlMzMzN01qQzYrVTl1NGZQbTNIeVF3M3VTY3lnVXA4bjVzR1ZRTGp6ZnR4MExuWUE9;MTU5ODI4OUAzMjMxMmUzMTJlMzMzN0FxbkFtdTFRc1ZLZC91ejFzYURnUU9zeHpISnJmdHdLZGRRQ21qWVNMS2c9;MTU5ODI5MEAzMjMxMmUzMTJlMzMzN1Zqd2VKM3d2blAvUEczTGVrbFVic0I0WHFpMTE1WTNud0NQaW0wMFNSRDA9'
);

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          {Component.auth ? (
            <Auth role={Component.auth.role}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}

function Auth({ children, role }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (role === 'faculty' && !session.user.isAdmin) {
    router.push('/student/home');
    return null;
  }

  if (role === 'student' && session.user.isAdmin) {
    router.push('/faculty/home');
    return null;
  }

  return children;
}

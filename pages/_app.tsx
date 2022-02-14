import 'styles/globals.css'
import { withTRPC } from '@trpc/next'
import { AppType } from 'next/dist/shared/lib/utils'
// import { AppRouter } from './api/trpc/[trpc]';
import { AppRouter } from 'backend'
import type { ExtendedAppProps } from 'lib/types'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import WithAuth from 'lib/auth/WithAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getBaseUrl } from 'lib/helper'

export const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: ExtendedAppProps) => {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <QueryClientProvider client={queryClient}>
        {Component.auth ? (
          <WithAuth options={Component.auth}>
            <Component {...pageProps} />
          </WithAuth>
        ) : (
          <Component {...pageProps} />
        )}
        <ToastContainer />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true
})(MyApp)

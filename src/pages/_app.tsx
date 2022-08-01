import '../styles/globals.css'
import { CustomAppProps } from '../types/app'

import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react"

import { withTRPC } from '@trpc/next'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { AppRouter } from '../server/route/app.router';

import superjson from 'superjson';

import { url } from '../constants';

import Header from '../components/header';

function MyApp({Component, pageProps: { session, ...pageProps }}: CustomAppProps): JSX.Element {
  return (
  <SessionProvider session={session}>
    <Header />
    {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
  </SessionProvider>
  )
}



function Auth({ children }: { children: JSX.Element }) {
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return children
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          }
        }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: false,
})(MyApp)

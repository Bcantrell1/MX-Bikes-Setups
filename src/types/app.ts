import type { AppProps } from 'next/app'
import type { NextComponentType  } from 'next'

export type CustomAppProps = AppProps & {
    Component: NextComponentType & {auth?: boolean} // add auth type
  }
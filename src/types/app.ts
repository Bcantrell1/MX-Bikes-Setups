import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'

export type CustomAppProps = AppProps & {
    Component: NextComponentType & {auth?: boolean} // add auth type
  }
'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactQueryProvider } from '@/lib/query/provider'
import { ThemeProvider } from '@/components/ThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryProvider>
    </SessionProvider>
  )
}

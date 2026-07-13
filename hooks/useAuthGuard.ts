'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'

export function useAuthGuard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) ?? 'en'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace(`/${locale}/auth`)
    }
  }, [status, router, locale])

  return {
    session,
    isLoading: status === 'loading',
    isLoggedIn: status === 'authenticated',
    role: session?.user?.role,
    name: session?.user?.name,
  }
}

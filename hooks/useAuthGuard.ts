'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';

export function useAuthGuard() {
  const { isLoggedIn, role } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'uz';

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !role) {
      router.replace(`/${locale}/auth`);
    }
  }, [isLoggedIn, role, router, locale]);

  return { isLoggedIn, role };
}

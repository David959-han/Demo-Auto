'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role, Locale } from '@/types';

interface AuthState {
  role: Role | null;
  name: string;
  locale: Locale;
  isLoggedIn: boolean;
  login: (role: Role, name: string) => void;
  logout: () => void;
  setLocale: (locale: Locale) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: null,
      name: '',
      locale: 'en',
      isLoggedIn: false,

      login: (role, name) =>
        set({ role, name, isLoggedIn: true }),

      logout: () =>
        set({ role: null, name: '', isLoggedIn: false }),

      setLocale: (locale) =>
        set({ locale }),
    }),
    {
      name: 'yantar-auth',
      skipHydration: true,
    }
  )
);

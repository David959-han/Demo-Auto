'use client';

import { useEffect, useRef } from 'react';
import { useThemeStore } from '@/lib/stores/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  const mounted = useRef(false);

  // Hydrate from localStorage on first mount
  useEffect(() => {
    useThemeStore.persist.rehydrate();
    mounted.current = true;
  }, []);

  // Apply theme class to <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

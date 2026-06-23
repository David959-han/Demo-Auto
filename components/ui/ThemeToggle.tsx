'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/lib/stores/themeStore';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex items-center justify-center w-8 h-8 rounded-lg border transition-colors duration-200
        ${isDark
          ? 'border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40'
          : 'border-slate-200 bg-white text-slate-500 hover:text-amber-500 hover:border-amber-400'
        } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </motion.div>
    </button>
  );
}

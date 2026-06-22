'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { cn } from '@/lib/utils/cn';

const localeNames: Record<string, string> = { uz: "O'Z", en: 'EN', ar: 'AR' };
const locales = ['uz', 'en', 'ar'];

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (next: string) => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  const navLinks = [
    { label: t('features'), href: '#features' },
    { label: t('pricing'), href: '#pricing' },
    { label: t('contact'), href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass-strong border-b border-amber-500/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute inset-0 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/30 transition-colors" />
            <Zap className="w-4 h-4 text-amber-400 relative z-10" fill="currentColor" />
          </div>
          <span
            className="text-sm font-bold tracking-widest text-white uppercase"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            Yantar <span className="text-amber-400">Auto</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 hover:text-amber-400 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 inset-s-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Locale switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={cn(
                  'px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-200',
                  locale === l
                    ? 'bg-amber-500 text-black'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>

          {/* CTA */}
          <MagneticButton>
            <a
              href={`/${locale}/auth`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              {t('demo')}
            </a>
          </MagneticButton>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-strong border-t border-zinc-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-sm text-zinc-300 hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {/* Mobile locale switcher */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { switchLocale(l); setMenuOpen(false); }}
                    className={cn(
                      'px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
                      locale === l
                        ? 'bg-amber-500 text-black'
                        : 'text-zinc-400 bg-zinc-800 hover:text-white'
                    )}
                  >
                    {localeNames[l]}
                  </button>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-semibold mt-2"
              >
                {t('demo')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

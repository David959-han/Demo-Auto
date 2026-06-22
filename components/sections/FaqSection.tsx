'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { cn } from '@/lib/utils/cn';

export function FaqSection() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14 space-y-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium">
              <HelpCircle className="w-3 h-3" />
              {t('title')}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl font-black text-white">{t('title')}</h2>
          </ScrollReveal>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.07}>
              <div
                className={cn(
                  'rounded-xl border transition-all duration-300 overflow-hidden',
                  open === i
                    ? 'border-amber-500/30 bg-amber-500/5'
                    : 'border-zinc-700/60 bg-zinc-900/60 hover:border-zinc-600'
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className={cn(
                    'text-sm font-semibold',
                    open === i ? 'text-amber-400' : 'text-zinc-200'
                  )}>
                    {faq.q}
                  </span>
                  <span className={cn(
                    'shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-colors',
                    open === i ? 'bg-amber-500/20 text-amber-400' : 'bg-zinc-800 text-zinc-500'
                  )}>
                    {open === i ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <p className="px-5 pb-4 text-sm text-zinc-400 leading-relaxed border-t border-amber-500/10 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

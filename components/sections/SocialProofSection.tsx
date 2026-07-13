'use client';

import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { AnimatedCounter } from '@/components/effects/AnimatedCounter';

export function SocialProofSection() {
  const t = useTranslations('social');

  const stats = [
    { val: 500, suffix: '+', label: t('stat1_label'), isNum: true },
    { val: 3,   suffix: '',  label: t('stat2_label'), isNum: true },
    { val: 14,  suffix: '',  label: t('stat3_label'), isNum: true },
    { val: null, suffix: '24/7', label: t('stat4_label'), isNum: false },
  ];

  return (
    <section className="py-16 relative border-y border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">
              {t('heading')}
            </p>
            <p className="text-zinc-400 text-base mt-1">{t('subheading')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="text-center p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-amber-500/20 transition-colors">
                <div className="text-3xl font-black text-white mb-1">
                  {stat.isNum && stat.val !== null ? (
                    <AnimatedCounter to={stat.val} suffix={stat.suffix} />
                  ) : (
                    <span>{stat.suffix}</span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 font-medium">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Region flags */}
        <ScrollReveal delay={0.3}>
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {[
              { flag: '🇦🇪', name: 'UAE' },
              { flag: '🇸🇦', name: 'Saudi Arabia' },
              { flag: '🇪🇬', name: 'Egypt' },
            ].map((r) => (
              <div key={r.name} className="flex items-center gap-2 text-zinc-500 text-sm">
                <span className="text-xl">{r.flag}</span>
                <span>{r.name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

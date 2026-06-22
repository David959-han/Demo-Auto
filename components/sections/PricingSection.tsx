'use client';

import { useTranslations } from 'next-intl';
import { Check, Zap } from 'lucide-react';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { cn } from '@/lib/utils/cn';

export function PricingSection() {
  const t = useTranslations('pricing');

  const plans = [
    {
      name: t('start_name'),
      price: t('start_price'),
      desc: t('start_desc'),
      cta: t('cta_start'),
      href: '#contact',
      featured: false,
      features: [
        t('feature_mechanics_1'),
        t('feature_customers'),
        t('feature_orders'),
        `${t('feature_sms')} ✗`,
        `${t('feature_reports')} ✗`,
      ],
      disabled: [2, 3, 4],
    },
    {
      name: t('pro_name'),
      price: t('pro_price'),
      oldPrice: t('pro_old_price'),
      desc: t('pro_desc'),
      cta: t('cta_pro'),
      href: '#contact',
      featured: true,
      features: [
        t('feature_mechanics_10'),
        t('feature_customers'),
        t('feature_orders'),
        t('feature_sms'),
        t('feature_reports'),
      ],
      disabled: [] as number[],
    },
    {
      name: t('enterprise_name'),
      price: t('enterprise_price'),
      desc: t('enterprise_desc'),
      cta: t('cta_enterprise'),
      href: '#contact',
      featured: false,
      features: [
        t('feature_mechanics_unlimited'),
        t('feature_customers'),
        t('feature_orders'),
        t('feature_sms'),
        t('feature_reports'),
        t('feature_api'),
        t('feature_support'),
      ],
      disabled: [] as number[],
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 gradient-radial-amber opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium">
              <Zap className="w-3 h-3" />
              {t('title')}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-black text-white">{t('subtitle')}</h2>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <div
                className={cn(
                  'relative rounded-2xl border p-6 transition-all duration-300',
                  plan.featured
                    ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-zinc-900/80 shadow-2xl shadow-amber-500/10 scale-105'
                    : 'border-zinc-700/60 bg-zinc-900/60 hover:border-zinc-600'
                )}
              >
                {/* Popular badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold shadow-lg">
                      ⭐ {t('badge_popular')}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-4">
                  <h3 className={cn(
                    'text-lg font-black mb-1',
                    plan.featured ? 'text-amber-400' : 'text-white'
                  )}>
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.oldPrice && (
                    <span className="text-sm text-zinc-600 line-through mr-2">{plan.oldPrice}</span>
                  )}
                  <div className="flex items-end gap-1">
                    <span className={cn(
                      'text-4xl font-black',
                      plan.featured ? 'text-white' : 'text-zinc-200'
                    )}>
                      {plan.price}
                    </span>
                    {plan.price !== t('enterprise_price') && (
                      <span className="text-zinc-500 text-sm mb-1">/{t('monthly')}</span>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <MagneticButton className="w-full mb-6">
                  <a
                    href={plan.href}
                    className={cn(
                      'w-full flex items-center justify-center py-2.5 rounded-xl text-sm font-bold transition-all duration-200',
                      plan.featured
                        ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/25'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700'
                    )}
                  >
                    {plan.cta}
                  </a>
                </MagneticButton>

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className={cn(
                      'flex items-center gap-2 text-sm',
                      plan.disabled.includes(fi) ? 'text-zinc-600' : 'text-zinc-300'
                    )}>
                      <Check className={cn(
                        'w-4 h-4 shrink-0',
                        plan.disabled.includes(fi)
                          ? 'text-zinc-700'
                          : plan.featured ? 'text-amber-400' : 'text-green-400'
                      )} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

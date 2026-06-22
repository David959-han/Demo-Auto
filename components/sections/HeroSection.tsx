'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Play, ArrowRight, TrendingUp, Users, Star } from 'lucide-react';
import { MouseParallax } from '@/components/effects/MouseParallax';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { AnimatedCounter } from '@/components/effects/AnimatedCounter';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">

      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — Text */}
          <div className="space-y-8">

            {/* Badge */}
            <ScrollReveal delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {t('badge')}
              </div>
            </ScrollReveal>

            {/* Headline */}
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                <span className="text-white">{t('headline')}</span>
                <br />
                <span className="gradient-amber-text shimmer-text">{t('headline2')}</span>
              </h1>
            </ScrollReveal>

            {/* Subheadline */}
            <ScrollReveal delay={0.2}>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                {t('subheadline')}
              </p>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <MagneticButton>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all duration-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40"
                  >
                    {t('cta_primary')}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <button className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border border-zinc-700 hover:border-amber-500/50 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-200 bg-zinc-800/50 hover:bg-zinc-800">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 group-hover:bg-amber-500/20 transition-colors">
                      <Play className="w-3 h-3 text-amber-400 fill-current ml-0.5" />
                    </span>
                    {t('cta_secondary')}
                  </button>
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-6 pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">
                      <AnimatedCounter to={1240} suffix="+" />
                    </div>
                    <div className="text-xs text-zinc-500">{t('stat_customers')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">
                      <AnimatedCounter to={48} suffix="+" />
                    </div>
                    <div className="text-xs text-zinc-500">{t('stat_mechanics')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Star className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">
                      <AnimatedCounter to={98} suffix="%" />
                    </div>
                    <div className="text-xs text-zinc-500">{t('stat_satisfaction')}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — Dashboard Mockup */}
          <MouseParallax strength={12} className="hidden lg:block">
            <ScrollReveal delay={0.2} direction="left">
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute -inset-4 rounded-2xl bg-amber-500/5 blur-2xl" />

                {/* Dashboard card */}
                <div className="relative rounded-2xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-sm overflow-hidden shadow-2xl">

                  {/* Top bar */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">yantar-auto.uz/dashboard</span>
                    <div className="w-16" />
                  </div>

                  <div className="p-4 space-y-3">
                    {/* KPI row */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Buyurtmalar', value: '24', change: '+8%', color: 'text-amber-400' },
                        { label: 'Mijozlar', value: '1,240', change: '+12%', color: 'text-green-400' },
                        { label: 'Daromad', value: '4.2M', change: '+5%', color: 'text-blue-400' },
                      ].map((kpi) => (
                        <div key={kpi.label} className="rounded-xl bg-zinc-800/80 p-3 border border-zinc-700/50">
                          <div className={`text-lg font-black ${kpi.color}`}>{kpi.value}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">{kpi.label}</div>
                          <div className="text-[10px] text-green-400 mt-1">{kpi.change}</div>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="rounded-xl bg-zinc-800/60 p-3 border border-zinc-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-400 font-medium">Haftalik daromad</span>
                        <span className="text-xs text-amber-400">↑ 18%</span>
                      </div>
                      <div className="flex items-end gap-1 h-16">
                        {[35, 55, 42, 70, 58, 85, 72].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                            className={`flex-1 rounded-sm ${i === 5 ? 'bg-amber-400' : 'bg-zinc-600'}`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-1">
                        {['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map((d) => (
                          <span key={d} className="text-[9px] text-zinc-600">{d}</span>
                        ))}
                      </div>
                    </div>

                    {/* Recent orders */}
                    <div className="rounded-xl bg-zinc-800/60 p-3 border border-zinc-700/50 space-y-2">
                      <span className="text-xs text-zinc-400 font-medium">So'nggi buyurtmalar</span>
                      {[
                        { plate: '01 A 777 AA', work: 'Moy almashtirish', status: 'Bajarildi', color: 'text-green-400' },
                        { plate: '10 B 234 CC', work: 'Tormoz kolodkasi', status: 'Jarayonda', color: 'text-amber-400' },
                        { plate: '30 K 891 BB', work: 'Yuvish', status: 'Kutmoqda', color: 'text-blue-400' },
                      ].map((order) => (
                        <div key={order.plate} className="flex items-center justify-between py-1 border-b border-zinc-700/30 last:border-0">
                          <div>
                            <div className="text-xs text-white font-mono">{order.plate}</div>
                            <div className="text-[10px] text-zinc-500">{order.work}</div>
                          </div>
                          <span className={`text-[10px] font-medium ${order.color}`}>{order.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-semibold shadow-lg"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Jonli
                </motion.div>
              </div>
            </ScrollReveal>
          </MouseParallax>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent" />
    </section>
  );
}

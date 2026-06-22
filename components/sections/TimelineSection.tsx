'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Bell, Car } from 'lucide-react';
import { OilDropIcon, ShieldCheckIcon } from '@/components/icons';
import { ScrollReveal } from '@/components/effects/ScrollReveal';

export function TimelineSection() {
  const t = useTranslations('timeline');
  const lineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(lineRef, { once: true, margin: '-100px' });

  const events = [
    {
      date: t('event1_date'),
      title: t('event1_title'),
      desc: t('event1_desc'),
      status: t('event1_status'),
      icon: <OilDropIcon size={16} />,
      done: true,
    },
    {
      date: t('event2_date'),
      title: t('event2_title'),
      desc: t('event2_desc'),
      status: t('event2_status'),
      icon: <ShieldCheckIcon size={16} />,
      done: true,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-zinc-900/30 to-[#09090b]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div className="space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium">
                <Car className="w-3 h-3" />
                {t('title')}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                {t('subtitle')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-zinc-400">
                Har bir mashina uchun to&apos;liq xizmat tarixi. SMS eslatmalar, kafolat, zapchast — hammasi bir joyda.
              </p>
            </ScrollReveal>
          </div>

          {/* Right — Timeline Card */}
          <ScrollReveal delay={0.15} direction="left">
            <div className="relative rounded-2xl border border-zinc-700/60 bg-zinc-900/80 backdrop-blur-sm overflow-hidden p-6 shadow-2xl">
              {/* Ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl" />

              {/* Car header */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white">{t('car')}</span>
                  </div>
                  <code className="text-sm font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {t('plate')}
                  </code>
                  <p className="text-xs text-zinc-500 mt-1">{t('owner')}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  Faol
                </span>
              </div>

              {/* Timeline */}
              <div className="relative pl-8" ref={lineRef}>
                {/* Animated vertical line */}
                <motion.div
                  className="absolute left-3 top-0 w-px bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: '100%' } : {}}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                />

                <div className="space-y-6">
                  {events.map((ev, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.25, duration: 0.5 }}
                      className="relative"
                    >
                      {/* Dot */}
                      <div className="absolute -left-8 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-zinc-800 border-2 border-amber-500 text-amber-400">
                        {ev.icon}
                      </div>

                      <div className="rounded-xl bg-zinc-800/60 border border-zinc-700/50 p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-zinc-500 font-mono">{ev.date}</span>
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle2 className="w-3 h-3" />
                            {ev.status}
                          </span>
                        </div>
                        <div className="font-semibold text-white text-sm">{ev.title}</div>
                        <div className="text-xs text-zinc-400 mt-0.5">{ev.desc}</div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Next service alert */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.95, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="absolute -left-8 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 border-2 border-amber-500 animate-pulse">
                      <Bell className="w-3 h-3 text-amber-400" />
                    </div>

                    <div className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                          Keyingi Xizmat
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-white">{t('next_service')}</div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          📱 {t('sms_scheduled')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

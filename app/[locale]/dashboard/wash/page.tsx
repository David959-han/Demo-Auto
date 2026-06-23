'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { generateRandomWashBays, type RandomWashBay } from '@/lib/utils/randomDemo';
import { cn } from '@/lib/utils/cn';
import type { WashStatus } from '@/types';

export default function WashPage() {
  const t = useTranslations('dashboard');
  const [bays, setBays] = useState<RandomWashBay[]>(() => generateRandomWashBays(6));
  const [spinning, setSpinning] = useState(false);

  const refresh = useCallback(() => {
    setSpinning(true);
    setTimeout(() => {
      setBays(generateRandomWashBays(6));
      setSpinning(false);
    }, 400);
  }, []);

  const statusConfig: Record<WashStatus, {
    label: string; icon: React.ReactNode;
    card: string; badge: string; dot: string;
  }> = {
    washing: {
      label: t('bay_washing'),
      icon: <Droplets className="w-5 h-5 animate-pulse" />,
      card: 'border-blue-500/40 bg-blue-500/5',
      badge: 'bg-blue-500/20 text-blue-400',
      dot: 'bg-blue-400',
    },
    empty: {
      label: t('bay_empty'),
      icon: <CheckCircle className="w-5 h-5" />,
      card: 'border-green-500/40 bg-green-500/5',
      badge: 'bg-green-500/20 text-green-400',
      dot: 'bg-green-400',
    },
    booked: {
      label: t('bay_booked'),
      icon: <Clock className="w-5 h-5" />,
      card: 'border-amber-500/40 bg-amber-500/5',
      badge: 'bg-amber-500/20 text-amber-400',
      dot: 'bg-amber-400',
    },
    waiting: {
      label: t('bay_waiting'),
      icon: <XCircle className="w-5 h-5" />,
      card: 'border-zinc-600/40 bg-zinc-800/30',
      badge: 'bg-zinc-700 text-zinc-400',
      dot: 'bg-zinc-500',
    },
  };

  const counts = {
    washing: bays.filter((b) => b.status === 'washing').length,
    empty:   bays.filter((b) => b.status === 'empty').length,
    booked:  bays.filter((b) => b.status === 'booked').length,
    waiting: bays.filter((b) => b.status === 'waiting').length,
  };

  function BayCard({ bay }: { bay: RandomWashBay }) {
    const cfg = statusConfig[bay.status];
    return (
      <motion.div
        layout
        key={bay.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={cn('rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden', cfg.card)}
      >
        {bay.status === 'washing' && (
          <motion.div
            animate={{ x: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400/5 to-transparent pointer-events-none"
          />
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">#{bay.bayNumber}</span>
            <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', cfg.badge)}>
              <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot, bay.status === 'washing' && 'animate-pulse')} />
              {cfg.label}
            </span>
          </div>
          <span className={cn('opacity-60', cfg.badge.split(' ')[1])}>{cfg.icon}</span>
        </div>

        {bay.plate ? (
          <div className="space-y-1.5">
            <div className="font-mono text-sm font-bold text-white bg-zinc-800/60 rounded-lg px-3 py-1.5 inline-block">
              {bay.plate}
            </div>
            <div className="text-xs text-zinc-400">{bay.brand}</div>
            {bay.startedAt && (
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <Clock className="w-3 h-3" /> {t('bay_started')} {bay.startedAt}
              </div>
            )}
            {bay.bookedAt && (
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <Clock className="w-3 h-3" /> {t('bay_booked_at')} {bay.bookedAt}
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-zinc-600 italic">{t('no_car')}</div>
        )}

        {bay.status === 'empty' && (
          <button className="mt-4 w-full py-2 rounded-lg border border-green-500/30 text-green-400 text-xs font-medium hover:bg-green-500/10 transition-colors">
            {t('accept_vehicle')}
          </button>
        )}
        {bay.status === 'washing' && (
          <button className="mt-4 w-full py-2 rounded-lg border border-blue-500/30 text-blue-400 text-xs font-medium hover:bg-blue-500/10 transition-colors">
            {t('mark_done')}
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-lg font-bold text-white">{t('wash')}</h2>
          <p className="text-xs text-zinc-500">{bays.length} {t('wash_subtitle')}</p>
        </div>
        <button
          onClick={refresh}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
        >
          <RefreshCw className={cn('w-3.5 h-3.5 transition-transform duration-500', spinning && 'animate-spin')} />
          {t('refresh')}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {(Object.entries(counts) as [WashStatus, number][]).map(([s, n]) => {
          const cfg = statusConfig[s];
          return (
            <div key={s} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border', cfg.card, cfg.badge)}>
              <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
              {cfg.label}: <strong>{n}</strong>
            </div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {bays.map((bay) => <BayCard key={bay.id} bay={bay} />)}
        </AnimatePresence>
      </div>
    </div>
  );
}

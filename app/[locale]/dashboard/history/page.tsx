'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Phone, ClipboardList, CheckCircle2, TrendingUp } from 'lucide-react';
import { mockOrders, mockCars, mockCustomers, mockMechanics } from '@/lib/mock/data';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils/cn';
import { trService, trSpecialty } from '@/lib/utils/translations';
import { useLocale } from 'next-intl';

type Period = '7d' | '21d' | '1m';

const periodDays: Record<Period, number> = { '7d': 7, '21d': 21, '1m': 30 };

function withinDays(dateStr: string, days: number): boolean {
  const d = new Date(dateStr);
  const cutoff = new Date('2026-06-22');
  cutoff.setDate(cutoff.getDate() - days);
  return d >= cutoff;
}

export default function HistoryPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const isBoss = role === 'boss';
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState<Period>('1m');

  const rows = useMemo(() => {
    const days = periodDays[period];
    return mockOrders
      .filter((o) => o.status === 'done' && o.endDate && withinDays(o.endDate, days))
      .map((order) => ({
        order,
        car:      mockCars.find((c) => c.id === order.carId),
        customer: mockCustomers.find((c) => c.id === order.customerId),
        mechanic: mockMechanics.find((m) => m.id === order.mechanicIds[0]),
      }))
      .filter(({ car, customer, order }) => {
        const q = search.toLowerCase();
        if (!q) return true;
        return (
          car?.plate.toLowerCase().includes(q) ||
          customer?.name.toLowerCase().includes(q) ||
          customer?.phone.includes(q) ||
          order.description.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (b.order.endDate ?? '').localeCompare(a.order.endDate ?? ''));
  }, [period, search]);

  const totalRevenue = useMemo(
    () => rows.reduce((s, { order }) => s + order.totalCost, 0),
    [rows]
  );

  const periods: { key: Period; label: string }[] = [
    { key: '7d',  label: t('filter_7d') },
    { key: '21d', label: t('filter_21d') },
    { key: '1m',  label: t('filter_1m') },
  ];

  return (
    <div className="space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">{t('history')}</h2>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">{t('history_subtitle')}</p>
      </motion.div>

      {/* KPI + filters row */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        {/* KPI chips */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-green-400 font-semibold">{rows.length} {t('history_count')}</span>
          </div>
          {isBoss && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs text-amber-400 font-semibold">
                {t('history_total')}: {(totalRevenue / 1_000_000).toFixed(2)} M
              </span>
            </div>
          )}
        </div>

        {/* Period filter */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
          {periods.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={cn(
                'px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200',
                period === key
                  ? 'bg-amber-500 text-black'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_history')}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {[
                  t('col_plate'),
                  t('col_owner'),
                  t('col_phone'),
                  t('col_service'),
                  t('col_mechanic_name'),
                  t('col_end_date'),
                  ...(isBoss ? [t('col_cost')] : []),
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-zinc-500 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ order, car, customer, mechanic }, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                >
                  {/* Plate */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="font-mono font-bold text-white">{car?.plate ?? '—'}</span>
                    <div className="text-zinc-500 text-[10px]">{car?.brand} {car?.model} {car?.year}</div>
                  </td>

                  {/* Owner */}
                  <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{customer?.name ?? '—'}</td>

                  {/* Phone */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Phone className="w-3 h-3 shrink-0" />
                      {customer?.phone ?? '—'}
                    </div>
                  </td>

                  {/* Service */}
                  <td className="px-4 py-3 text-zinc-300 max-w-44 truncate">{trService(order.description, locale)}</td>

                  {/* Mechanic */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-zinc-300">{mechanic?.name.split(' ')[0] ?? '—'}</span>
                    {mechanic && (
                      <div className="text-zinc-600 text-[10px]">{trSpecialty(mechanic.specialty, locale)}</div>
                    )}
                  </td>

                  {/* Delivered date + badge */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-zinc-400">{order.endDate}</div>
                    <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded-md bg-green-500/15 text-green-400 text-[10px] font-semibold">
                      {t('delivered_badge')}
                    </span>
                  </td>

                  {/* Cost — boss only */}
                  {isBoss && (
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-mono font-bold text-amber-400">
                        {(order.totalCost / 1_000).toFixed(0)}K
                      </span>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="py-14 text-center text-zinc-600 text-sm">{t('no_history')}</div>
          )}
        </div>

        {/* Footer total — boss only */}
        {isBoss && rows.length > 0 && (
          <div className="px-4 py-3 border-t border-zinc-800 flex items-center justify-between bg-zinc-900/40">
            <span className="text-xs text-zinc-500">{rows.length} {t('history_count')}</span>
            <span className="text-sm font-bold text-amber-400">
              {t('history_total')}: {(totalRevenue / 1_000_000).toFixed(2)} M {locale === 'uz' ? "so'm" : locale === 'ar' ? 'UZS' : 'UZS'}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}

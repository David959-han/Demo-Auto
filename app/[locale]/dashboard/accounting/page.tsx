'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import {
  BookOpen, TrendingUp, Package, Zap, Calculator,
} from 'lucide-react';
import { mockAccounting } from '@/lib/mock/data';
import { cn } from '@/lib/utils/cn';

const MONTH_KEYS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'] as const;

function fmt(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

function fmtAED(n: number) {
  return new Intl.NumberFormat('en-AE').format(Math.round(n));
}

export default function AccountingPage() {
  const t = useTranslations('dashboard');
  const [vatMarket, setVatMarket] = useState<'uae' | 'ksa'>('uae');

  const vatRate = vatMarket === 'uae' ? 0.05 : 0.15;

  const monthLabel = (iso: string) => {
    const idx = parseInt(iso.split('-')[1], 10) - 1;
    return t(`acc_month_${MONTH_KEYS[idx]}` as Parameters<typeof t>[0]);
  };

  const ytdIncome  = mockAccounting.reduce((s, r) => s + r.income, 0);
  const ytdParts   = mockAccounting.reduce((s, r) => s + r.parts, 0);
  const ytdBills   = mockAccounting.reduce((s, r) => s + r.electricity + r.utilities, 0);
  const ytdProfit  = mockAccounting.reduce((s, r) => s + r.profit, 0);
  const avgMargin  = Math.round((ytdProfit / ytdIncome) * 100);

  const vatSubtotal = ytdIncome;
  const vatAmount   = Math.round(vatSubtotal * vatRate);
  const vatTotal    = vatSubtotal + vatAmount;

  const chartData = mockAccounting.map((r) => ({
    name: monthLabel(r.month),
    [t('acc_income')]:   Math.round(r.income / 1_000),
    [t('acc_expenses')]: Math.round((r.parts + r.electricity + r.utilities) / 1_000),
    [t('acc_profit')]:   Math.round(r.profit / 1_000),
  }));

  const kpis = [
    {
      label: t('acc_ytd_income'),
      value: fmt(ytdIncome),
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      label: t('acc_ytd_profit'),
      value: fmt(ytdProfit),
      sub: `${avgMargin}% ${t('acc_margin')}`,
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/20',
    },
    {
      label: t('acc_ytd_parts'),
      value: fmt(ytdParts),
      icon: <Package className="w-4 h-4" />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: t('acc_ytd_bills'),
      value: fmt(ytdBills),
      icon: <Zap className="w-4 h-4" />,
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20',
    },
  ];

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string;
  }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl text-xs space-y-1.5 min-w-[160px]">
        <p className="font-semibold text-white mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex justify-between gap-4">
            <span style={{ color: p.color }}>{p.name}</span>
            <span className="font-mono text-white">{p.value}K AED</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">{t('accounting')}</h2>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">{t('accounting_subtitle')}</p>
      </motion.div>

      {/* KPI cards */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className={cn('rounded-xl border p-4 space-y-2', k.bg)}
          >
            <div className={cn('flex items-center gap-1.5', k.color)}>
              {k.icon}
              <span className="text-[11px] font-medium">{k.label}</span>
            </div>
            <div className={cn('text-xl font-black font-mono', k.color)}>{k.value}</div>
            {k.sub && <div className="text-[10px] text-zinc-500">{k.sub}</div>}
          </motion.div>
        ))}
      </motion.div>

      {/* VAT Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
      >
        {/* VAT header + toggle */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white">{t('vat_title')}</span>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-800 border border-zinc-700/60">
            {(['uae', 'ksa'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setVatMarket(m)}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200',
                  vatMarket === m
                    ? 'bg-amber-500 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                )}
              >
                {m === 'uae' ? t('vat_uae') : t('vat_ksa')}
              </button>
            ))}
          </div>
        </div>

        {/* YTD VAT breakdown — 3 cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="rounded-xl bg-zinc-800/60 border border-zinc-700/40 p-4 text-center">
            <p className="text-[11px] text-zinc-500 mb-2">{t('vat_subtotal')}</p>
            <p className="text-2xl font-black text-white font-mono">{fmt(vatSubtotal)}</p>
            <p className="text-[10px] text-zinc-600 mt-1">AED</p>
          </div>
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-center">
            <p className="text-[11px] text-amber-400 mb-2">
              {t('vat_amount')} ({Math.round(vatRate * 100)}%)
            </p>
            <p className="text-2xl font-black text-amber-400 font-mono">+{fmt(vatAmount)}</p>
            <p className="text-[10px] text-zinc-600 mt-1">AED</p>
          </div>
          <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-center">
            <p className="text-[11px] text-green-400 mb-2">{t('vat_total')}</p>
            <p className="text-2xl font-black text-green-400 font-mono">{fmt(vatTotal)}</p>
            <p className="text-[10px] text-zinc-600 mt-1">AED</p>
          </div>
        </div>

        {/* Per-month VAT table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-700/40">
                <th className="text-start pb-2 font-medium">{t('acc_month_label')}</th>
                <th className="text-end pb-2 font-medium">{t('vat_subtotal')}</th>
                <th className="text-end pb-2 font-medium">
                  {t('vat_amount')} ({Math.round(vatRate * 100)}%)
                </th>
                <th className="text-end pb-2 font-medium">{t('vat_total')}</th>
              </tr>
            </thead>
            <tbody>
              {mockAccounting.map((r) => {
                const vat   = Math.round(r.income * vatRate);
                const total = r.income + vat;
                return (
                  <tr key={r.month} className="border-b border-zinc-800/30 hover:bg-zinc-800/20 transition-colors">
                    <td className="py-2 text-zinc-400">{monthLabel(r.month)}</td>
                    <td className="py-2 text-end font-mono text-zinc-300">{fmtAED(r.income)}</td>
                    <td className="py-2 text-end font-mono text-amber-400">+{fmtAED(vat)}</td>
                    <td className="py-2 text-end font-mono font-bold text-green-400">{fmtAED(total)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-zinc-700 font-bold">
                <td className="pt-2.5 text-white">{t('acc_total')}</td>
                <td className="pt-2.5 text-end font-mono text-white">{fmtAED(vatSubtotal)}</td>
                <td className="pt-2.5 text-end font-mono text-amber-400">+{fmtAED(vatAmount)}</td>
                <td className="pt-2.5 text-end font-mono text-green-400">{fmtAED(vatTotal)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
      >
        <p className="text-xs font-semibold text-zinc-400 mb-4">
          {t('acc_chart_title')} ({t('acc_chart_unit')})
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} barGap={4} barCategoryGap="28%">
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: '#71717a', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#a1a1aa', paddingTop: 12 }} />
            <Bar dataKey={t('acc_income')}   fill="#f59e0b" radius={[4,4,0,0]} maxBarSize={32} />
            <Bar dataKey={t('acc_expenses')} fill="#f43f5e" radius={[4,4,0,0]} maxBarSize={32} />
            <Bar dataKey={t('acc_profit')}   fill="#22c55e" radius={[4,4,0,0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Monthly table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {[
                  t('acc_month_label'),
                  t('acc_income'),
                  t('acc_parts'),
                  t('acc_electricity'),
                  t('acc_utilities'),
                  t('acc_expenses'),
                  t('acc_profit'),
                  t('acc_margin'),
                ].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-zinc-500 font-medium whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockAccounting.map((row, i) => {
                const expenses = row.parts + row.electricity + row.utilities;
                const margin   = Math.round((row.profit / row.income) * 100);
                const isLast   = i === mockAccounting.length - 1;
                return (
                  <motion.tr
                    key={row.month}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.30 + i * 0.05 }}
                    className={cn(
                      'border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors',
                      isLast && 'bg-amber-500/5'
                    )}
                  >
                    <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">
                      {monthLabel(row.month)}
                      {isLast && (
                        <span className="ms-1.5 text-[10px] text-amber-400 font-normal">
                          ● {t('acc_current')}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-amber-400 font-bold whitespace-nowrap">
                      {fmt(row.income)}
                    </td>
                    <td className="px-4 py-3 font-mono text-blue-400 whitespace-nowrap">
                      {fmt(row.parts)}
                    </td>
                    <td className="px-4 py-3 font-mono text-rose-400 whitespace-nowrap">
                      {fmt(row.electricity)}
                    </td>
                    <td className="px-4 py-3 font-mono text-rose-400 whitespace-nowrap">
                      {fmt(row.utilities)}
                    </td>
                    <td className="px-4 py-3 font-mono text-zinc-400 whitespace-nowrap">
                      {fmt(expenses)}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-green-400 whitespace-nowrap">
                      {fmt(row.profit)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-green-400"
                            style={{ width: `${margin}%` }}
                          />
                        </div>
                        <span className="text-green-400 font-mono">{margin}%</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t border-zinc-700 bg-zinc-800/40">
                <td className="px-4 py-3 font-bold text-white text-xs">{t('acc_total')}</td>
                <td className="px-4 py-3 font-mono font-black text-amber-400 text-xs">{fmt(ytdIncome)}</td>
                <td className="px-4 py-3 font-mono font-bold text-blue-400 text-xs">{fmt(ytdParts)}</td>
                <td className="px-4 py-3 font-mono font-bold text-rose-400 text-xs">
                  {fmt(mockAccounting.reduce((s, r) => s + r.electricity, 0))}
                </td>
                <td className="px-4 py-3 font-mono font-bold text-rose-400 text-xs">
                  {fmt(mockAccounting.reduce((s, r) => s + r.utilities, 0))}
                </td>
                <td className="px-4 py-3 font-mono font-bold text-zinc-400 text-xs">
                  {fmt(ytdParts + ytdBills)}
                </td>
                <td className="px-4 py-3 font-mono font-black text-green-400 text-xs">{fmt(ytdProfit)}</td>
                <td className="px-4 py-3 font-mono font-black text-green-400 text-xs">{avgMargin}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42 }}
        className="flex flex-wrap items-center gap-4 text-[11px] text-zinc-500"
      >
        {[
          { color: 'bg-amber-400', label: t('acc_income') },
          { color: 'bg-rose-400',  label: `${t('acc_parts')} + ${t('acc_electricity')} + ${t('acc_utilities')}` },
          { color: 'bg-green-400', label: t('acc_profit') },
          { color: 'bg-blue-400',  label: t('acc_parts') },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={cn('w-2 h-2 rounded-full', color)} />
            {label}
          </div>
        ))}
      </motion.div>

    </div>
  );
}

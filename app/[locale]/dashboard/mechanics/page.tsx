'use client';

import { useTranslations } from 'next-intl';
import { mockMechanics } from '@/lib/mock/data';
import { UserCog, TrendingUp, Award, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const KPI_THRESHOLDS = { excellent: 90, good: 75 };

function kpiColor(kpi: number) {
  if (kpi >= KPI_THRESHOLDS.excellent) return { bar: 'bg-emerald-500', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
  if (kpi >= KPI_THRESHOLDS.good)      return { bar: 'bg-amber-500',   text: 'text-amber-400',   badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'   };
  return                                      { bar: 'bg-red-500',     text: 'text-red-400',     badge: 'bg-red-500/10 text-red-400 border-red-500/20'         };
}

function kpiLabel(kpi: number) {
  if (kpi >= KPI_THRESHOLDS.excellent) return '★ Excellent';
  if (kpi >= KPI_THRESHOLDS.good)      return '▲ Good';
  return                                      '▼ Needs work';
}

export default function MechanicsPage() {
  const t = useTranslations('dashboard');

  const totalOrders   = mockMechanics.reduce((s, m) => s + m.completedOrders, 0);
  const totalRevenue  = mockMechanics.reduce((s, m) => s + m.monthlyRevenue,  0);
  const avgKpi        = Math.round(mockMechanics.reduce((s, m) => s + m.kpi, 0) / mockMechanics.length);
  const topMechanic   = [...mockMechanics].sort((a, b) => b.kpi - a.kpi)[0];

  return (
    <div className="p-4 sm:p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">{t('mechanics')}</h1>
          <p className="text-sm text-zinc-500 mt-0.5">{t('mechanics_subtitle')}</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <UserCog className="w-5 h-5 text-amber-400" />
        </div>
      </div>

      {/* Summary KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
          <p className="text-xs text-zinc-500 mb-1">{t('active_mechanics')}</p>
          <p className="text-2xl font-black text-white">{mockMechanics.length}</p>
          <p className="text-xs text-zinc-600 mt-0.5">{t('mechanics_subtitle')}</p>
        </div>
        <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
          <p className="text-xs text-zinc-500 mb-1">{t('col_completed')}</p>
          <p className="text-2xl font-black text-white">{totalOrders.toLocaleString()}</p>
          <p className="text-xs text-zinc-600 mt-0.5">{t('mech_orders')}</p>
        </div>
        <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
          <p className="text-xs text-zinc-500 mb-1">Avg KPI</p>
          <p className={cn('text-2xl font-black', kpiColor(avgKpi).text)}>{avgKpi}%</p>
          <p className="text-xs text-zinc-600 mt-0.5">{kpiLabel(avgKpi)}</p>
        </div>
        <div className="rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-4">
          <p className="text-xs text-zinc-500 mb-1">{t('col_rev')}</p>
          <p className="text-2xl font-black text-white">
            {totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-zinc-600 mt-0.5">AED / month</p>
        </div>
      </div>

      {/* Mechanic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockMechanics.map((mechanic, idx) => {
          const colors = kpiColor(mechanic.kpi);
          const isTop  = mechanic.id === topMechanic.id;

          return (
            <div
              key={mechanic.id}
              className={cn(
                'relative rounded-2xl bg-zinc-800/50 border p-5 flex flex-col gap-4 transition-all hover:border-zinc-600',
                isTop ? 'border-amber-500/40 bg-amber-500/5' : 'border-zinc-700/50'
              )}
            >
              {isTop && (
                <span className="absolute top-3 end-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold">
                  <Award className="w-3 h-3" /> Top
                </span>
              )}

              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-700/60 border border-zinc-600/50 text-lg font-black text-white">
                  {mechanic.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{mechanic.name}</p>
                  <span className={cn(
                    'inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border mt-0.5',
                    colors.badge
                  )}>
                    <Wrench className="w-2.5 h-2.5" />
                    {mechanic.specialty}
                  </span>
                </div>
              </div>

              {/* KPI bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-zinc-500">{t('col_kpi')}</span>
                  <span className={cn('text-sm font-black', colors.text)}>{mechanic.kpi}%</span>
                </div>
                <div className="h-2 rounded-full bg-zinc-700/60">
                  <div
                    className={cn('h-2 rounded-full transition-all', colors.bar)}
                    style={{ width: `${mechanic.kpi}%` }}
                  />
                </div>
                <p className={cn('text-[10px] mt-1', colors.text)}>{kpiLabel(mechanic.kpi)}</p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-zinc-700/40">
                <div>
                  <p className="text-[10px] text-zinc-500">{t('col_completed')}</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {mechanic.completedOrders}
                    <span className="text-[10px] text-zinc-500 ms-1">{t('mech_orders')}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500">{t('col_rev')}</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {mechanic.monthlyRevenue.toLocaleString()}
                    <span className="text-[10px] text-zinc-500 ms-1">AED</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance table */}
      <div className="rounded-2xl bg-zinc-800/40 border border-zinc-700/50 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-zinc-700/50 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-white">{t('perf_title')}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 uppercase tracking-wider border-b border-zinc-700/30">
                <th className="text-start px-5 py-3">#</th>
                <th className="text-start px-5 py-3">{t('col_mechanic_h')}</th>
                <th className="text-start px-5 py-3">{t('col_specialty')}</th>
                <th className="text-start px-5 py-3">{t('col_kpi')}</th>
                <th className="text-start px-5 py-3">{t('col_completed')}</th>
                <th className="text-start px-5 py-3">{t('col_rev')}</th>
              </tr>
            </thead>
            <tbody>
              {[...mockMechanics].sort((a, b) => b.kpi - a.kpi).map((m, idx) => {
                const c = kpiColor(m.kpi);
                return (
                  <tr key={m.id} className="border-b border-zinc-700/20 hover:bg-zinc-700/20 transition-colors">
                    <td className="px-5 py-3.5 text-zinc-600 font-mono text-xs">{idx + 1}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-zinc-700 flex items-center justify-center text-xs font-black text-white">
                          {m.name[0]}
                        </div>
                        <span className="text-white font-medium">{m.name}</span>
                        {m.id === topMechanic.id && (
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-400">{m.specialty}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-zinc-700">
                          <div className={cn('h-1.5 rounded-full', c.bar)} style={{ width: `${m.kpi}%` }} />
                        </div>
                        <span className={cn('text-xs font-bold', c.text)}>{m.kpi}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-300">{m.completedOrders}</td>
                    <td className="px-5 py-3.5 text-zinc-300">
                      {m.monthlyRevenue.toLocaleString()} <span className="text-zinc-600 text-xs">AED</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

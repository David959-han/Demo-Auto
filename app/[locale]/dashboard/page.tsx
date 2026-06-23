'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { TrendingUp, Users, ClipboardList, Wrench, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { AnimatedCounter } from '@/components/effects/AnimatedCounter';
import { useAuthStore } from '@/lib/stores/authStore';
import { mockStats, mockOrders, mockCustomers, mockCars, mockMechanics, mockRevenueChart } from '@/lib/mock/data';
import { cn } from '@/lib/utils/cn';
import type { OrderStatus } from '@/types';

function fmt(n: number) {
  return (n / 1_000_000).toFixed(1) + 'M';
}

export default function OverviewPage() {
  const t = useTranslations('dashboard');
  const { name } = useAuthStore();

  const statusConfig: Record<OrderStatus, { label: string; cls: string }> = {
    active:    { label: t('status_in_progress'), cls: 'bg-blue-500/20 text-blue-400' },
    pending:   { label: t('status_pending'),     cls: 'bg-amber-500/20 text-amber-400' },
    done:      { label: t('status_done'),        cls: 'bg-green-500/20 text-green-400' },
    cancelled: { label: t('status_cancelled'),   cls: 'bg-red-500/20 text-red-400' },
  };

  const kpiCards = [
    { label: t('kpi_today'),     value: mockStats.todayOrders,                          growth: mockStats.ordersGrowth, icon: <ClipboardList className="w-5 h-5" />, iconBg: 'bg-blue-500/10 text-blue-400',   suffix: '' },
    { label: t('kpi_customers'), value: mockStats.totalCustomers,                       growth: 8,                      icon: <Users className="w-5 h-5" />,        iconBg: 'bg-purple-500/10 text-purple-400', suffix: '' },
    { label: t('kpi_revenue'),   value: Math.round(mockStats.monthlyRevenue / 1_000_000), growth: mockStats.revenueGrowth, icon: <TrendingUp className="w-5 h-5" />,   iconBg: 'bg-amber-500/10 text-amber-400',  suffix: ' mln' },
    { label: t('kpi_mechanics'), value: mockStats.activeMechanics,                      growth: 0,                      icon: <Wrench className="w-5 h-5" />,       iconBg: 'bg-green-500/10 text-green-400',  suffix: '' },
  ];

  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-bold text-white">
          {t('welcome')}, <span className="text-amber-400">{name?.split(' ')[0]}</span> 👋
        </h2>
        <p className="text-xs text-zinc-500 mt-0.5">{t('systems_active')}</p>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-lg transition-all duration-300 hover:border-zinc-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn('flex items-center justify-center w-9 h-9 rounded-xl', card.iconBg)}>
                {card.icon}
              </div>
              {card.growth !== 0 && (
                <span className="flex items-center gap-0.5 text-[11px] text-green-400 font-medium">
                  <ArrowUpRight className="w-3 h-3" />{card.growth}%
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-white">
              <AnimatedCounter to={card.value} />{card.suffix}
            </div>
            <div className="text-xs text-zinc-500 mt-1">{card.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart + Mechanic KPI */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="lg:col-span-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">{t('revenue_chart')}</h3>
              <p className="text-xs text-zinc-500">{t('year_label')}</p>
            </div>
            <span className="text-xs font-bold text-green-400 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> {t('revenue_growth')}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockRevenueChart} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#fff' }}
                formatter={(v) => [fmt(Number(v)), t('revenue_chart')]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} fill="url(#revenueGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
        >
          <h3 className="text-sm font-bold text-white mb-4">{t('kpi_title')}</h3>
          <div className="space-y-3">
            {mockMechanics.map((m) => (
              <div key={m.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-300 truncate">{m.name.split(' ')[0]}</span>
                  <span className={cn('text-xs font-bold', m.kpi >= 90 ? 'text-green-400' : m.kpi >= 75 ? 'text-amber-400' : 'text-zinc-400')}>
                    {m.kpi}%
                  </span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.kpi}%` }}
                    transition={{ delay: 0.5 + m.id * 0.07, duration: 0.6 }}
                    className={cn('h-full rounded-full', m.kpi >= 90 ? 'bg-green-400' : m.kpi >= 75 ? 'bg-amber-400' : 'bg-zinc-500')}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-zinc-800">
          <h3 className="text-sm font-bold text-white">{t('recent_orders_title')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {[t('col_order'), t('col_vehicle'), t('col_customer'), t('col_description'), t('col_amount'), t('col_status')].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-zinc-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const car = mockCars.find((c) => c.id === order.carId);
                const customer = mockCustomers.find((c) => c.id === order.customerId);
                const st = statusConfig[order.status];
                return (
                  <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-zinc-400">{order.orderNumber}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-white">{car?.plate}</div>
                      <div className="text-zinc-500">{car?.brand} {car?.model}</div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{customer?.name}</td>
                    <td className="px-4 py-3 text-zinc-400 max-w-40 truncate">{order.description}</td>
                    <td className="px-4 py-3 font-mono text-amber-400">
                      {order.totalCost > 0 ? `${(order.totalCost / 1000).toFixed(0)}K` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('px-2 py-0.5 rounded-md font-medium', st.cls)}>{st.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

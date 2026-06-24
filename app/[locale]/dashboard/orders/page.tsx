'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, RefreshCw } from 'lucide-react';
import { generateRandomOrders, type RandomOrder } from '@/lib/utils/randomDemo';
import { cn } from '@/lib/utils/cn';
import { trService } from '@/lib/utils/translations';
import { useLocale } from 'next-intl';
import type { OrderStatus } from '@/types';

export default function OrdersPage() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const [orders, setOrders] = useState<RandomOrder[]>(() => generateRandomOrders(12));
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [spinning, setSpinning] = useState(false);

  const refresh = useCallback(() => {
    setSpinning(true);
    setTimeout(() => {
      setOrders(generateRandomOrders(12));
      setSpinning(false);
    }, 400);
  }, []);

  const statusConfig: Record<OrderStatus, { label: string; cls: string }> = {
    active:    { label: t('status_in_progress'), cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    pending:   { label: t('status_pending'),     cls: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    done:      { label: t('status_done'),        cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
    cancelled: { label: t('status_cancelled'),   cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
  };

  const filterOptions: { key: OrderStatus | 'all'; label: string }[] = [
    { key: 'all',       label: t('status_all') },
    { key: 'active',    label: t('status_in_progress') },
    { key: 'pending',   label: t('status_pending') },
    { key: 'done',      label: t('status_done') },
    { key: 'cancelled', label: t('status_cancelled') },
  ];

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.plate.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-lg font-bold text-white">{t('orders')}</h2>
          <p className="text-xs text-zinc-500">{orders.length} {t('col_orders_count')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
          >
            <RefreshCw className={cn('w-3.5 h-3.5 transition-transform duration-500', spinning && 'animate-spin')} />
            {t('refresh')}
          </button>
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors">
            <Plus className="w-3.5 h-3.5" /> {t('new_order')}
          </button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_orders')}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          {filterOptions.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                filter === f.key
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-zinc-800/60 text-zinc-400 border-zinc-700 hover:border-zinc-600'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {[t('col_order'), t('col_vehicle'), t('col_customer'), t('col_mechanic_h'),
                  t('col_description'), t('col_amount'), t('col_date'), t('col_status')].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-zinc-500 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((order, i) => {
                  const st = statusConfig[order.status];
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 font-mono text-zinc-400 whitespace-nowrap">{order.orderNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-white font-mono">{order.plate}</div>
                        <div className="text-zinc-500">{order.brand} {order.model}</div>
                      </td>
                      <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{order.customerName}</td>
                      <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">{order.mechanicName}</td>
                      <td className="px-4 py-3 text-zinc-400 max-w-44 truncate">{trService(order.description, locale)}</td>
                      <td className="px-4 py-3 font-mono text-amber-400 whitespace-nowrap">
                        {order.totalCost > 0 ? `${(order.totalCost / 1000).toFixed(0)}K` : '—'}
                      </td>
                      <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{order.startDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={cn('px-2 py-0.5 rounded-md font-medium border', st.cls)}>{st.label}</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-zinc-600 text-sm">{t('no_orders')}</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

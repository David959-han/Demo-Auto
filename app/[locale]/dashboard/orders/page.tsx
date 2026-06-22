'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import { mockOrders, mockCustomers, mockCars, mockMechanics } from '@/lib/mock/data';
import { cn } from '@/lib/utils/cn';
import type { OrderStatus } from '@/types';

const statusConfig: Record<OrderStatus, { label: string; cls: string }> = {
  active:    { label: 'Jarayonda', cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  pending:   { label: 'Kutilmoqda', cls: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  done:      { label: 'Bajarildi', cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
  cancelled: { label: 'Bekor', cls: 'bg-red-500/20 text-red-400 border-red-500/30' },
};

const filters: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all',       label: 'Barchasi' },
  { key: 'active',    label: 'Jarayonda' },
  { key: 'pending',   label: 'Kutilmoqda' },
  { key: 'done',      label: 'Bajarildi' },
  { key: 'cancelled', label: 'Bekor' },
];

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const filtered = mockOrders.filter((o) => {
    const car = mockCars.find((c) => c.id === o.carId);
    const customer = mockCustomers.find((c) => c.id === o.customerId);
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      car?.plate.toLowerCase().includes(search.toLowerCase()) ||
      customer?.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-lg font-bold text-white">Ish Buyurtmalar</h2>
          <p className="text-xs text-zinc-500">{mockOrders.length} ta buyurtma</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors">
          <Plus className="w-3.5 h-3.5" /> Yangi buyurtma
        </button>
      </motion.div>

      {/* Filters + Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Raqam, avto yoki mijoz..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
          {filters.map((f) => (
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

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {['Buyurtma', 'Avtomobil', 'Mijoz', 'Usta', 'Tavsif', 'Summa', 'Sana', 'Holat'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-zinc-500 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => {
                const car = mockCars.find((c) => c.id === order.carId);
                const customer = mockCustomers.find((c) => c.id === order.customerId);
                const mechanic = mockMechanics.find((m) => m.id === order.mechanicIds[0]);
                const st = statusConfig[order.status];
                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono text-zinc-400 whitespace-nowrap">{order.orderNumber}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-white">{car?.plate}</div>
                      <div className="text-zinc-500">{car?.brand} {car?.model}</div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">{customer?.name}</td>
                    <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">{mechanic?.name.split(' ')[0]}</td>
                    <td className="px-4 py-3 text-zinc-400 max-w-[180px] truncate">{order.description}</td>
                    <td className="px-4 py-3 font-mono text-amber-400 whitespace-nowrap">
                      {order.totalCost > 0 ? `${(order.totalCost / 1000).toFixed(0)}K so'm` : '—'}
                    </td>
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{order.startDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={cn('px-2 py-0.5 rounded-md font-medium border', st.cls)}>
                        {st.label}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-zinc-600 text-sm">
              Buyurtma topilmadi
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

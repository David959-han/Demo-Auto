'use client';

import { motion } from 'framer-motion';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts';
import { TrendingUp, Award, Package } from 'lucide-react';
import { mockRevenueChart, mockMechanics, mockParts } from '@/lib/mock/data';
import { cn } from '@/lib/utils/cn';

function fmt(n: number) {
  return (n / 1_000_000).toFixed(1) + 'M';
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-bold text-white">Hisobotlar</h2>
        <p className="text-xs text-zinc-500">2026-yil, yanvar – iyun</p>
      </motion.div>

      {/* Revenue area chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Oylik daromad va buyurtmalar</h3>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={mockRevenueChart} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ord" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#60a5fa" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="rev" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
            <YAxis yAxisId="ord" orientation="right" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8, fontSize: 12 }}
              formatter={(v, name) => [
                name === 'revenue' ? fmt(Number(v)) : v,
                name === 'revenue' ? 'Daromad' : 'Buyurtmalar',
              ]}
            />
            <Legend formatter={(v) => v === 'revenue' ? 'Daromad' : 'Buyurtmalar'} wrapperStyle={{ fontSize: 11 }} />
            <Area yAxisId="rev" type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} fill="url(#rev)" dot={false} />
            <Area yAxisId="ord" type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} fill="url(#ord)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Mechanic bar chart + low stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Mechanic performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Usta samaradorligi</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={mockMechanics.map((m) => ({ name: m.name.split(' ')[0], kpi: m.kpi, orders: m.completedOrders }))}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8, fontSize: 12 }}
                formatter={(v, name) => [v, name === 'kpi' ? 'KPI %' : 'Buyurtmalar']}
              />
              <Bar dataKey="kpi" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={28} name="kpi" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Low stock parts */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-bold text-white">Kam qolgan zapchastlar</h3>
          </div>
          <div className="space-y-3">
            {mockParts
              .filter((p) => p.quantity <= p.minThreshold)
              .map((part, i) => (
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-red-500/5 border border-red-500/20"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{part.name}</div>
                    <div className="text-xs text-zinc-500 font-mono">{part.barcode}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-bold text-lg">{part.quantity}</div>
                    <div className="text-xs text-zinc-600">min: {part.minThreshold}</div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Summary footer */}
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span>Jami {mockParts.length} ta pozitsiya</span>
            <span className="text-red-400 font-medium">
              {mockParts.filter((p) => p.quantity <= p.minThreshold).length} ta kam
            </span>
          </div>
        </motion.div>
      </div>

      {/* Parts full table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Zapchast ombori</h3>
          <span className="text-xs text-zinc-500">{mockParts.length} ta mahsulot</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {['Nomi', 'Kategoriya', 'Narxi', 'Miqdori', 'Ombor holati', 'Yetkazuvchi'].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-zinc-500 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockParts.map((part, i) => {
                const low = part.quantity <= part.minThreshold;
                return (
                  <motion.tr
                    key={part.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.03 }}
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-4 py-2.5 text-white font-medium">{part.name}</td>
                    <td className="px-4 py-2.5 text-zinc-500">{part.category}</td>
                    <td className="px-4 py-2.5 font-mono text-amber-400">{(part.price / 1000).toFixed(0)}K</td>
                    <td className={cn('px-4 py-2.5 font-mono font-bold', low ? 'text-red-400' : 'text-green-400')}>
                      {part.quantity} {low && '⚠'}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full', low ? 'bg-red-400' : 'bg-green-400')}
                            style={{ width: `${Math.min(100, (part.quantity / (part.minThreshold * 3)) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-500">{part.supplier}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

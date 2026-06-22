'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Plus, AlertTriangle } from 'lucide-react';
import { mockParts } from '@/lib/mock/data';
import { cn } from '@/lib/utils/cn';

export default function InventoryPage() {
  const [search, setSearch] = useState('');

  const filtered = mockParts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = mockParts.filter((p) => p.quantity <= p.minThreshold).length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-lg font-bold text-white">Zapchast Ombori</h2>
          <p className="text-xs text-zinc-500">{mockParts.length} ta pozitsiya</p>
        </div>
        <div className="flex items-center gap-2">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> {lowStockCount} ta kam
            </div>
          )}
          <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors">
            <Plus className="w-3.5 h-3.5" /> Qo'shish
          </button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nomi, barkod yoki kategoriya..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((part, i) => {
          const low = part.quantity <= part.minThreshold;
          const pct = Math.min(100, (part.quantity / (part.minThreshold * 3)) * 100);
          return (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'rounded-xl border p-4 transition-all duration-200 hover:border-zinc-600',
                low ? 'border-red-500/30 bg-red-500/5' : 'border-zinc-800 bg-zinc-900/60'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-xl',
                  low ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800 text-zinc-400'
                )}>
                  <Package className="w-4 h-4" />
                </div>
                {low && (
                  <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-2.5 h-2.5" /> Kam
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold text-white mb-0.5">{part.name}</h4>
              <div className="text-xs text-zinc-500 mb-3">{part.category} · {part.supplier}</div>

              <div className="flex items-end justify-between mb-2">
                <span className="text-xs text-zinc-500">Miqdor</span>
                <span className={cn('text-lg font-black', low ? 'text-red-400' : 'text-white')}>
                  {part.quantity}
                </span>
              </div>

              {/* Stock bar */}
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
                <div
                  className={cn('h-full rounded-full transition-all', low ? 'bg-red-400' : 'bg-green-400')}
                  style={{ width: `${pct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-600 font-mono">{part.barcode.slice(-6)}</span>
                <span className="text-amber-400 font-mono font-bold">{(part.price / 1000).toFixed(0)}K so'm</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

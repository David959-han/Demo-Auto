'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Plus, AlertTriangle, CheckCircle2, PackagePlus } from 'lucide-react';
import { mockParts } from '@/lib/mock/data';
import { useAuthStore } from '@/lib/stores/authStore';
import { cn } from '@/lib/utils/cn';

export default function InventoryPage() {
  const t = useTranslations('dashboard');
  const { role } = useAuthStore();
  const isBoss = role === 'boss';

  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>(() =>
    Object.fromEntries(mockParts.map((p) => [p.id, p.quantity]))
  );
  const [openId, setOpenId] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState('');
  const [justReceived, setJustReceived] = useState<number | null>(null);

  const filtered = mockParts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = mockParts.filter((p) => (quantities[p.id] ?? p.quantity) <= p.minThreshold).length;

  const handleReceive = (id: number) => {
    const n = parseInt(inputVal, 10);
    if (!n || n <= 0) return;
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + n }));
    setJustReceived(id);
    setOpenId(null);
    setInputVal('');
    setTimeout(() => setJustReceived(null), 2000);
  };

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-lg font-bold text-white">{t('inventory')}</h2>
          <p className="text-xs text-zinc-500">{mockParts.length} {t('total_positions')}</p>
        </div>
        <div className="flex items-center gap-2">
          {lowStockCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> {lowStockCount} {t('low_count')}
            </div>
          )}
          {isBoss && (
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors">
              <Plus className="w-3.5 h-3.5" /> {t('add_part')}
            </button>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_parts')}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((part, i) => {
          const qty  = quantities[part.id] ?? part.quantity;
          const low  = qty <= part.minThreshold;
          const pct  = Math.min(100, (qty / (part.minThreshold * 3)) * 100);
          const isOpen = openId === part.id;
          const isFlash = justReceived === part.id;

          return (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={cn(
                'rounded-xl border p-4 transition-all duration-300',
                isFlash  ? 'border-green-500/40 bg-green-500/5' :
                low      ? 'border-red-500/30 bg-red-500/5' :
                           'border-zinc-800 bg-zinc-900/60 hover:border-zinc-600'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-xl transition-colors',
                  isFlash ? 'bg-green-500/10 text-green-400' :
                  low     ? 'bg-red-500/10 text-red-400' :
                            'bg-zinc-800 text-zinc-400'
                )}>
                  {isFlash ? <CheckCircle2 className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                </div>
                {low && !isFlash && (
                  <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                    <AlertTriangle className="w-2.5 h-2.5" /> {t('low_label')}
                  </span>
                )}
                {isFlash && (
                  <span className="text-[10px] text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    +{inputVal || ''}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold text-white mb-0.5">{part.name}</h4>
              <div className="text-xs text-zinc-500 mb-3">{part.category} · {part.supplier}</div>

              <div className="flex items-end justify-between mb-2">
                <span className="text-xs text-zinc-500">{t('col_qty')}</span>
                <motion.span
                  key={qty}
                  initial={{ scale: 1.3, color: '#22c55e' }}
                  animate={{ scale: 1, color: low ? '#f87171' : '#ffffff' }}
                  transition={{ duration: 0.4 }}
                  className="text-lg font-black"
                >
                  {qty}
                </motion.span>
              </div>

              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
                <motion.div
                  className={cn('h-full rounded-full', low ? 'bg-red-400' : 'bg-green-400')}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-zinc-600 font-mono">{part.barcode.slice(-6)}</span>
                <span className="text-amber-400 font-mono font-bold">{(part.price / 1000).toFixed(0)}K</span>
              </div>

              {/* "Olib kelindi" — boss only */}
              {isBoss && (
                <AnimatePresence mode="wait">
                  {!isOpen ? (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onClick={() => { setOpenId(part.id); setInputVal(''); }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:border-amber-500/50 hover:text-amber-400 text-xs font-medium transition-all"
                    >
                      <PackagePlus className="w-3.5 h-3.5" />
                      {t('received')}
                    </motion.button>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                      className="flex gap-1.5"
                    >
                      <input
                        autoFocus
                        type="number"
                        min={1}
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleReceive(part.id)}
                        placeholder={t('receive_placeholder')}
                        className="flex-1 min-w-0 px-2 py-1.5 rounded-lg bg-zinc-800 border border-amber-500/40 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => handleReceive(part.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
                      >
                        {t('receive_confirm')}
                      </button>
                      <button
                        onClick={() => setOpenId(null)}
                        className="px-2 py-1.5 rounded-lg border border-zinc-700 text-zinc-500 hover:text-white text-xs transition-colors"
                      >
                        ✕
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

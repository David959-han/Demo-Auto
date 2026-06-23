'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Search, Phone, Car, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { mockCustomers, mockCars, mockOrders } from '@/lib/mock/data';
import { cn } from '@/lib/utils/cn';

export default function CustomersPage() {
  const t = useTranslations('dashboard');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h2 className="text-lg font-bold text-white">{t('customers')}</h2>
          <p className="text-xs text-zinc-500">{mockCustomers.length} {t('col_customer')}</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors">
          <Plus className="w-3.5 h-3.5" /> {t('new_customer')}
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search_orders')}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
      </motion.div>

      <div className="space-y-2">
        {filtered.map((customer, i) => {
          const cars = mockCars.filter((c) => customer.cars.includes(c.id));
          const orders = mockOrders.filter((o) => o.customerId === customer.id);
          const totalSpent = orders.reduce((sum, o) => sum + o.totalCost, 0);
          const isOpen = expanded === customer.id;

          return (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : customer.id)}
                className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-zinc-800/30 transition-colors text-left"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 text-sm font-black shrink-0">
                  {customer.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-white truncate">{customer.name}</div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                    <Phone className="w-3 h-3" /> {customer.phone}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-xs text-right">
                  <div>
                    <div className="text-zinc-400 font-medium">{cars.length}</div>
                    <div className="text-zinc-600">{t('col_vehicles')}</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 font-medium">{orders.length}</div>
                    <div className="text-zinc-600">{t('col_orders_count')}</div>
                  </div>
                  <div>
                    <div className="text-amber-400 font-mono font-bold">
                      {totalSpent > 0 ? `${(totalSpent / 1000).toFixed(0)}K` : '—'}
                    </div>
                    <div className="text-zinc-600">{t('col_total')}</div>
                  </div>
                </div>
                <span className="text-zinc-600 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-zinc-800 px-4 py-4"
                >
                  <div className="text-xs text-zinc-500 font-medium mb-3 flex items-center gap-1">
                    <Car className="w-3 h-3" /> {t('vehicles_label')}
                  </div>
                  <div className="space-y-2">
                    {cars.map((car) => (
                      <div key={car.id} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/40">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-white">{car.plate}</span>
                          <span className="text-xs text-zinc-400">{car.brand} {car.model} {car.year}</span>
                        </div>
                        <span className="text-xs text-zinc-600">{car.color}</span>
                      </div>
                    ))}
                  </div>

                  {orders.length > 0 && (
                    <div className="mt-4">
                      <div className="text-xs text-zinc-500 font-medium mb-2">{t('recent_orders_label')}</div>
                      <div className="space-y-1.5">
                        {orders.slice(0, 3).map((o) => (
                          <div key={o.id} className="flex items-center justify-between text-xs text-zinc-400">
                            <span className="font-mono text-zinc-600">{o.orderNumber}</span>
                            <span className="truncate mx-3 max-w-40">{o.description}</span>
                            <span className="text-amber-400 font-mono shrink-0">
                              {o.totalCost > 0 ? `${(o.totalCost / 1000).toFixed(0)}K` : '—'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

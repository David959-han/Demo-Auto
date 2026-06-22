'use client';

import { motion } from 'framer-motion';
import { Bell, Phone, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockReminders, mockCars } from '@/lib/mock/data';
import { cn } from '@/lib/utils/cn';
import type { Reminder } from '@/types';

const typeLabels: Record<Reminder['type'], string> = {
  oil:     'Moy almashtirish',
  tire:    'Shina almashtirish',
  brake:   'Tormoz tekshiruvi',
  service: 'Texnik xizmat',
};

const typeIcons: Record<Reminder['type'], string> = {
  oil: '🛢', tire: '⚙️', brake: '🔴', service: '🔧',
};

const smsConfig: Record<Reminder['smsStatus'], { label: string; cls: string; icon: React.ReactNode }> = {
  scheduled: { label: 'Rejalashtirilgan', cls: 'bg-amber-500/20 text-amber-400', icon: <Clock className="w-3 h-3" /> },
  sent:      { label: 'Yuborildi',        cls: 'bg-green-500/20 text-green-400',  icon: <CheckCircle className="w-3 h-3" /> },
  failed:    { label: 'Yuborilmadi',      cls: 'bg-red-500/20 text-red-400',      icon: <XCircle className="w-3 h-3" /> },
};

export default function RemindersPage() {
  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-bold text-white">Eslatmalar</h2>
        <p className="text-xs text-zinc-500">{mockReminders.length} ta faol eslatma</p>
      </motion.div>

      <div className="space-y-3">
        {mockReminders.map((r, i) => {
          const sms = smsConfig[r.smsStatus];
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 transition-colors"
            >
              {/* Type icon */}
              <div className="text-2xl shrink-0">{typeIcons[r.type]}</div>

              {/* Main info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-white">{r.carPlate}</span>
                  <span className="text-xs text-zinc-500">{typeLabels[r.type]}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>{r.ownerName}</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" />{r.ownerPhone}
                  </span>
                </div>
              </div>

              {/* Next service */}
              <div className="hidden sm:block text-right shrink-0">
                <div className="text-xs text-zinc-400">{r.nextDate}</div>
                <div className="text-xs text-amber-400 font-mono">{r.nextKm.toLocaleString()} km</div>
              </div>

              {/* SMS status */}
              <div className={cn('flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium shrink-0', sms.cls)}>
                {sms.icon}{sms.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

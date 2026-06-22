'use client';

import { useTranslations } from 'next-intl';
import { Users, ClipboardList, BarChart3 } from 'lucide-react';
import { TiltCard } from '@/components/effects/TiltCard';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import {
  CarIcon, BarcodeIcon, CarWashIcon,
  SpeedometerIcon, WrenchGearIcon,
} from '@/components/icons';

export function BentoGrid() {
  const t = useTranslations('features');

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t('customers_title'),
      desc: t('customers_desc'),
      accent: 'from-blue-500/10 to-transparent',
      border: 'border-blue-500/20 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10 text-blue-400',
      preview: (
        <div className="mt-4 space-y-1.5">
          {['Jasur T. — Cobalt', 'Sardor A. — Nexia', 'Dilnoza K. — Malibu'].map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center text-[9px] text-zinc-300 font-bold">
                {c[0]}
              </div>
              <span className="text-zinc-400">{c}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <WrenchGearIcon size={24} />,
      title: t('orders_title'),
      desc: t('orders_desc'),
      accent: 'from-amber-500/10 to-transparent',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400',
      preview: (
        <div className="mt-4 space-y-2">
          <div className="text-xs text-zinc-500 mb-1">Usta KPI</div>
          {[{ name: 'Sardor', kpi: 88 }, { name: 'Javlon', kpi: 72 }, { name: 'Bobur', kpi: 61 }].map((m) => (
            <div key={m.name} className="flex items-center gap-2">
              <span className="text-[11px] text-zinc-400 w-12">{m.name}</span>
              <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full"
                  style={{ width: `${m.kpi}%` }}
                />
              </div>
              <span className="text-[11px] text-amber-400">{m.kpi}%</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <BarcodeIcon size={24} />,
      title: t('inventory_title'),
      desc: t('inventory_desc'),
      accent: 'from-purple-500/10 to-transparent',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400',
      preview: (
        <div className="mt-4 space-y-1.5">
          {[
            { name: 'Tormoz kolodka', qty: 12, ok: true },
            { name: 'Motor moyi 5W-30', qty: 3, ok: false },
            { name: 'Spark plug', qty: 25, ok: true },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 truncate">{p.name}</span>
              <span className={`font-mono font-bold ${p.ok ? 'text-green-400' : 'text-red-400'}`}>
                {p.qty} {!p.ok && '⚠'}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('reports_title'),
      desc: t('reports_desc'),
      accent: 'from-green-500/10 to-transparent',
      border: 'border-green-500/20 hover:border-green-500/40',
      iconBg: 'bg-green-500/10 text-green-400',
      preview: (
        <div className="mt-4">
          <div className="text-xs text-zinc-500 mb-2">Oylik daromad</div>
          <div className="flex items-end gap-1 h-12">
            {[40, 65, 55, 80, 70, 90].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-all ${i === 5 ? 'bg-green-400' : 'bg-zinc-700'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="text-lg font-black text-green-400 mt-2">4.2M so&apos;m</div>
        </div>
      ),
    },
    {
      icon: <CarWashIcon size={24} />,
      title: t('wash_title'),
      desc: t('wash_desc'),
      accent: 'from-cyan-500/10 to-transparent',
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      preview: (
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[
            { n: '#1', s: 'Yuvil.', c: 'bg-amber-500/20 border-amber-500/40 text-amber-400' },
            { n: '#2', s: "Bo'sh", c: 'bg-green-500/20 border-green-500/40 text-green-400' },
            { n: '#3', s: 'Band', c: 'bg-red-500/20 border-red-500/40 text-red-400' },
          ].map((b) => (
            <div key={b.n} className={`rounded-lg border p-2 text-center ${b.c}`}>
              <div className="text-[10px] font-bold">{b.n}</div>
              <div className="text-[9px] mt-0.5">{b.s}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <SpeedometerIcon size={24} />,
      title: 'Eslatmalar',
      desc: 'Moy almashtirish, texnik xizmat — avtomatik SMS va bildirishnomalar.',
      accent: 'from-orange-500/10 to-transparent',
      border: 'border-orange-500/20 hover:border-orange-500/40',
      iconBg: 'bg-orange-500/10 text-orange-400',
      preview: (
        <div className="mt-4 space-y-2">
          {[
            { plate: '01 A 777 AA', km: '500 km', type: 'Moy' },
            { plate: '10 B 234 CC', km: '1200 km', type: 'Shina' },
          ].map((r) => (
            <div key={r.plate} className="flex items-center justify-between text-xs p-2 rounded-lg bg-zinc-800/60 border border-zinc-700/40">
              <div>
                <div className="font-mono text-white">{r.plate}</div>
                <div className="text-zinc-500">{r.type}</div>
              </div>
              <span className="text-orange-400 font-medium">{r.km}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-medium">
              <ClipboardList className="w-3 h-3" />
              {t('title')}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-black text-white">{t('subtitle')}</h2>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.07} direction="up">
              <TiltCard className={`group h-full rounded-2xl border bg-zinc-900/60 p-5 transition-all duration-300 cursor-default ${f.border}`}>
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${f.iconBg} mb-4`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
                  {f.preview}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

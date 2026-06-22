'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, Info } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { SpotlightCursor } from '@/components/effects/SpotlightCursor';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { WrenchGearIcon, CarWashIcon, SpeedometerIcon } from '@/components/icons';
import type { Role } from '@/types';
import { cn } from '@/lib/utils/cn';

const roles: {
  key: Role;
  icon: React.ReactNode;
  color: string;
  border: string;
  bg: string;
  glow: string;
  demoName: string;
}[] = [
  {
    key: 'boss',
    icon: <SpeedometerIcon size={28} />,
    color: 'text-amber-400',
    border: 'border-amber-500/40 hover:border-amber-500',
    bg: 'bg-amber-500/5 hover:bg-amber-500/10',
    glow: 'hover:shadow-amber-500/10',
    demoName: 'Jahongir Rашидов',
  },
  {
    key: 'mechanic',
    icon: <WrenchGearIcon size={28} />,
    color: 'text-blue-400',
    border: 'border-blue-500/40 hover:border-blue-500',
    bg: 'bg-blue-500/5 hover:bg-blue-500/10',
    glow: 'hover:shadow-blue-500/10',
    demoName: 'Sardor Qodirov',
  },
  {
    key: 'washer',
    icon: <CarWashIcon size={28} />,
    color: 'text-cyan-400',
    border: 'border-cyan-500/40 hover:border-cyan-500',
    bg: 'bg-cyan-500/5 hover:bg-cyan-500/10',
    glow: 'hover:shadow-cyan-500/10',
    demoName: 'Bobur Nazarov',
  },
];

export default function AuthPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'uz';
  const login = useAuthStore((s) => s.login);
  const [selected, setSelected] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    if (!selected) return;
    setLoading(true);
    const roleData = roles.find((r) => r.key === selected)!;
    login(selected, roleData.demoName);
    setTimeout(() => {
      router.push(`/${locale}/dashboard`);
    }, 600);
  };

  return (
    <>
      <SpotlightCursor />

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/4 blur-3xl" />

        <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-12">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 mb-10"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 glow-amber">
              <Zap className="w-6 h-6 text-amber-400" fill="currentColor" />
            </div>
            <div className="text-center">
              <h1
                className="text-xl font-black tracking-widest text-white uppercase"
                style={{ fontFamily: 'var(--font-orbitron)' }}
              >
                Yantar <span className="text-amber-400">Auto OS</span>
              </h1>
              <p className="text-sm text-zinc-500 mt-1">{t('subtitle')}</p>
            </div>
          </motion.div>

          {/* Role cards */}
          <div className="space-y-3 mb-8">
            {roles.map((role, i) => {
              const isSelected = selected === role.key;
              return (
                <motion.button
                  key={role.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelected(role.key)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left shadow-lg',
                    role.bg,
                    role.border,
                    role.glow,
                    isSelected && 'ring-2 ring-offset-2 ring-offset-[#09090b]',
                    isSelected && role.key === 'boss' && 'ring-amber-500',
                    isSelected && role.key === 'mechanic' && 'ring-blue-500',
                    isSelected && role.key === 'washer' && 'ring-cyan-500',
                  )}
                >
                  {/* Icon */}
                  <div className={cn(
                    'flex items-center justify-center w-12 h-12 rounded-xl shrink-0 transition-colors',
                    isSelected ? role.bg : 'bg-zinc-800',
                    role.color
                  )}>
                    {role.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className={cn('font-bold text-sm', isSelected ? role.color : 'text-white')}>
                      {t(`role_${role.key}` as Parameters<typeof t>[0])}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5">
                      {t(`role_${role.key}_desc` as Parameters<typeof t>[0])}
                    </div>
                    <div className="text-xs text-zinc-600 mt-1 font-mono">
                      Demo: {role.demoName}
                    </div>
                  </div>

                  {/* Check */}
                  <div className={cn(
                    'w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all',
                    isSelected
                      ? role.key === 'boss'
                        ? 'border-amber-500 bg-amber-500'
                        : role.key === 'mechanic'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-cyan-500 bg-cyan-500'
                      : 'border-zinc-600'
                  )}>
                    {isSelected && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Enter button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <MagneticButton className="w-full">
              <button
                onClick={handleEnter}
                disabled={!selected || loading}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-200',
                  selected && !loading
                    ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-xl shadow-amber-500/20 cursor-pointer'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                )}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    {t('enter')}
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </MagneticButton>
          </motion.div>

          {/* Demo notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-start gap-2 mt-6 p-3 rounded-lg bg-zinc-800/40 border border-zinc-700/50"
          >
            <Info className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-500">{t('demo_notice')}</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

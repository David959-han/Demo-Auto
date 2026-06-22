'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Menu, Bell, LogOut, Zap } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { cn } from '@/lib/utils/cn';
import type { Role } from '@/types';

const roleColors: Record<Role, string> = {
  boss: 'bg-amber-500/20 text-amber-400',
  mechanic: 'bg-blue-500/20 text-blue-400',
  washer: 'bg-cyan-500/20 text-cyan-400',
};

const roleLabels: Record<Role, string> = {
  boss: 'Boshliq',
  mechanic: 'Usta',
  washer: 'Moykachi',
};

const pageTitles: Record<string, string> = {
  '/dashboard': 'Umumiy ko\'rinish',
  '/dashboard/orders': 'Ish Buyurtmalar',
  '/dashboard/wash': 'Yuvish Joyi',
  '/dashboard/customers': 'Mijozlar',
  '/dashboard/inventory': 'Zapchast Ombori',
  '/dashboard/reminders': 'Eslatmalar',
  '/dashboard/reports': 'Hisobotlar',
};

interface DashboardHeaderProps {
  onMenuOpen: () => void;
}

export function DashboardHeader({ onMenuOpen }: DashboardHeaderProps) {
  const t = useTranslations('dashboard');
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const { role, name, logout } = useAuthStore();
  const locale = (params?.locale as string) ?? 'uz';
  const [notifOpen, setNotifOpen] = useState(false);

  const stripped = pathname.replace(`/${locale}`, '');
  const pageTitle = pageTitles[stripped] ?? 'Dashboard';

  const handleLogout = () => {
    logout();
    router.push(`/${locale}/auth`);
  };

  const colors = role ? roleColors[role] : roleColors.boss;

  const notifications = [
    { id: 1, text: '01 A 777 AA — moy almashtirish vaqti', time: '5 daqiqa oldin', dot: 'bg-amber-400' },
    { id: 2, text: 'Sardor — yangi buyurtma qabul qildi', time: '12 daqiqa oldin', dot: 'bg-blue-400' },
    { id: 3, text: '#3 yuvish joyi bo\'sh qoldi', time: '1 soat oldin', dot: 'bg-green-400' },
  ];

  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-sm sticky top-0 z-30">
      {/* Left — burger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
        {/* Mobile logo */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <Zap className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
          <span
            className="text-xs font-black tracking-widest text-white uppercase"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            Yantar <span className="text-amber-400">OS</span>
          </span>
        </div>
        {/* Desktop page title */}
        <h1 className="hidden lg:block text-sm font-semibold text-white">{pageTitle}</h1>
      </div>

      {/* Right — notifs + user */}
      <div className="flex items-center gap-2">

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </button>

          {/* Dropdown */}
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-10 w-72 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-400">Bildirishnomalar</span>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50">
                    <span className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', n.dot)} />
                    <div>
                      <p className="text-xs text-zinc-300">{n.text}</p>
                      <p className="text-[10px] text-zinc-600 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* User chip */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
          <div className={cn(
            'flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black',
            colors
          )}>
            {name ? name[0] : '?'}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-medium text-white leading-tight">{name}</div>
            <div className={cn('text-[10px]', role ? roleColors[role].split(' ')[1] : 'text-zinc-500')}>
              {role ? roleLabels[role] : ''}
            </div>
          </div>
          <button
            onClick={handleLogout}
            title={t('logout')}
            className="ml-1 text-zinc-600 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Menu, Bell, LogOut, Zap } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils/cn';
import type { Role } from '@/types';

const roleColors: Record<Role, string> = {
  boss:     'bg-amber-500/20 text-amber-400',
  mechanic: 'bg-blue-500/20 text-blue-400',
  washer:   'bg-cyan-500/20 text-cyan-400',
};

const localeNames: Record<string, string> = { uz: "O'Z", en: 'EN', ar: 'AR' };
const locales = ['en', 'uz', 'ar'];

const pageKeyMap: Record<string, string> = {
  '/dashboard':            'overview',
  '/dashboard/orders':     'orders',
  '/dashboard/wash':       'wash',
  '/dashboard/customers':  'customers',
  '/dashboard/inventory':  'inventory',
  '/dashboard/history':     'history',
  '/dashboard/accounting':  'accounting',
  '/dashboard/reminders':  'reminders',
  '/dashboard/reports':    'reports',
};

interface DashboardHeaderProps {
  onMenuOpen: () => void;
}

export function DashboardHeader({ onMenuOpen }: DashboardHeaderProps) {
  const t = useTranslations('dashboard');
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const { data: session } = useSession();
  const locale = (params?.locale as string) ?? 'en';
  const [notifOpen, setNotifOpen] = useState(false);

  const role = (session?.user?.role ?? 'boss') as Role;
  const name = session?.user?.name ?? '';

  const stripped = pathname.replace(`/${locale}`, '');
  const pageKey = pageKeyMap[stripped];
  const pageTitle = pageKey ? t(pageKey as Parameters<typeof t>[0]) : 'Dashboard';

  const switchLocale = (next: string) => {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(`/${locale}/auth`);
  };

  const colors = roleColors[role] ?? roleColors.boss;

  const notifications = [
    { id: 1, text: 'A 12345 B — oil change due', time: '5 min ago', dot: 'bg-amber-400' },
    { id: 2, text: 'Ahmed — new order accepted', time: '12 min ago', dot: 'bg-blue-400' },
    { id: 3, text: 'Wash bay #3 is now available', time: '1 hour ago', dot: 'bg-green-400' },
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
        <div className="flex items-center gap-1.5 lg:hidden">
          <Zap className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
          <span
            className="text-xs font-black tracking-widest text-white uppercase"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            Yantar <span className="text-amber-400">OS</span>
          </span>
        </div>
        <h1 className="hidden lg:block text-sm font-semibold text-white">{pageTitle}</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        <ThemeToggle />

        {/* Locale switcher */}
        <div className="hidden sm:flex items-center gap-0.5 p-1 rounded-lg bg-zinc-800/60 border border-zinc-700/50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchLocale(l)}
              className={cn(
                'px-2 py-1 rounded-md text-[11px] font-semibold transition-all duration-200',
                currentLocale === l
                  ? 'bg-amber-500 text-black'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>

        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-10 w-72 rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-2.5 border-b border-zinc-800">
                  <span className="text-xs font-semibold text-zinc-400">{t('notifications')}</span>
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
          <div className={cn('flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black', colors)}>
            {name ? name[0] : '?'}
          </div>
          <div className="hidden sm:block">
            <div className="text-xs font-medium text-white leading-tight">{name}</div>
            <div className={cn('text-[10px]', colors.split(' ')[1])}>
              {t(`role_${role}` as Parameters<typeof t>[0])}
            </div>
          </div>
          <button
            onClick={handleLogout}
            title={t('logout')}
            className="ms-1 text-zinc-600 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

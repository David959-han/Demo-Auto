'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import {
  LayoutDashboard, Users, ClipboardList,
  BarChart3, Bell, LogOut, ChevronRight, History, BookOpen,
} from 'lucide-react';
import { WrenchGearIcon, CarWashIcon, BarcodeIcon } from '@/components/icons';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils/cn';
import type { Role } from '@/types';

interface NavItem {
  key: string;
  href: string;
  icon: React.ReactNode;
  roles: Role[];
}

const navItems: NavItem[] = [
  {
    key: 'overview',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    roles: ['boss'],
  },
  {
    key: 'orders',
    href: '/dashboard/orders',
    icon: <WrenchGearIcon size={16} />,
    roles: ['boss', 'mechanic'],
  },
  {
    key: 'customers',
    href: '/dashboard/customers',
    icon: <Users className="w-4 h-4" />,
    roles: ['boss', 'mechanic'],
  },
  {
    key: 'inventory',
    href: '/dashboard/inventory',
    icon: <BarcodeIcon size={16} />,
    roles: ['boss', 'mechanic'],
  },
  {
    key: 'wash',
    href: '/dashboard/wash',
    icon: <CarWashIcon size={16} />,
    roles: ['boss', 'washer'],
  },
  {
    key: 'history',
    href: '/dashboard/history',
    icon: <History className="w-4 h-4" />,
    roles: ['boss', 'mechanic'],
  },
  {
    key: 'reminders',
    href: '/dashboard/reminders',
    icon: <Bell className="w-4 h-4" />,
    roles: ['boss', 'mechanic', 'washer'],
  },
  {
    key: 'accounting',
    href: '/dashboard/accounting',
    icon: <BookOpen className="w-4 h-4" />,
    roles: ['boss'],
  },
  {
    key: 'reports',
    href: '/dashboard/reports',
    icon: <BarChart3 className="w-4 h-4" />,
    roles: ['boss'],
  },
];

const roleColors: Record<Role, { badge: string; text: string }> = {
  boss: { badge: 'bg-amber-500/20 text-amber-400', text: 'text-amber-400' },
  mechanic: { badge: 'bg-blue-500/20 text-blue-400', text: 'text-blue-400' },
  washer: { badge: 'bg-cyan-500/20 text-cyan-400', text: 'text-cyan-400' },
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const t = useTranslations('dashboard');
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = (params?.locale as string) ?? 'en';
  const currentLocale = useLocale();
  const isRTL = currentLocale === 'ar';
  const { data: session } = useSession();

  const role = (session?.user?.role ?? 'boss') as Role;
  const name = session?.user?.name ?? '';

  const filtered = navItems.filter((item) => item.roles.includes(role));

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    if (href === '/dashboard') return pathname === full;
    return pathname.startsWith(full);
  };

  const handleNav = (href: string) => {
    router.push(`/${locale}${href}`);
    onClose();
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(`/${locale}/auth`);
  };

  const colors = roleColors[role] ?? roleColors.boss;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo + close */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30">
            <Zap className="w-4 h-4 text-amber-400" fill="currentColor" />
          </div>
          <span
            className="text-xs font-black tracking-widest text-white uppercase"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            Yantar <span className="text-amber-400">OS</span>
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* User profile */}
      {role && (
        <div className="px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex items-center justify-center w-9 h-9 rounded-xl text-sm font-black',
              colors.badge
            )}>
              {name ? name[0] : '?'}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{name}</div>
              <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded-md', colors.badge)}>
                {t(`role_${role}` as Parameters<typeof t>[0])}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {filtered.map((item) => {
          const active = isActive(item.href);
          return (
            <button
              key={item.key}
              onClick={() => handleNav(item.href)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 text-left group',
                active
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
              )}
            >
              <span className={cn(
                'transition-colors shrink-0',
                active ? 'text-amber-400' : 'text-zinc-500 group-hover:text-zinc-300'
              )}>
                {item.icon}
              </span>
              <span className="flex-1">{t(item.key as Parameters<typeof t>[0])}</span>
              {active && <ChevronRight className="w-3 h-3 text-amber-500" />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex w-56 shrink-0 flex-col bg-zinc-900/80 h-screen sticky top-0',
        isRTL ? 'border-l border-zinc-800' : 'border-r border-zinc-800'
      )}>
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: isRTL ? 256 : -256 }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? 256 : -256 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={cn(
                'fixed top-0 bottom-0 w-56 bg-zinc-900 z-50 lg:hidden flex flex-col',
                isRTL
                  ? 'right-0 border-l border-zinc-800'
                  : 'left-0 border-r border-zinc-800'
              )}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

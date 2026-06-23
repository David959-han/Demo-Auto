'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { SpotlightCursor } from '@/components/effects/SpotlightCursor';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';

  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  const { isLoggedIn, role } = useAuthStore();

  useEffect(() => {
    if (hydrated && (!isLoggedIn || !role)) {
      router.replace(`/${locale}/auth`);
    }
  }, [hydrated, isLoggedIn, role, router, locale]);

  if (!hydrated || !isLoggedIn || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SpotlightCursor />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

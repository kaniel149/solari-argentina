import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { useTranslation } from '../../i18n';

function LoadingFallback() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-sky-500 rounded-full animate-spin" />
        <span className="text-sm text-zinc-500">{t('common.loading')}</span>
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - desktop */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-20 md:pb-6">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      {/* Mobile nav - bottom */}
      <MobileNav />
    </div>
  );
}

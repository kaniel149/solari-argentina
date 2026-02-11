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
        <svg className="animate-spin h-8 w-8 text-solar-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm text-dark-400">{t('common.loading')}</span>
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-solar-500/3 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

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

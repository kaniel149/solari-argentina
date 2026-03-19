import { useEffect } from 'react';
import { useTranslation } from '../i18n';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { t } = useTranslation();

  useEffect(() => {
    const timeout = setTimeout(onComplete, 1500);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-6 h-6 border-2 border-zinc-700 border-t-sky-500 rounded-full animate-spin" />
      <p className="text-sm text-zinc-500 mt-3">{t('common.loading')}</p>
    </div>
  );
}

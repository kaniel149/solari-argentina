import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useTranslation } from '../../i18n';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backTo?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, backTo, actions, className = '' }: PageHeaderProps) {
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className={`mb-6 ${className}`}>
      {backTo && (
        <button
          onClick={() => navigate(backTo)}
          className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 mb-3 transition-colors cursor-pointer"
        >
          <BackArrow className="w-4 h-4" />
          <span>{t('common.back')}</span>
        </button>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-zinc-50 tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-zinc-500 mt-0.5 max-w-2xl">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex-shrink-0 flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}

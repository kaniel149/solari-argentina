import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { fadeDown, transition } from '../../utils/animations';
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
    <motion.div
      initial={fadeDown.initial}
      animate={fadeDown.animate}
      transition={transition.default}
      className={`mb-8 ${className}`}
    >
      {backTo && (
        <button
          onClick={() => navigate(backTo)}
          className="flex items-center gap-1.5 text-sm text-dark-400 hover:text-white mb-3 transition-colors cursor-pointer"
        >
          <BackArrow className="w-4 h-4" />
          <span>{t('common.back')}</span>
        </button>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">{title}</h1>
          {subtitle && (
            <p className="text-dark-400 mt-2 max-w-2xl text-sm sm:text-base">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
    </motion.div>
  );
}

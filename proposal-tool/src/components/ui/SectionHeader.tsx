import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, transition } from '../../utils/animations';

interface SectionHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ icon, title, subtitle, action, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={transition.default}
      className={`flex items-start justify-between gap-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="text-solar-400 mt-0.5 flex-shrink-0">{icon}</span>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && (
            <p className="text-sm text-dark-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </motion.div>
  );
}

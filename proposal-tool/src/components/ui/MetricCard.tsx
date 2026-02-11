import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, transition } from '../../utils/animations';

interface MetricCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  sublabel?: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function MetricCard({ icon, value, label, sublabel, trend, className = '' }: MetricCardProps) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={transition.default}
      className={`glass rounded-xl p-4 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-solar-400">{icon}</span>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend.positive
                ? 'bg-emerald-500/15 text-emerald-400'
                : 'bg-rose-500/15 text-rose-400'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-dark-400 mt-1">{label}</div>
      {sublabel && <div className="text-xs text-dark-500 mt-0.5">{sublabel}</div>}
    </motion.div>
  );
}

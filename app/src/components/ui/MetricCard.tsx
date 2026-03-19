import type { ReactNode } from 'react';

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
    <div
      className={`bg-zinc-900 border border-white/[0.09] rounded-xl p-5 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sky-400">{icon}</span>
        {trend && (
          <span
            className={`text-xs font-medium flex items-center gap-0.5 ${
              trend.positive
                ? 'text-emerald-400'
                : 'text-rose-400'
            }`}
          >
            <span>{trend.positive ? '\u2191' : '\u2193'}</span>
            {trend.value}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-zinc-50 tracking-tight">{value}</div>
      <div className="text-sm text-zinc-500 mt-1">{label}</div>
      {sublabel && <div className="text-xs text-zinc-600 mt-0.5">{sublabel}</div>}
    </div>
  );
}

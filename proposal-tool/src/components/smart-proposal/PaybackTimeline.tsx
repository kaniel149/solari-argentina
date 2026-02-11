import { motion } from 'framer-motion';
import { formatUsd } from '../../utils/calculations';

interface PaybackTimelineProps {
  paybackYears: number;
  totalInvestmentUsd: number;
  totalSavings25Years: number;
}

export function PaybackTimeline({ paybackYears, totalInvestmentUsd, totalSavings25Years }: PaybackTimelineProps) {
  const paybackPercentage = Math.min((paybackYears / 25) * 100, 100);

  const yearMarks = [0, 5, 10, 15, 20, 25];

  return (
    <div className="glass-strong rounded-2xl p-6 mt-6">
      <h3 className="text-lg font-semibold text-white mb-6">Linea de tiempo de recupero</h3>

      {/* Timeline bar */}
      <div className="relative mb-8">
        {/* Background bar */}
        <div className="w-full h-8 rounded-full bg-dark-800 overflow-hidden flex">
          {/* Investment period */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${paybackPercentage}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            className="h-full bg-gradient-to-r from-amber-500/80 to-amber-600/80 rounded-l-full flex items-center justify-center relative"
          >
            <span className="text-xs font-semibold text-white whitespace-nowrap px-2">
              Periodo de inversion
            </span>
          </motion.div>

          {/* Profit period */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex-1 h-full bg-gradient-to-r from-emerald-500/80 to-emerald-600/80 rounded-r-full flex items-center justify-center"
          >
            <span className="text-xs font-semibold text-white whitespace-nowrap px-2">
              Periodo de ganancia
            </span>
          </motion.div>
        </div>

        {/* Payback marker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -top-8"
          style={{ left: `${paybackPercentage}%`, transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-white bg-solar-500 px-2 py-0.5 rounded-full">
              Ano {paybackYears}
            </span>
            <div className="w-0.5 h-3 bg-solar-400 mt-0.5" />
          </div>
        </motion.div>

        {/* Year labels */}
        <div className="flex justify-between mt-3">
          {yearMarks.map((year) => (
            <span key={year} className="text-xs text-slate-500">
              {year}
            </span>
          ))}
        </div>
      </div>

      {/* Summary row */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="text-center">
          <p className="text-xs text-slate-400">Inversion</p>
          <p className="text-lg font-bold text-amber-400">{formatUsd(totalInvestmentUsd)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-dark-600" />
          <span className="text-slate-500 text-sm">→</span>
          <div className="w-8 h-px bg-dark-600" />
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-400">Ahorro total en 25 anos</p>
          <p className="text-lg font-bold text-emerald-400">{formatUsd(totalSavings25Years)}</p>
        </div>
      </div>
    </div>
  );
}

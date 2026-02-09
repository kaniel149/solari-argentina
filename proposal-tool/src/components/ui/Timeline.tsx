import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface TimelineStep {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
  duration?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

const statusColors = {
  completed: {
    dot: 'bg-emerald-500 border-emerald-500/30',
    line: 'bg-emerald-500/40',
    text: 'text-dark-300',
  },
  current: {
    dot: 'bg-solar-500 border-solar-500/30 ring-4 ring-solar-500/20',
    line: 'bg-dark-700',
    text: 'text-white',
  },
  upcoming: {
    dot: 'bg-dark-700 border-dark-600',
    line: 'bg-dark-700',
    text: 'text-dark-400',
  },
};

export function Timeline({ steps, className = '' }: TimelineProps) {
  return (
    <div className={`space-y-0 ${className}`}>
      {steps.map((step, index) => {
        const status = step.status || 'upcoming';
        const colors = statusColors[status];
        const isLast = index === steps.length - 1;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex gap-4"
          >
            {/* Dot + Line */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${colors.dot}
                `}
              >
                {status === 'completed' ? (
                  <Check className="w-4 h-4 text-white" />
                ) : step.icon ? (
                  <span className="text-xs">{step.icon}</span>
                ) : (
                  <span className="text-xs font-bold text-white/70">{index + 1}</span>
                )}
              </div>
              {!isLast && (
                <div className={`w-0.5 flex-1 min-h-8 ${colors.line}`} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
              <div className="flex items-center gap-2">
                <h4 className={`font-medium text-sm ${colors.text}`}>{step.title}</h4>
                {step.duration && (
                  <span className="text-xs text-dark-500 bg-dark-800 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                )}
              </div>
              {step.description && (
                <p className="mt-1 text-sm text-dark-500 leading-relaxed">{step.description}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

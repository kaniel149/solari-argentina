import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { transition } from '../../utils/animations';

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
    dot: 'bg-sky-500',
    line: 'bg-zinc-800',
    text: 'text-zinc-300',
  },
  current: {
    dot: 'bg-amber-500 ring-4 ring-amber-500/20',
    line: 'bg-zinc-800',
    text: 'text-zinc-50',
  },
  upcoming: {
    dot: 'bg-zinc-700',
    line: 'bg-zinc-800',
    text: 'text-zinc-500',
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
            transition={{ delay: index * 0.05, ...transition.default }}
            className="flex gap-4"
          >
            {/* Dot + Line */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5
                  ${colors.dot}
                `}
              >
                {status === 'completed' && (
                  <Check className="w-2.5 h-2.5 text-white" />
                )}
              </div>
              {!isLast && (
                <div className={`w-px flex-1 min-h-8 ${colors.line}`} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLast ? 'pb-0' : ''}`}>
              <div className="flex items-center gap-2">
                <h4 className={`font-medium text-sm ${colors.text}`}>{step.title}</h4>
                {step.duration && (
                  <span className="text-xs text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded-md">
                    {step.duration}
                  </span>
                )}
              </div>
              {step.description && (
                <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{step.description}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

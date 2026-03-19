import { motion } from 'framer-motion';
import type { Step } from '../../types';

interface StepIndicatorProps {
  currentStep: Step;
  steps: { key: Step; label: string; icon: string }[];
}

const stepOrder: Step[] = ['location', 'consumption', 'property', 'preferences', 'loading', 'proposal'];

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  const currentIndex = stepOrder.indexOf(currentStep);

  if (currentStep === 'loading' || currentStep === 'proposal') return null;

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => {
        const isActive = stepOrder.indexOf(step.key) === currentIndex;
        const isCompleted = stepOrder.indexOf(step.key) < currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2">
            <motion.div
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                transition-colors duration-200
                ${isActive
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/25'
                  : isCompleted
                    ? 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                }
              `}
              animate={{ scale: isActive ? 1.05 : 1 }}
            >
              <span>{isCompleted ? '\u2713' : step.icon}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-px ${isCompleted ? 'bg-sky-500/30' : 'bg-zinc-800'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

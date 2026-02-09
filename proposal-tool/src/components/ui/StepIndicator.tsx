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
                transition-all duration-300
                ${isActive
                  ? 'bg-solar-500/20 text-solar-300 border border-solar-500/30'
                  : isCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-dark-800/50 text-dark-500 border border-dark-700/30'
                }
              `}
              animate={{ scale: isActive ? 1.05 : 1 }}
            >
              <span>{isCompleted ? '✓' : step.icon}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <div className={`w-8 h-px ${isCompleted ? 'bg-emerald-500/30' : 'bg-dark-700/30'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

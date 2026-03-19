import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { useTranslation } from '../../i18n';
import { fadeUp, transition } from '../../utils/animations';

interface BillProcessingProps {
  onComplete: () => void;
  onCancel?: () => void;
}

const steps = [
  { emoji: '\uD83D\uDCF7', keyEn: 'Reading bill...', keyHe: '\u05E7\u05D5\u05E8\u05D0 \u05D7\u05E9\u05D1\u05D5\u05DF...' },
  { emoji: '\uD83E\uDD16', keyEn: 'Extracting data...', keyHe: '\u05DE\u05D7\u05DC\u05E5 \u05E0\u05EA\u05D5\u05E0\u05D9\u05DD...' },
  { emoji: '\u2705', keyEn: 'Complete!', keyHe: '\u05D4\u05D5\u05E9\u05DC\u05DD!' },
];

export function BillProcessing({ onComplete, onCancel }: BillProcessingProps) {
  const { language } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <GlassCard
      variant="accent"
      {...fadeUp}
      transition={transition.slow}
      className="max-w-sm mx-auto text-center py-12"
    >
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transition.default}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-4xl">{steps[currentStep].emoji}</span>
            <p className="text-white text-lg font-medium">
              {language === 'he' ? steps[currentStep].keyHe : steps[currentStep].keyEn}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${i <= currentStep ? 'bg-solar-400 scale-100' : 'bg-white/20 scale-75'}
              `}
            />
          ))}
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </GlassCard>
  );
}

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';

interface LoadingScreenProps {
  onComplete: () => void;
}

const steps = [
  { icon: '\ud83d\udef0\ufe0f', en: 'Analyzing solar radiation in your area...', he: '\u05de\u05e0\u05ea\u05d7 \u05e7\u05e8\u05d9\u05e0\u05ea \u05e9\u05de\u05e9 \u05d1\u05d0\u05d6\u05d5\u05e8 \u05e9\u05dc\u05da...' },
  { icon: '\ud83d\udcca', en: 'Calculating your energy consumption...', he: '\u05de\u05d7\u05e9\u05d1 \u05d0\u05ea \u05e6\u05e8\u05d9\u05db\u05ea \u05d4\u05d0\u05e0\u05e8\u05d2\u05d9\u05d4 \u05e9\u05dc\u05da...' },
  { icon: '\u26a1', en: 'Designing the optimal system...', he: '\u05de\u05ea\u05db\u05e0\u05df \u05d0\u05ea \u05d4\u05de\u05e2\u05e8\u05db\u05ea \u05d4\u05d0\u05d5\u05e4\u05d8\u05d9\u05de\u05dc\u05d9\u05ea...' },
  { icon: '\ud83d\udd27', en: 'Selecting equipment...', he: '\u05d1\u05d5\u05d7\u05e8 \u05e6\u05d9\u05d5\u05d3...' },
  { icon: '\ud83d\udcb0', en: 'Calculating savings & ROI...', he: '\u05de\u05d7\u05e9\u05d1 \u05d7\u05d9\u05e1\u05db\u05d5\u05df \u05d5\u05d4\u05d7\u05d6\u05e8 \u05d4\u05e9\u05e7\u05e2\u05d4...' },
  { icon: '\ud83c\udf31', en: 'Estimating environmental impact...', he: '\u05de\u05e2\u05e8\u05d9\u05da \u05d4\u05e9\u05e4\u05e2\u05d4 \u05e1\u05d1\u05d9\u05d1\u05ea\u05d9\u05ea...' },
  { icon: '\ud83d\udccb', en: 'Generating your personalized proposal...', he: '\u05de\u05d9\u05d9\u05e6\u05e8 \u05d0\u05ea \u05d4\u05d4\u05e6\u05e2\u05d4 \u05d4\u05de\u05d5\u05ea\u05d0\u05de\u05ea \u05d0\u05d9\u05e9\u05d9\u05ea \u05e9\u05dc\u05da...' },
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { language } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 600; // ms per step
    const totalDuration = steps.length * stepDuration;

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (totalDuration / 50));
        return Math.min(newProgress, 100);
      });
    }, 50);

    // Step advancement
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    // Complete
    const timeout = setTimeout(onComplete, totalDuration + 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[60vh] flex flex-col items-center justify-center"
    >
      {/* Solar animation */}
      <div className="relative mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="w-32 h-32 relative"
        >
          {/* Sun rays */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 bg-gradient-to-t from-amber-500/0 to-amber-400"
              style={{
                height: 20 + (i % 2) * 10,
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 30}deg) translateY(-40px)`,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
          {/* Sun core */}
          <motion.div
            className="absolute inset-6 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-xl shadow-amber-500/30"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Orbiting panel */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-20px]"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <div className="w-6 h-4 bg-solar-600 rounded-sm border border-solar-400/50 shadow-lg shadow-solar-500/20" />
          </div>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="max-w-md w-full space-y-3 mb-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: i <= currentStep ? 1 : 0.3,
              x: 0,
            }}
            transition={{ delay: i * 0.15, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.span
              className="text-xl"
              animate={i === currentStep ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.5, repeat: i === currentStep ? Infinity : 0 }}
            >
              {i < currentStep ? '✅' : step.icon}
            </motion.span>
            <span className={`text-sm ${i <= currentStep ? 'text-white' : 'text-dark-600'}`}>
              {language === 'he' ? step.he : step.en}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-80 h-2 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-solar-500 to-amber-500 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <p className="text-dark-500 text-sm mt-3">{Math.round(progress)}%</p>
    </motion.div>
  );
}

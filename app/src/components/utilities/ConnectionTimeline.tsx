import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, FileText, Lightbulb, DollarSign } from 'lucide-react';
import { useTranslation } from '../../i18n';
import type { UtilityGuide } from '../../data/utilities';

interface ConnectionTimelineProps {
  steps: UtilityGuide['connectionProcess'];
}

export function ConnectionTimeline({ steps }: ConnectionTimelineProps) {
  const { language } = useTranslation();
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (step: number) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(step)) {
        next.delete(step);
      } else {
        next.add(step);
      }
      return next;
    });
  };

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isExpanded = expandedSteps.has(step.step);
        const isLast = index === steps.length - 1;
        const title = language === 'he' ? step.title.he : step.title.en;
        const description = language === 'he' ? step.description.he : step.description.en;
        const duration = language === 'he' ? step.duration.he : step.duration.en;

        return (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex gap-4"
          >
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => toggleStep(step.step)}
                className="w-10 h-10 rounded-full bg-solar-500/20 border-2 border-solar-500/40 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-solar-500/30 transition-colors"
              >
                <span className="text-sm font-bold text-solar-300">{step.step}</span>
              </button>
              {!isLast && (
                <div className="w-0.5 flex-1 min-h-8 bg-dark-700" />
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-4'}`}>
              <button
                onClick={() => toggleStep(step.step)}
                className="w-full text-start cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm text-white group-hover:text-solar-300 transition-colors">
                    {title}
                  </h4>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-dark-500" />
                  </motion.div>
                </div>
                <div className="flex items-center gap-3 text-xs text-dark-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {duration}
                  </span>
                  {step.fee && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {step.fee}
                    </span>
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-3">
                      {/* Description */}
                      <p className="text-sm text-dark-400 leading-relaxed">
                        {description}
                      </p>

                      {/* Documents */}
                      {step.documents && (
                        <div className="glass rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-3.5 h-3.5 text-solar-400" />
                            <span className="text-xs font-medium text-dark-300">
                              {language === 'he' ? 'מסמכים נדרשים' : 'Required Documents'}
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {(language === 'he' ? step.documents.he : step.documents.en).map((doc, i) => (
                              <li key={i} className="text-xs text-dark-400 flex items-start gap-2">
                                <span className="text-dark-600 mt-0.5">&#8226;</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tips */}
                      {step.tips && (
                        <div className="glass rounded-lg p-3 border-amber-500/10">
                          <div className="flex items-center gap-2 mb-2">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                            <span className="text-xs font-medium text-dark-300">
                              {language === 'he' ? 'טיפים' : 'Tips'}
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {(language === 'he' ? step.tips.he : step.tips.en).map((tip, i) => (
                              <li key={i} className="text-xs text-dark-400 flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">&#8226;</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

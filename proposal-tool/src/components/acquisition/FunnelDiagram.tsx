import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../../i18n';
import type { SalesFunnel } from '../../data/acquisition';

interface FunnelDiagramProps {
  funnel: SalesFunnel;
}

export function FunnelDiagram({ funnel }: FunnelDiagramProps) {
  const { language } = useTranslation();
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const stageCount = funnel.stages.length;

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-semibold gradient-text mb-6">
        {language === 'he' ? 'משפך מכירות' : 'Sales Funnel'}
      </h3>

      {/* Funnel visualization */}
      <div className="space-y-1.5 mb-4">
        {funnel.stages.map((stage, index) => {
          const widthPercent = 100 - (index / stageCount) * 55;
          const isSelected = selectedStage === index;

          // Gradient from solar-500 (top) to amber-500 (bottom)
          const hueStart = 199; // solar-500 hue
          const hueEnd = 38;   // amber-500 hue
          const hue = hueStart + ((hueEnd - hueStart) * index) / (stageCount - 1);
          const bgColor = `hsl(${hue}, 80%, 50%)`;

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              onClick={() => setSelectedStage(isSelected ? null : index)}
              className="w-full cursor-pointer group"
            >
              <div
                className="mx-auto rounded-lg py-3 px-4 flex items-center justify-between transition-all duration-200"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: `${bgColor}${isSelected ? '33' : '1a'}`,
                  borderWidth: 1,
                  borderColor: `${bgColor}${isSelected ? '66' : '33'}`,
                }}
              >
                <span className="text-sm font-medium text-white">
                  {stage.name[language]}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: bgColor }}>
                    {stage.conversionRate}
                  </span>
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-dark-500 transition-transform ${isSelected ? 'rotate-90' : ''}`}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Selected stage details */}
      <AnimatePresence>
        {selectedStage !== null && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-4 rounded-xl bg-white/3 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-white">
                  {funnel.stages[selectedStage].name[language]}
                </h4>
                <span className="text-xs text-dark-400">
                  {funnel.stages[selectedStage].duration[language]}
                </span>
              </div>
              <p className="text-xs text-dark-400">
                {funnel.stages[selectedStage].description[language]}
              </p>
              <div>
                <h5 className="text-xs font-medium text-dark-300 mb-1.5">
                  {language === 'he' ? 'פעולות' : 'Actions'}
                </h5>
                <ul className="space-y-1">
                  {funnel.stages[selectedStage].actions[language].map((action, i) => (
                    <li key={i} className="text-xs text-dark-400 flex gap-2">
                      <span className="text-solar-400 flex-shrink-0">-</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

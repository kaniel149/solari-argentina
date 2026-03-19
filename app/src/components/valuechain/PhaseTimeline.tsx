import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n';
import type { ValueChainPhase } from '../../data/valueChain';

interface PhaseTimelineProps {
  phases: ValueChainPhase[];
  selectedPhaseId: number;
  onSelectPhase: (id: number) => void;
}

export function PhaseTimeline({ phases, selectedPhaseId, onSelectPhase }: PhaseTimelineProps) {
  const { language } = useTranslation();

  return (
    <div className="space-y-0">
      {phases.map((phase, i) => {
        const isSelected = phase.id === selectedPhaseId;
        const isLast = i === phases.length - 1;

        return (
          <div key={phase.id} className="relative flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              {/* Dot */}
              <motion.button
                onClick={() => onSelectPhase(phase.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative z-10 w-10 h-10 rounded-full flex items-center justify-center
                  text-sm font-bold transition-all duration-300 cursor-pointer flex-shrink-0
                  ${isSelected
                    ? 'bg-solar-500 text-white shadow-lg shadow-solar-500/30'
                    : 'bg-dark-800 text-dark-400 border border-white/10 hover:border-solar-500/30 hover:text-solar-400'
                  }
                `}
              >
                {phase.id}
              </motion.button>

              {/* Line */}
              {!isLast && (
                <div
                  className={`
                    w-0.5 flex-1 min-h-[2rem] transition-colors duration-300
                    ${isSelected ? 'bg-solar-500/40' : 'bg-white/10'}
                  `}
                />
              )}
            </div>

            {/* Content */}
            <motion.button
              onClick={() => onSelectPhase(phase.id)}
              className={`
                flex-1 pb-6 text-start cursor-pointer group
                ${isLast ? '' : ''}
              `}
            >
              <h4
                className={`
                  text-sm font-semibold transition-colors
                  ${isSelected ? 'text-solar-300' : 'text-dark-200 group-hover:text-white'}
                `}
              >
                {phase.title[language]}
              </h4>
              <span className="text-xs text-dark-500 mt-0.5 block">
                {phase.duration[language]}
              </span>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}

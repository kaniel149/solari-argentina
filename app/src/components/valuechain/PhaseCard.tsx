import { motion } from 'framer-motion';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import type { ValueChainPhase } from '../../data/valueChain';

interface PhaseCardProps {
  phase: ValueChainPhase;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export function PhaseCard({ phase, isSelected, onClick, index }: PhaseCardProps) {
  const { language, t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      onClick={onClick}
      className={`
        glass rounded-2xl p-5 cursor-pointer transition-all duration-300
        ${isSelected
          ? 'border-solar-500/40 shadow-lg shadow-solar-500/10'
          : 'hover:border-solar-400/20 hover:shadow-md hover:shadow-solar-500/5'
        }
      `}
    >
      {/* Phase number */}
      <div className="flex items-start justify-between mb-3">
        <span
          className={`
            text-4xl font-black tabular-nums leading-none
            ${isSelected
              ? 'bg-gradient-to-br from-solar-400 to-solar-600 bg-clip-text text-transparent'
              : 'text-dark-700'
            }
          `}
        >
          {phase.id}
        </span>
        <Badge variant="info" size="sm">
          {phase.duration[language]}
        </Badge>
      </div>

      {/* Title */}
      <h3 className={`text-base font-semibold mb-2 transition-colors ${isSelected ? 'text-solar-300' : 'text-white'}`}>
        {phase.title[language]}
      </h3>

      {/* Description (truncated) */}
      <p className="text-sm text-dark-400 line-clamp-2 mb-3">
        {phase.description[language]}
      </p>

      {/* Deliverables count */}
      <div className="flex items-center gap-2">
        <Badge variant="default" size="sm">
          {phase.deliverables[language].length} {t('valueChain.deliverables').toLowerCase()}
        </Badge>
        <Badge variant="default" size="sm">
          {phase.steps.length} {t('valueChain.steps').toLowerCase()}
        </Badge>
      </div>
    </motion.div>
  );
}

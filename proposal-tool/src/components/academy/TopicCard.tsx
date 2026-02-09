import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import type { AcademyTopic } from '../../data/academy';

interface TopicCardProps {
  topic: AcademyTopic;
  isCompleted: boolean;
  index: number;
}

const categoryConfig: Record<
  AcademyTopic['category'],
  { variant: 'info' | 'purple' | 'warning' | 'danger' | 'success'; key: string }
> = {
  fundamentals: { variant: 'info', key: 'category.fundamentals' },
  technology: { variant: 'purple', key: 'category.technology' },
  economics: { variant: 'warning', key: 'category.economics' },
  regulatory: { variant: 'danger', key: 'category.regulatory' },
  operations: { variant: 'success', key: 'category.operations' },
};

const difficultyConfig: Record<
  AcademyTopic['difficulty'],
  { variant: 'success' | 'warning' | 'danger'; key: string }
> = {
  beginner: { variant: 'success', key: 'difficulty.beginner' },
  intermediate: { variant: 'warning', key: 'difficulty.intermediate' },
  advanced: { variant: 'danger', key: 'difficulty.advanced' },
};

export function TopicCard({ topic, isCompleted, index }: TopicCardProps) {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const catConfig = categoryConfig[topic.category];
  const diffConfig = difficultyConfig[topic.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/academy/${topic.id}`)}
      className="
        glass rounded-2xl p-5 cursor-pointer
        transition-all duration-300
        hover:border-solar-400/30 hover:shadow-lg hover:shadow-solar-500/5
        relative group
      "
    >
      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute top-4 end-4">
          <CheckCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
        </div>
      )}

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge variant={catConfig.variant} size="sm">
          {t(catConfig.key as Parameters<typeof t>[0])}
        </Badge>
        <Badge variant={diffConfig.variant} size="sm">
          {t(diffConfig.key as Parameters<typeof t>[0])}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white mb-2 pe-6 group-hover:text-solar-300 transition-colors">
        {topic.title[language]}
      </h3>

      {/* Summary */}
      <p className="text-sm text-dark-400 mb-4 line-clamp-2">
        {topic.summary[language]}
      </p>

      {/* Read time */}
      <div className="flex items-center gap-1.5 text-xs text-dark-500">
        <Clock className="w-3.5 h-3.5" />
        <span>
          {topic.estimatedMinutes} {t('common.minutes')}
        </span>
      </div>
    </motion.div>
  );
}

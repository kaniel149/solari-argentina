import { motion } from 'framer-motion';
import { Clock, Check } from 'lucide-react';
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      onClick={() => navigate(`/academy/${topic.id}`)}
      className="
        bg-zinc-900 border border-white/[0.09] rounded-xl p-5 cursor-pointer
        transition-colors duration-200
        hover:border-white/[0.15]
        relative group
      "
    >
      {/* Completion indicator */}
      {isCompleted && (
        <div className="absolute top-4 end-4 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Check className="w-3 h-3 text-emerald-400" />
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
      <h3 className="text-base font-semibold text-zinc-200 mb-2 pe-6 group-hover:text-zinc-50 transition-colors">
        {topic.title[language]}
      </h3>

      {/* Summary */}
      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
        {topic.summary[language]}
      </p>

      {/* Read time */}
      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
        <Clock className="w-3.5 h-3.5" />
        <span>
          {topic.estimatedMinutes} {t('common.minutes')}
        </span>
      </div>
    </motion.div>
  );
}

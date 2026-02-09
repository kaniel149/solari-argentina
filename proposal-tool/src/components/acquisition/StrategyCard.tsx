import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Search,
  Share2,
  MessageCircle,
  MapPin,
  DoorOpen,
  Home,
  Zap,
  Building2,
  Users,
  Gift,
  Wrench,
  Lightbulb,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import type { AcquisitionStrategy } from '../../data/acquisition';

const iconMap: Record<string, LucideIcon> = {
  Search,
  Share2,
  MessageCircle,
  MapPin,
  DoorOpen,
  Home,
  Zap,
  Building2,
  Users,
  Gift,
};

const difficultyVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
};

const costVariant: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
  free: 'success',
  low: 'info',
  medium: 'warning',
  high: 'danger',
};

const categoryColor: Record<string, string> = {
  digital: 'border-solar-500/20',
  direct: 'border-amber-500/20',
  referral: 'border-emerald-500/20',
  partnership: 'border-purple-500/20',
};

interface StrategyCardProps {
  strategy: AcquisitionStrategy;
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  const { language } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const Icon = iconMap[strategy.icon] || Lightbulb;
  const title = strategy.title[language];
  const description = strategy.description[language];
  const timeToLead = strategy.timeToFirstLead[language];
  const tips = strategy.tips[language];
  const metrics = strategy.metrics[language];

  const difficultyLabel = language === 'he'
    ? { easy: 'קל', medium: 'בינוני', hard: 'קשה' }[strategy.difficulty]
    : strategy.difficulty;

  const costLabel = language === 'he'
    ? { free: 'חינם', low: 'נמוך', medium: 'בינוני', high: 'גבוה' }[strategy.costLevel]
    : strategy.costLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass rounded-2xl overflow-hidden border ${categoryColor[strategy.category]} transition-all duration-300 hover:border-opacity-40`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-start cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-solar-500/15 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-solar-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
            <p className="text-sm text-dark-400 line-clamp-2 mb-3">{description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant={difficultyVariant[strategy.difficulty]}>{difficultyLabel}</Badge>
              <Badge variant={costVariant[strategy.costLevel]}>{costLabel}</Badge>
              <Badge variant="info">{strategy.expectedLeadsPerMonth} {language === 'he' ? 'לידים/חודש' : 'leads/mo'}</Badge>
              <Badge variant="default">{timeToLead}</Badge>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-5 h-5 text-dark-500" />
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-5 border-t border-white/5 pt-4">
              {/* Steps */}
              <div>
                <h4 className="text-sm font-semibold text-dark-200 mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-solar-400" />
                  {language === 'he' ? 'שלבי ביצוע' : 'Steps'}
                </h4>
                <div className="space-y-2">
                  {strategy.steps.map((step, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-lg bg-solar-500/10 text-solar-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-dark-200">{step.title[language]}</p>
                        <p className="text-dark-500 text-xs mt-0.5">{step.description[language]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-sm font-semibold text-dark-200 mb-2">
                  {language === 'he' ? 'כלים' : 'Tools'}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {strategy.tools.map((tool) => (
                    <span key={tool} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-dark-300 border border-white/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h4 className="text-sm font-semibold text-dark-200 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  {language === 'he' ? 'טיפים' : 'Tips'}
                </h4>
                <ul className="space-y-1">
                  {tips.map((tip, i) => (
                    <li key={i} className="text-xs text-dark-400 flex gap-2">
                      <span className="text-amber-400 flex-shrink-0">*</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="text-sm font-semibold text-dark-200 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  {language === 'he' ? 'מדדי ביצוע' : 'KPIs'}
                </h4>
                <ul className="space-y-1">
                  {metrics.map((metric, i) => (
                    <li key={i} className="text-xs text-dark-400 flex gap-2">
                      <span className="text-emerald-400 flex-shrink-0">-</span>
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Content */}
              {strategy.sampleContent && (
                <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                  <h4 className="text-xs font-semibold text-dark-300 mb-1">
                    {language === 'he' ? 'דוגמת תוכן' : 'Sample Content'}
                  </h4>
                  <p className="text-xs text-dark-400 italic">
                    {strategy.sampleContent[language]}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

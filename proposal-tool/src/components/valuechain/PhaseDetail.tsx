import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  DollarSign,
  FileText,
  Wrench,
  Lightbulb,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Accordion } from '../ui/Accordion';
import { SectionHeader } from '../ui/SectionHeader';
import { Badge } from '../ui/Badge';
import { useTranslation } from '../../i18n';
import type { ValueChainPhase } from '../../data/valueChain';

interface PhaseDetailProps {
  phase: ValueChainPhase;
}

export function PhaseDetail({ phase }: PhaseDetailProps) {
  const { language, t } = useTranslation();

  const accordionItems = phase.steps.map((step, i) => ({
    id: `step-${i}`,
    title: `${i + 1}. ${step.title[language]}`,
    content: (
      <div className="space-y-4">
        {/* Step description */}
        <p className="text-sm text-dark-300 leading-relaxed">
          {step.description[language]}
        </p>

        {/* Tips */}
        {step.tips[language].length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-amber-400 mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              {t('valueChain.tips')}
            </h5>
            <ul className="space-y-1.5">
              {step.tips[language].map((tip, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-dark-400">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Documents */}
        {step.documents && step.documents[language].length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-solar-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {t('valueChain.documents')}
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {step.documents[language].map((doc, j) => (
                <Badge key={j} variant="info" size="sm">
                  {doc}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        {step.tools && step.tools.length > 0 && (
          <div>
            <h5 className="text-xs font-medium text-purple-400 mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5" />
              Tools
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {step.tools.map((tool, j) => (
                <Badge key={j} variant="purple" size="sm">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <motion.div
      key={phase.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <GlassCard variant="accent">
        <div className="flex items-start gap-4">
          <span className="text-5xl font-black bg-gradient-to-br from-solar-400 to-solar-600 bg-clip-text text-transparent leading-none">
            {phase.id}
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">
              {phase.title[language]}
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="info" size="md">
                {phase.duration[language]}
              </Badge>
              {phase.costEstimate && (
                <Badge variant="warning" size="md">
                  <DollarSign className="w-3 h-3" />
                  {phase.costEstimate[language]}
                </Badge>
              )}
            </div>
            <p className="text-sm text-dark-400 leading-relaxed">
              {phase.description[language]}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Steps Accordion */}
      <div>
        <SectionHeader
          title={`${t('valueChain.steps')} (${phase.steps.length})`}
          className="mb-4"
        />
        <Accordion
          items={accordionItems}
          allowMultiple
          defaultOpen={['step-0']}
        />
      </div>

      {/* Deliverables */}
      <div>
        <SectionHeader
          icon={<CheckCircle className="w-5 h-5" />}
          title={t('valueChain.deliverables')}
          className="mb-4"
        />
        <GlassCard>
          <ul className="space-y-3">
            {phase.deliverables[language].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Risks */}
      <div>
        <SectionHeader
          icon={<AlertTriangle className="w-5 h-5" />}
          title={t('valueChain.risks')}
          className="mb-4"
        />
        <GlassCard>
          <ul className="space-y-3">
            {phase.risks[language].map((risk, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </motion.div>
  );
}

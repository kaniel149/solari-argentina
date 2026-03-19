import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../components/layout/PageHeader';
import { PhaseTimeline } from '../components/valuechain/PhaseTimeline';
import { PhaseDetail } from '../components/valuechain/PhaseDetail';
import { PhaseCard } from '../components/valuechain/PhaseCard';
import { useTranslation } from '../i18n';
import { valueChainPhases } from '../data/valueChain';

export default function ValueChainPage() {
  const { t } = useTranslation();
  const [selectedPhaseId, setSelectedPhaseId] = useState(1);

  const selectedPhase = valueChainPhases.find((p) => p.id === selectedPhaseId) ?? valueChainPhases[0];

  return (
    <div>
      <PageHeader
        title={t('valueChain.title')}
        subtitle={t('valueChain.subtitle')}
      />

      {/* Desktop layout: Timeline sidebar + Detail */}
      <div className="hidden lg:flex gap-6">
        {/* Timeline sidebar (sticky) */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-6">
            <PhaseTimeline
              phases={valueChainPhases}
              selectedPhaseId={selectedPhaseId}
              onSelectPhase={setSelectedPhaseId}
            />
          </div>
        </div>

        {/* Phase detail */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <PhaseDetail key={selectedPhaseId} phase={selectedPhase} />
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout: Cards that expand to detail */}
      <div className="lg:hidden space-y-4">
        {valueChainPhases.map((phase, i) => (
          <div key={phase.id}>
            <PhaseCard
              phase={phase}
              isSelected={selectedPhaseId === phase.id}
              onClick={() =>
                setSelectedPhaseId(selectedPhaseId === phase.id ? -1 : phase.id)
              }
              index={i}
            />

            <AnimatePresence>
              {selectedPhaseId === phase.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-4">
                    <PhaseDetail phase={phase} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

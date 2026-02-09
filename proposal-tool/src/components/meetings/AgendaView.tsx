import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n';
import type { MeetingGuide } from '../../data/meetings';

interface AgendaViewProps {
  agenda: MeetingGuide['agenda'];
}

export function AgendaView({ agenda }: AgendaViewProps) {
  const { language } = useTranslation();

  return (
    <div className="space-y-0">
      {agenda.map((item, index) => {
        const isLast = index === agenda.length - 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex gap-4"
          >
            {/* Time column + line */}
            <div className="flex flex-col items-center">
              <div className="w-20 flex-shrink-0 text-center">
                <span className="text-xs font-mono text-solar-400 bg-solar-500/10 px-2 py-1 rounded-md border border-solar-500/20">
                  {item.time}
                </span>
              </div>
              {!isLast && (
                <div className="w-0.5 flex-1 min-h-6 bg-dark-700 mt-2" />
              )}
            </div>

            {/* Content */}
            <div className={`pb-6 flex-1 ${isLast ? 'pb-0' : ''}`}>
              <h4 className="font-medium text-sm text-white mb-1">
                {item.topic[language]}
              </h4>
              <p className="text-sm text-dark-400 leading-relaxed">
                {item.details[language]}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

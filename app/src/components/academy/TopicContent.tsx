import { CheckCircle, Lightbulb } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeader } from '../ui/SectionHeader';
import { useTranslation } from '../../i18n';
import type { AcademyTopic } from '../../data/academy';

interface TopicContentProps {
  topic: AcademyTopic;
}

export function TopicContent({ topic }: TopicContentProps) {
  const { t, language } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Content paragraphs */}
      <GlassCard>
        <div className="space-y-4">
          {topic.content[language].map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-dark-300">
              {paragraph}
            </p>
          ))}
        </div>
      </GlassCard>

      {/* Key Points */}
      <div>
        <SectionHeader
          icon={<CheckCircle className="w-5 h-5" />}
          title={t('academy.keyPoints')}
          className="mb-4"
        />
        <GlassCard>
          <ul className="space-y-3">
            {topic.keyPoints[language].map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Practical Tips */}
      <div>
        <SectionHeader
          icon={<Lightbulb className="w-5 h-5" />}
          title={t('academy.practicalTips')}
          className="mb-4"
        />
        <GlassCard>
          <ul className="space-y-3">
            {topic.practicalTips[language].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark-300">
                <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Argentina Context */}
      {topic.argentinaContext && (
        <div>
          <SectionHeader
            icon={<span className="text-lg">&#127462;&#127479;</span>}
            title={t('academy.argentinaContext')}
            className="mb-4"
          />
          <GlassCard variant="highlight">
            <p className="text-sm leading-relaxed text-dark-300">
              {topic.argentinaContext[language]}
            </p>
          </GlassCard>
        </div>
      )}
    </div>
  );
}

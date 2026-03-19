import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { TopicContent } from '../components/academy/TopicContent';
import { Badge } from '../components/ui/Badge';
import { useTranslation } from '../i18n';
import { academyTopics } from '../data/academy';

const STORAGE_KEY = 'solari-academy-completed';

export default function AcademyTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { t, language } = useTranslation();

  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Load completed state
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCompletedIds(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const topicIndex = useMemo(
    () => academyTopics.findIndex((t) => t.id === topicId),
    [topicId]
  );
  const topic = topicIndex >= 0 ? academyTopics[topicIndex] : null;
  const prevTopic = topicIndex > 0 ? academyTopics[topicIndex - 1] : null;
  const nextTopic = topicIndex < academyTopics.length - 1 ? academyTopics[topicIndex + 1] : null;
  const isCompleted = topic ? completedIds.includes(topic.id) : false;

  const toggleComplete = useCallback(() => {
    if (!topic) return;
    setCompletedIds((prev) => {
      const next = isCompleted
        ? prev.filter((id) => id !== topic.id)
        : [...prev, topic.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, [topic, isCompleted]);

  // 404 state
  if (!topic) {
    return (
      <div>
        <PageHeader title={t('academy.title')} backTo="/academy" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <p className="text-dark-400 text-lg mb-2">Topic not found</p>
          <button
            onClick={() => navigate('/academy')}
            className="text-solar-400 hover:text-solar-300 text-sm transition-colors cursor-pointer"
          >
            {t('common.back')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={topic.title[language]}
        subtitle={topic.summary[language]}
        backTo="/academy"
        actions={
          <Badge variant={isCompleted ? 'success' : 'default'} size="md">
            <CheckCircle className="w-3.5 h-3.5" />
            {isCompleted ? t('common.completed') : `${topic.estimatedMinutes} ${t('common.minutes')}`}
          </Badge>
        }
      />

      {/* Topic content */}
      <TopicContent topic={topic} />

      {/* Bottom actions */}
      <div className="mt-8 space-y-4">
        {/* Mark as complete button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={toggleComplete}
          className={`
            w-full py-3 rounded-xl font-medium text-sm transition-all cursor-pointer
            flex items-center justify-center gap-2
            ${isCompleted
              ? 'glass border-emerald-500/30 text-emerald-400 hover:border-emerald-500/50'
              : 'bg-solar-500 text-white hover:bg-solar-600'
            }
          `}
        >
          <CheckCircle className="w-4 h-4" />
          {isCompleted ? t('common.completed') : t('common.markComplete')}
        </motion.button>

        {/* Prev / Next navigation */}
        <div className="flex gap-3">
          {prevTopic ? (
            <button
              onClick={() => navigate(`/academy/${prevTopic.id}`)}
              className="
                flex-1 glass rounded-xl p-4 text-start cursor-pointer
                hover:border-solar-400/20 transition-all group
              "
            >
              <span className="text-xs text-dark-500 flex items-center gap-1 mb-1">
                <ChevronLeft className="w-3 h-3" />
                {t('academy.prevTopic')}
              </span>
              <span className="text-sm text-dark-300 group-hover:text-white transition-colors line-clamp-1">
                {prevTopic.title[language]}
              </span>
            </button>
          ) : (
            <div className="flex-1" />
          )}
          {nextTopic ? (
            <button
              onClick={() => navigate(`/academy/${nextTopic.id}`)}
              className="
                flex-1 glass rounded-xl p-4 text-end cursor-pointer
                hover:border-solar-400/20 transition-all group
              "
            >
              <span className="text-xs text-dark-500 flex items-center justify-end gap-1 mb-1">
                {t('academy.nextTopic')}
                <ChevronRight className="w-3 h-3" />
              </span>
              <span className="text-sm text-dark-300 group-hover:text-white transition-colors line-clamp-1">
                {nextTopic.title[language]}
              </span>
            </button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </div>
  );
}

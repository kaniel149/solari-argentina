import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { TopicCard } from '../components/academy/TopicCard';
import { CategoryFilter } from '../components/academy/CategoryFilter';
import { SearchInput } from '../components/ui/SearchInput';
import { Badge } from '../components/ui/Badge';
import { useTranslation } from '../i18n';
import { academyTopics } from '../data/academy';

const STORAGE_KEY = 'solari-academy-completed';

export default function AcademyPage() {
  const { t, language } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // Load completion state from localStorage on mount
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
      // ignore parse errors
    }
  }, []);

  const filtered = useMemo(() => {
    return academyTopics.filter((topic) => {
      if (category !== 'all' && topic.category !== category) return false;
      if (difficulty !== 'all' && topic.difficulty !== difficulty) return false;
      if (search) {
        const q = search.toLowerCase();
        const titleMatch =
          topic.title.en.toLowerCase().includes(q) ||
          topic.title.he.toLowerCase().includes(q);
        const summaryMatch =
          topic.summary.en.toLowerCase().includes(q) ||
          topic.summary.he.toLowerCase().includes(q);
        if (!titleMatch && !summaryMatch) return false;
      }
      return true;
    });
  }, [search, category, difficulty]);

  const completedCount = completedIds.length;
  const totalCount = academyTopics.length;

  return (
    <div>
      <PageHeader
        title={t('academy.title')}
        subtitle={t('academy.subtitle')}
        actions={
          <Badge variant="success" size="md">
            <BookOpen className="w-3.5 h-3.5" />
            {completedCount} / {totalCount} {t('academy.completed').toLowerCase()}
          </Badge>
        }
      />

      {/* Filters */}
      <div className="space-y-4 mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={t('common.search')}
        />
        <CategoryFilter
          category={category}
          difficulty={difficulty}
          onCategoryChange={setCategory}
          onDifficultyChange={setDifficulty}
        />
      </div>

      {/* Topic Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((topic, i) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isCompleted={completedIds.includes(topic.id)}
              index={i}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-12 text-center mt-6"
        >
          <p className="text-dark-400">{t('common.none')}</p>
        </motion.div>
      )}
    </div>
  );
}

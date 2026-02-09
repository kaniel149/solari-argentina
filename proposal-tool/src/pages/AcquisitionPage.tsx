import { useState, useMemo } from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { SearchInput } from '../components/ui/SearchInput';
import { StrategyCard, FunnelDiagram } from '../components/acquisition';
import { useTranslation } from '../i18n';
import { acquisitionStrategies, salesFunnel } from '../data/acquisition';
import type { AcquisitionStrategy } from '../data/acquisition';

type CategoryFilter = 'all' | AcquisitionStrategy['category'];
type DifficultyFilter = 'all' | AcquisitionStrategy['difficulty'];
type CostFilter = 'all' | AcquisitionStrategy['costLevel'];

export default function AcquisitionPage() {
  const { t, language } = useTranslation();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [costFilter, setCostFilter] = useState<CostFilter>('all');

  const categoryOptions: { id: CategoryFilter; label: { en: string; he: string } }[] = [
    { id: 'all', label: { en: 'All', he: 'הכל' } },
    { id: 'digital', label: { en: 'Digital', he: 'דיגיטלי' } },
    { id: 'direct', label: { en: 'Direct', he: 'ישיר' } },
    { id: 'referral', label: { en: 'Referral', he: 'הפניות' } },
    { id: 'partnership', label: { en: 'Partnership', he: 'שותפויות' } },
  ];

  const difficultyOptions: { id: DifficultyFilter; label: { en: string; he: string } }[] = [
    { id: 'all', label: { en: 'Any Difficulty', he: 'כל רמה' } },
    { id: 'easy', label: { en: 'Easy', he: 'קל' } },
    { id: 'medium', label: { en: 'Medium', he: 'בינוני' } },
    { id: 'hard', label: { en: 'Hard', he: 'קשה' } },
  ];

  const costOptions: { id: CostFilter; label: { en: string; he: string } }[] = [
    { id: 'all', label: { en: 'Any Cost', he: 'כל עלות' } },
    { id: 'free', label: { en: 'Free', he: 'חינם' } },
    { id: 'low', label: { en: 'Low', he: 'נמוך' } },
    { id: 'medium', label: { en: 'Medium', he: 'בינוני' } },
    { id: 'high', label: { en: 'High', he: 'גבוה' } },
  ];

  const filtered = useMemo(() => {
    return acquisitionStrategies.filter((s) => {
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      if (difficultyFilter !== 'all' && s.difficulty !== difficultyFilter) return false;
      if (costFilter !== 'all' && s.costLevel !== costFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const titleMatch = s.title.en.toLowerCase().includes(q) || s.title.he.includes(q);
        const descMatch = s.description.en.toLowerCase().includes(q) || s.description.he.includes(q);
        if (!titleMatch && !descMatch) return false;
      }
      return true;
    });
  }, [categoryFilter, difficultyFilter, costFilter, search]);

  const pillClass = (active: boolean) => `
    px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap
    ${active
      ? 'bg-solar-500/20 border border-solar-500/40 text-solar-300'
      : 'bg-white/3 border border-white/5 text-dark-400 hover:text-dark-200 hover:border-white/10'}
  `;

  return (
    <div>
      <PageHeader title={t('acquisition.title')} subtitle={t('acquisition.subtitle')} />

      {/* Funnel */}
      <div className="mb-8">
        <FunnelDiagram funnel={salesFunnel} />
      </div>

      {/* Search + Filters */}
      <div className="mb-6 space-y-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder={language === 'he' ? 'חפש אסטרטגיה...' : 'Search strategy...'}
        />

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5">
          {categoryOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setCategoryFilter(opt.id)}
              className={pillClass(categoryFilter === opt.id)}
            >
              {opt.label[language]}
            </button>
          ))}
        </div>

        {/* Difficulty + Cost pills */}
        <div className="flex flex-wrap gap-1.5">
          {difficultyOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setDifficultyFilter(opt.id)}
              className={pillClass(difficultyFilter === opt.id)}
            >
              {opt.label[language]}
            </button>
          ))}
          <span className="w-px h-6 bg-white/10 self-center mx-1" />
          {costOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setCostFilter(opt.id)}
              className={pillClass(costFilter === opt.id)}
            >
              {opt.label[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Strategy Grid */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-dark-400 text-sm">
              {language === 'he' ? 'לא נמצאו אסטרטגיות' : 'No strategies found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
